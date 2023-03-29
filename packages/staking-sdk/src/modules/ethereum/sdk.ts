import { getPastEvents } from '@ankr.com/advanced-api';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
import { Contract, EventData } from 'web3-eth-contract';
import { Unit } from 'web3-utils';

import {
  AvailableReadProviders,
  EEthereumNetworkId,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import {
  advancedAPIConfig,
  configFromEnv,
  ETH_SCALE_FACTOR,
  getIsSameReadProvider,
  isMainnet,
  MAX_UINT256,
  ProviderManagerSingleton,
  ZERO,
} from '../common';
import { GetBlocksManager } from '../common/GetBlocksManager';
import {
  AETHB_ABI,
  AETHC_ABI,
  ETHEREUM_POOL_ABI,
  SYSTEM_PARAMETERS_ABI,
} from '../contracts';
import {
  getTxEventsHistoryGroup,
  IGetPastEvents,
  IPendingData,
  IStakable,
  IStakeData,
  ITxEventsHistoryData,
  ITxHistory,
  ITxHistoryItem,
} from '../stake';
import { IFetchTxData, IShareArgs, ISwitcher } from '../switcher';
import { batchEvents, convertNumberToHex } from '../utils';

import {
  ETH_BLOCK_2_WEEKS_OFFSET,
  ETH_GAS_LIMIT_MULTIPLIER,
  ETH_HISTORY_RANGE_STEP,
  ETH_POOL_START_BLOCK,
  ETH_STAKE_GAS_FEE_MULTIPLIER,
  METHOD_NAME_BY_SYMBOL,
  TOKENS_CONFIG_BY_SYMBOL,
} from './const';
import {
  EEthereumErrorCodes,
  EPoolEvents,
  IEthSDKArgs,
  TEthToken,
} from './types';

/**
 * EthereumSDK allows you to interact with Ethereum Liquid Staking smart contracts on Ethereum (Mainnet, Goerli Tesnet) BNB Smart Chain: aETHb, aETHc, and GlobalPool.
 *
 * For more information on Ethereum Liquid Staking from Ankr, refer to the [development details](https://www.ankr.com/docs/staking/liquid-staking/eth/staking-mechanics).
 *
 * @class
 */
export class EthereumSDK
  extends GetBlocksManager
  implements ISwitcher, IStakable
{
  /**
   * instance — SDK instance.
   *
   * @type {EthereumSDK}
   * @static
   * @private
   */
  private static instance?: EthereumSDK;

  /**
   * apiUrl — URL of the advanced API.
   *
   * @type {string}
   * @readonly
   * @private
   */
  private readonly apiUrl?: string;

  /**
   * writeProvider — provider which has signer for signing transactions.
   *
   * @type {Web3KeyWriteProvider}
   * @private
   * @readonly
   */
  private readonly writeProvider: Web3KeyWriteProvider;

  /**
   * readProvider — provider which allows to read data without connecting the wallet.
   *
   * @type {Web3KeyReadProvider}
   * @private
   * @readonly
   */
  private readonly readProvider: Web3KeyReadProvider;

  /**
   * currentAccount — connected account.
   *
   * @type {string}
   * @private
   */
  private currentAccount: string;

  /**
   * Private constructor. Instead, use `EthereumSDK.getInstance`.
   *
   * @constructor
   * @private
   */
  private constructor({ readProvider, writeProvider, apiUrl }: IEthSDKArgs) {
    super();
    EthereumSDK.instance = this;

    this.apiUrl = apiUrl;
    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  /**
   * Initialization method for SDK.
   *
   * Auto-connects write provider if chains are the same.
   * Initializes read provider to support multiple chains.
   *
   * @public
   * @static
   * @param {Partial<IEthSDKProviders>} [args] - User defined providers.
   * @returns {Promise<EthereumSDK>}
   */
  public static async getInstance(
    args?: Partial<IEthSDKArgs>,
  ): Promise<EthereumSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      args?.writeProvider ?? providerManager.getETHWriteProvider(),
      args?.readProvider ??
        providerManager.getETHReadProvider(
          isMainnet
            ? AvailableReadProviders.ethMainnet
            : AvailableReadProviders.ethGoerli,
        ),
    ]);

    const isAddrActual =
      EthereumSDK.instance?.currentAccount === writeProvider.currentAccount;

    const isSameWriteProvider =
      EthereumSDK.instance?.writeProvider === writeProvider;

    const isSameReadProvider = getIsSameReadProvider(
      EthereumSDK.instance?.readProvider,
      readProvider,
    );

    const isInstanceActual =
      isAddrActual && isSameWriteProvider && isSameReadProvider;

    if (EthereumSDK.instance && isInstanceActual) {
      return EthereumSDK.instance;
    }

    if (readProvider === undefined) {
      throw new Error('Read provider not defined');
    }

    const instance = new EthereumSDK({
      writeProvider,
      readProvider,
      apiUrl: args?.apiUrl,
    });

    const isEthChain = instance.getIsEthChain();

    if (isEthChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  /**
   * Internal function to check the current network.
   *
   * @private
   * @returns {Promise<boolean>}
   */
  private getIsEthChain(): boolean {
    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      this.writeProvider.currentChain,
    );
  }

  /**
   * Return ETH balance.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getEthBalance(): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();
    const balance = await web3.eth.getBalance(this.currentAccount);

    return new BigNumber(web3.utils.fromWei(balance));
  }

  /**
   * Internal function to choose the right provider for read or write purpose.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Web3KeyWriteProvider | Web3KeyReadProvider>}
   */
  private async getProvider(
    isForceRead = false,
  ): Promise<Web3KeyWriteProvider | Web3KeyReadProvider> {
    if (isForceRead) {
      return this.readProvider;
    }

    const isEthChain = this.getIsEthChain();

    if (isEthChain) {
      await this.connectWriteProvider();
      return this.writeProvider;
    }

    return this.readProvider;
  }

  /**
   * Return aETHb token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getABBalance(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const aETHbContract = EthereumSDK.getAethbContract(provider);
    const web3 = provider.getWeb3();

    const rawBalance = await aETHbContract.methods
      .balanceOf(this.currentAccount)
      .call();

    const balance = isFormatted ? web3.utils.fromWei(rawBalance) : rawBalance;

    return new BigNumber(balance);
  }

  /**
   * Internal function to get aETHb token contract.
   *
   * @private
   * @param {Web3KeyWriteProvider | Web3KeyReadProvider} provider - readProvider or writeProvider
   * @returns {Contract}
   */
  private static getAethbContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = configFromEnv();

    return provider.createContract(AETHB_ABI, contractConfig.fethContract);
  }

  /**
   * Return aETHc token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getACBalance(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const aETHcContract = EthereumSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawBalance = await aETHcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    const balance = isFormatted ? web3.utils.fromWei(rawBalance) : rawBalance;

    return new BigNumber(balance);
  }

  /**
   * Internal function to get aETHc token contract.
   *
   * @private
   * @param {Web3KeyWriteProvider | Web3KeyReadProvider} provider - readProvider or writeProvider
   * @returns {Contract}
   */
  private static getAethcContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = configFromEnv();

    return provider.createContract(AETHC_ABI, contractConfig.aethContract);
  }

  /**
   * Return aETHc/ETH ratio.
   *
   * @public
   * @note [Read about aBNBc/BNB ratio](https://www.ankr.com/docs/staking/liquid-staking/bnb/staking-mechanics#exchange-ratio) and draw analogy between BNB and ETH in respect to the ratio.
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getACRatio(isFormatted?: boolean): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const aETHcContract = EthereumSDK.getAethcContract(provider);
    const web3 = provider.getWeb3();

    const rawRatio = await aETHcContract.methods.ratio().call();
    const ratio = isFormatted ? web3.utils.fromWei(rawRatio) : rawRatio;

    return new BigNumber(ratio);
  }

  /**
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol (aETHb or aETHc)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    await this.connectWriteProvider();
    const provider = await this.getProvider();
    const data = TOKENS_CONFIG_BY_SYMBOL[token as TEthToken];

    if (!data) {
      throw new Error('Failed to add token to wallet');
    }

    const contract =
      token === 'aETHb'
        ? EthereumSDK.getAethbContract(provider)
        : EthereumSDK.getAethcContract(provider);

    const symbol: string = await contract.methods.symbol().call();

    return this.writeProvider.addTokenToWallet({
      ...data,
      symbol,
    });
  }

  private async connectWriteProvider(): Promise<void> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }
  }

  /**
   * Return aETHc allowance.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @param {string} [spender] - spender address (by default it's aETHb token address)
   * @returns {Promise<BigNumber>} - allowance in wei
   */
  public async getACAllowance(): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const aETHcContract = EthereumSDK.getAethcContract(provider);
    const { contractConfig } = configFromEnv();

    const allowance = await aETHcContract.methods
      .allowance(this.currentAccount, contractConfig.fethContract)
      .call();

    return new BigNumber(allowance);
  }

  /**
   * Stake without claim.
   *
   * This method is only for creating a testing capability.
   * It is related to the [STAKAN-1259](https://ankrnetwork.atlassian.net/browse/STAKAN-1259)
   * Do not use it for the production code.
   *
   * @deprecated
   * @public
   * @param {BigNumber} amount - amount to stake
   * @return {Promise<IWeb3SendResult>}
   */
  public async stakeWithoutClaim(amount: BigNumber): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    const ethPoolContract = EthereumSDK.getEthPoolContract(this.writeProvider);

    return ethPoolContract.methods.stake().send({
      from: this.currentAccount,
      value: hexAmount,
    });
  }

  /**
   * Stake token.
   *
   * @public
   * @note Initiates two transactions and connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aETHb or aETHc)
   * @returns {Promise<IStakeData>}
   */
  public async stake(amount: BigNumber, token: string): Promise<IStakeData> {
    await this.connectWriteProvider();

    const [gasFee, balance] = await Promise.all([
      this.getStakeGasFee(amount, token),
      this.getEthBalance(),
    ]);

    const gasFeeSafeLimit = gasFee.multipliedBy(ETH_STAKE_GAS_FEE_MULTIPLIER);
    const maxAmount = balance.minus(gasFeeSafeLimit);
    const stakeAmount = amount.isGreaterThan(maxAmount) ? maxAmount : amount;
    const hexAmount = convertNumberToHex(stakeAmount, ETH_SCALE_FACTOR);
    const ethPoolContract = EthereumSDK.getEthPoolContract(this.writeProvider);

    if (stakeAmount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EEthereumErrorCodes.NOT_ENOUGH_FUNDS);
    }

    const contractStake =
      ethPoolContract.methods[METHOD_NAME_BY_SYMBOL[token as TEthToken].stake];

    const gasLimit: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: hexAmount,
    });

    const response = await contractStake().send({
      from: this.currentAccount,
      value: hexAmount,
      gas: this.getIncreasedGasLimit(gasLimit),
    });

    return { txHash: response.transactionHash };
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @private
   * @param {number} gasLimit - initial gas limit
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * ETH_GAS_LIMIT_MULTIPLIER);
  }

  /**
   * Unstake token.
   *
   * @public
   * @note not supported yet. [Read why unstaking ETH is not possible at the moment](https://www.ankr.com/docs/staking/liquid-staking/eth/unstake-eth).
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aETHb or aETHc)
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unstake(
    // eslint-disable-next-line
    _amount: BigNumber,
    // eslint-disable-next-line
    _token: string,
  ): Promise<IWeb3SendResult> {
    throw new Error(EEthereumErrorCodes.NOT_SUPPORTED);
  }

  /**
   * Get total pending unstake amount.
   *
   * @public
   * @note not supported yet. [Read why unstaking ETH is not possible at the moment](https://www.ankr.com/docs/staking/liquid-staking/eth/unstake-eth).
   * @returns {Promise<BigNumber>}
   */
  public async getPendingClaim(): Promise<BigNumber> {
    return ZERO;
  }

  /**
   * Get pending data for aETHb and aETHc.
   *
   * @public
   * @note not supported yet. [Read why unstaking ETH is not possible at the moment](https://www.ankr.com/docs/staking/liquid-staking/eth/unstake-eth).
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    return {
      pendingBond: ZERO,
      pendingCertificate: ZERO,
    };
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @note Cahes computed gas fee value for future computations.
   * @param {string} amount - amount to stake
   * @param {string} token - token symbol
   * @returns {Promise<BigNumber>}
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: string,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ethPoolContract = EthereumSDK.getEthPoolContract(provider);

    const contractStake =
      ethPoolContract.methods[METHOD_NAME_BY_SYMBOL[token as TEthToken].stake];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: convertNumberToHex(amount, ETH_SCALE_FACTOR),
    });

    const increasedGasLimit = this.getIncreasedGasLimit(estimatedGas);

    return provider.getContractMethodFee(increasedGasLimit);
  }

  /**
   * Internal function to get GlobalPool contract.
   *
   * @private
   * @param {Web3KeyWriteProvider | Web3KeyReadProvider} provider - readProvider or writeProvider
   * @returns {Contract}
   */
  private static getEthPoolContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { contractConfig } = configFromEnv();

    return provider.createContract(
      ETHEREUM_POOL_ABI,
      contractConfig.ethereumPool,
    );
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();

    const systemContract = provider.createContract(
      SYSTEM_PARAMETERS_ABI,
      contractConfig.systemContract,
    );

    const minStake = await systemContract.methods
      .REQUESTER_MINIMUM_POOL_STAKING()
      .call();

    return new BigNumber(web3.utils.fromWei(minStake));
  }

  /**
   * Fetch transaction data.
   *
   * @public
   * @note Parses first uint256 param from transaction input.
   * @param {string} txHash - transaction hash
   * @param {boolean | undefined} [shouldDecodeAmount = true] - decode flag for amount
   * @returns {Promise<IFetchTxData>}
   */
  public async fetchTxData(
    txHash: string,
    shouldDecodeAmount = true,
  ): Promise<IFetchTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const tx = await web3.eth.getTransaction(txHash);

    const decodeAmount = (): BigNumber => {
      const { 0: rawAmount } =
        tx.value === '0'
          ? web3.eth.abi.decodeParameters(['uint256'], tx.input.slice(10))
          : { 0: tx.value };

      return new BigNumber(web3.utils.fromWei(rawAmount));
    };

    return {
      amount: shouldDecodeAmount ? decodeAmount() : undefined,
      destinationAddress: tx.from as string | undefined,
      isPending: tx.transactionIndex === null,
    };
  }

  /**
   * Fetch transaction receipt.
   *
   * @public
   * @param {string} txHash - transaction hash.
   * @returns {Promise<TransactionReceipt | null>}
   */
  public async fetchTxReceipt(
    txHash: string,
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  /**
   * Get transaction history for all period that starts from contract creation.
   *
   * @note Amount of certificate event is in BNB. If you need ankrBNB, multiply by ratio.
   * Pending status is not specified.
   *
   * @public
   * @return  {Promise<ITxHistory>} full transaction history.
   */
  public async getFullTxHistory(): Promise<ITxHistory> {
    const latestBlockNumber = await this.getLatestBlock();

    const { stakeHistory, unstakeHistory } = await this.getTxHistoryRange(
      ETH_POOL_START_BLOCK,
      latestBlockNumber,
    );

    return {
      stakeHistory,
      unstakeHistory,
    };
  }

  /**
   * Get transaction history for block range.
   *
   * @note Amount of each event is in BNB. If you need ankrBNB, multiply by ratio.
   * Pending status is not specified.
   *
   * @param {number} lowestBlock - from block number
   * @param {number} highestBlock - to block number
   * @returns {Promise<ITxHistory>} - transaction history
   */
  public async getTxHistoryRange(
    lowestBlock: number,
    highestBlock: number,
  ): Promise<ITxHistory> {
    const provider = await this.getProvider();
    const ethPoolContract = EthereumSDK.getEthPoolContract(provider);

    const getStakePastEventsArgs: IGetPastEvents = {
      latestBlockNumber: highestBlock,
      startBlock: lowestBlock,
      contract: ethPoolContract,
      eventName: EPoolEvents.RewardClaimed,
      filter: { staker: this.currentAccount },
      provider: this.readProvider,
      rangeStep: ETH_HISTORY_RANGE_STEP,
    };

    const [stakeRawEvents, ratio] = await Promise.all([
      this.getPastEvents(getStakePastEventsArgs),
      this.getACRatio(),
    ]);

    const mapEvent = (event: EventData): EventData => ({
      ...event,
      returnValues: {
        ...event.returnValues,
        amount: new BigNumber(event.returnValues.amount)
          .dividedBy(ratio)
          .multipliedBy(ETH_SCALE_FACTOR)
          .toFixed(),
      },
    });

    const stakeRawEventsMapped = stakeRawEvents.map(mapEvent);

    const stakeHistory = await this.getTxEventsHistoryGroup(
      stakeRawEventsMapped,
    );

    // TODO: add unstake history when it will be implemented
    const unstakeHistory: ITxHistoryItem[] = [];

    return {
      stakeHistory,
      unstakeHistory,
    };
  }

  /**
   * Internal function to return transaction history group from events.
   *
   * @private
   * @param {EventData[]} [rawEvents] - events
   * @returns {Promise<ITxHistoryItem[]>}
   */
  private async getTxEventsHistoryGroup(
    rawEvents?: EventData[],
  ): Promise<ITxHistoryItem[]> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const blockNumbers = rawEvents.map(event => event.blockNumber);

    const blocks = await this.getBlocks(web3, blockNumbers);

    const rawData = blocks.map((block, index) => ({
      ...rawEvents[index],
      timestamp: +block.timestamp,
    }));

    return rawData
      .sort((a, b) => b.timestamp - a.timestamp)
      .map<ITxHistoryItem>(
        ({
          event,
          returnValues = { amount: '0' },
          timestamp,
          transactionHash,
        }) => ({
          txAmount: this.convertFromWei(returnValues.amount),
          txDate: new Date(timestamp * 1_000),
          txHash: transactionHash,
          txType: event,
          isBond: !returnValues.isAETH,
        }),
      );
  }

  /**
   * Internal function to convert wei value to human readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @param {Unit} unit - units
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string, unit?: Unit): BigNumber {
    const web3 = this.readProvider.getWeb3();
    const integerAmount = new BigNumber(amount).integerValue().toFixed();
    return new BigNumber(web3.utils.fromWei(integerAmount, unit));
  }

  /**
   * Get transaction history.
   *
   * @public
   * @deprecated use `getTxHistory` instead. This method will be removed in the next major release.
   * @note Currently returns data for the last 14 days.
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const latestBlockNumber = await web3.eth.getBlockNumber();
    const startBlock = latestBlockNumber - ETH_BLOCK_2_WEEKS_OFFSET;

    return this.getTxEventsHistoryRange(startBlock, latestBlockNumber);
  }

  /**
   * Get transaction history.
   *
   * @public
   * @deprecated use `getTxHistoryRange` instead. This method will be removed in the next major release.
   * @note Currently returns data for block range.
   * @param {number} from - from block
   * @param {number} to - to block
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistoryRange(
    from: number,
    to: number,
  ): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const ethPoolContract = EthereumSDK.getEthPoolContract(provider);

    const [claimEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: ethPoolContract,
        eventName: EPoolEvents.RewardClaimed,
        startBlock: from,
        latestBlockNumber: to,
        rangeStep: ETH_HISTORY_RANGE_STEP,
        filter: {
          staker: this.currentAccount,
        },
      }),
      this.getACRatio(),
    ]);

    const mapEvents = (events: EventData[]): EventData[] =>
      events.map(event => ({
        ...event,
        returnValues: {
          ...event.returnValues,
          amount: new BigNumber(event.returnValues.amount)
            .dividedBy(ratio)
            .multipliedBy(10 ** 18)
            .toFixed(),
        },
      }));

    const [completedCertificate, completedBond] = await Promise.all([
      getTxEventsHistoryGroup({
        rawEvents: mapEvents(
          claimEvents.filter(({ returnValues }) => returnValues.isAETH),
        ),
        web3,
      }),
      getTxEventsHistoryGroup({
        rawEvents: mapEvents(
          claimEvents.filter(({ returnValues }) => !returnValues.isAETH),
        ),
        web3,
      }),
    ]);

    return {
      completedCertificate,
      completedBond,
      pendingBond: [],
      pendingCertificate: [],
      unstakeBond: [],
      unstakeCertificate: [],
    };
  }

  /**
   * Get latest block number.
   *
   * @returns {Promise<number>}
   */
  public async getLatestBlock(): Promise<number> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return web3.eth.getBlockNumber();
  }

  /**
   * An internal function for getting past events from the API or blockchain
   * according to the current environment.
   *
   * @private
   * @param options {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEvents(options: IGetPastEvents): Promise<EventData[]> {
    return advancedAPIConfig.isActiveForEth
      ? this.getPastEventsAPI(options)
      : this.getPastEventsBlockchain(options);
  }

  /**
   * Internal function to get past events from indexed logs API.
   *
   * @private
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEventsAPI({
    contract,
    eventName,
    startBlock,
    latestBlockNumber,
    filter,
  }: IGetPastEvents): Promise<EventData[]> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return getPastEvents({
      apiUrl: this.apiUrl,
      fromBlock: startBlock,
      toBlock: latestBlockNumber,
      blockchain: isMainnet ? 'eth' : 'eth_goerli',
      contract,
      web3,
      eventName,
      filter,
    });
  }

  /**
   * Internal function to get past events, using the defined range.
   *
   * @private
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEventsBlockchain({
    contract,
    eventName,
    startBlock,
    latestBlockNumber,
    rangeStep,
    filter,
  }: IGetPastEvents): Promise<EventData[]> {
    return flatten(
      await batchEvents({
        contract,
        eventName,
        rangeStep,
        startBlock,
        filter,
        latestBlockNumber,
      }),
    );
  }

  /**
   * Approve aETHc for aETHb, i.e. allow aETHb smart contract to access and transfer aETHc tokens.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} [amount] - amount to approve (by default it's MAX_UINT256)
   * @param {number} [scale = 1] - scale factor for amount
   * @returns {Promise<IWeb3SendResult | undefined>}
   */
  public async approveACForAB(
    amount: BigNumber = MAX_UINT256,
    scale = 1,
  ): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();

    const { contractConfig } = configFromEnv();

    const aETHcContract = EthereumSDK.getAethcContract(this.writeProvider);

    const data = aETHcContract.methods
      .approve(contractConfig.fethContract, convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aethContract,
      { data, estimate: true },
    );
  }

  /**
   * Switch aETHc to aETHb.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} args - object with amount to switch and scale
   * @returns {Promise<IWeb3SendResult>}
   */
  public async lockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const aETHbContract = EthereumSDK.getAethbContract(this.writeProvider);
    const { contractConfig } = configFromEnv();

    const data = aETHbContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }

  /**
   * Switch aETHb to aETHc.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} args - object with amount to switch and scale
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unlockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const aETHbContract = EthereumSDK.getAethbContract(this.writeProvider);
    const { contractConfig } = configFromEnv();

    const data = aETHbContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.fethContract,
      { data, estimate: true },
    );
  }

  /**
   * Get claimable amount.
   *
   * @public
   * @param {string} token - token symbol
   * @returns {Promise<BigNumber>}
   */
  public async getClaimable(token: string): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const ethPoolContract = EthereumSDK.getEthPoolContract(provider);
    const web3 = provider.getWeb3();

    const contractGetClaimable =
      ethPoolContract.methods[
        METHOD_NAME_BY_SYMBOL[token as TEthToken].claimable
      ];

    const rawValue = await contractGetClaimable(this.currentAccount).call();

    return new BigNumber(web3.utils.fromWei(rawValue));
  }

  /**
   * Claim tokens.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol
   * @returns {Promise<IWeb3SendResult>}
   */
  public async claim(token: string): Promise<IWeb3SendResult> {
    await this.connectWriteProvider();
    const { contractConfig } = configFromEnv();
    const ethPoolContract = EthereumSDK.getEthPoolContract(this.writeProvider);
    const contractClaim =
      ethPoolContract.methods[METHOD_NAME_BY_SYMBOL[token as TEthToken].claim];
    const data: string = contractClaim().encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ethereumPool,
      { data, estimate: true },
    );
  }
}

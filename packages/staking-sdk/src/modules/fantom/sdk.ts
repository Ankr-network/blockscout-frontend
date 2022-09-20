import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
import { Contract, EventData } from 'web3-eth-contract';

import {
  EEthereumNetworkId,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { ApiGateway } from '../api';
import {
  ETH_SCALE_FACTOR,
  isMainnet,
  MAX_UINT256,
  ZERO,
  configFromEnv,
  Env,
  ProviderManagerSingleton,
} from '../common';
import { AFTMB_ABI, AFTMC_ABI, FANTOM_POOL_ABI } from '../contracts';
import {
  getTxEventsHistoryGroup,
  getFilteredContractEvents,
  IStakable,
  IStakeData,
  ITxEventsHistoryData,
  IGetPastEvents,
  IPendingData,
} from '../stake';
import { ISwitcher, IShareArgs, IFetchTxData } from '../switcher';
import { convertNumberToHex } from '../utils/converters';

import {
  FANTOM_PROVIDER_READ_ID,
  FANTOM_MAX_BLOCK_RANGE,
  FANTOM_BLOCK_OFFSET,
  FANTOM_ESTIMATE_GAS_MULTIPLIER,
  FANTOM_GAS_FEE_MULTIPLIER,
} from './const';
import {
  TFtmSyntToken,
  TUnstakingStatsType,
  IFantomSDKProviders,
  EFantomPoolEvents,
  EFantomErrorCodes,
} from './types';

/**
 * FantomSDK allows you to interact with Fantom Liquid Staking smart contracts on Fantom (Mainnet, Tesnet): aFTMb, aFTMc, and FantomPool.
 *
 * For more information on Fantom Liquid Staking from Ankr, refer to the [development details](https://www.ankr.com/docs/staking/liquid-staking/fantom/staking-mechanics).
 *
 * @class
 */
export class FantomSDK implements ISwitcher, IStakable {
  /**
   * instance — SDK instance.
   *
   * @type {FantomSDK}
   * @static
   * @private
   */
  private static instance?: FantomSDK;

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
   * apiGateWay — gateway instance.
   *
   * @type {ApiGateway}
   * @private
   */
  private readonly apiGateWay: ApiGateway;

  /**
   * Private constructor. Instead, use `FantomSDK.getInstance`.
   *
   * @constructor
   * @private
   */
  private constructor({ readProvider, writeProvider }: IFantomSDKProviders) {
    FantomSDK.instance = this;
    const { gatewayConfig } = configFromEnv(
      isMainnet ? Env.Production : Env.Develop,
    );

    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
    this.apiGateWay = new ApiGateway(gatewayConfig);
  }

  /**
   * Initialization method for the SDK.
   *
   * Auto-connects writeProvider if chains are the same.
   * Initializes readProvider to support multiple chains.
   *
   * @public
   * @static
   * @param {Partial<IFantomSDKProviders>} [args] - User defined providers.
   * @returns {Promise<FantomSDK>}
   */
  public static async getInstance(
    args?: Partial<IFantomSDKProviders>,
  ): Promise<FantomSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      args?.writeProvider ?? providerManager.getETHWriteProvider(),
      args?.readProvider ??
        providerManager.getETHReadProvider(FANTOM_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      FantomSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      FantomSDK.instance?.writeProvider === writeProvider &&
      FantomSDK.instance?.readProvider === readProvider;

    if (FantomSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return FantomSDK.instance;
    }

    const instance = new FantomSDK({ writeProvider, readProvider });
    const isFtmNetwork = await instance.isFtmNetwork(writeProvider);

    if (isFtmNetwork && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
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

    const isFtmChain = await this.isFtmNetwork(this.writeProvider);

    if (isFtmChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isFtmChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  /**
   * Internal function to check the current network.
   *
   * @private
   * @returns {Promise<boolean>}
   */
  private async isFtmNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      EEthereumNetworkId.fantom,
      EEthereumNetworkId.fantomTestnet,
    ].includes(chainId);
  }

  /**
   * Internal function to convert wei value to human readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  /**
   * Internal function to get FantomPool contract.
   *
   * @private
   * @param {boolean} provider - read or write provider
   * @returns {Promise<Contract>}
   */
  private getFantomPoolContract(
    provider: Web3KeyWriteProvider | Web3KeyReadProvider,
  ): Contract {
    const { fantomConfig } = configFromEnv();

    return provider.createContract(FANTOM_POOL_ABI, fantomConfig.fantomPool);
  }

  /**
   * Internal function to get aFTMb token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getAftmbTokenContract(isForceRead = false) {
    const provider = await this.getProvider(isForceRead);

    const { fantomConfig } = configFromEnv();

    return provider.createContract(AFTMB_ABI, fantomConfig.aftmbToken);
  }

  /**
   * Internal function to get aFTMc token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getAftmcTokenContract(isForceRead = false) {
    const provider = await this.getProvider(isForceRead);

    const { fantomConfig } = configFromEnv();

    return provider.createContract(AFTMC_ABI, fantomConfig.aftmcToken);
  }

  /**
   * Get transaction history.
   *
   * @public
   * @note Currently returns data for the last 7 days.
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);
    const web3 = provider.getWeb3();

    const firstWrId: string = await fantomPoolContract.methods
      .firstWrId()
      .call();

    const latestBlockNumber = await web3.eth.getBlockNumber();
    const startBlock = latestBlockNumber - FANTOM_BLOCK_OFFSET;

    const [stakeRawEvents, unstakeRawEvents, withdrawnRawEvents] =
      await Promise.all([
        // event StakeReceived is emitted once transaction is successfull
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock,
          latestBlockNumber,
          rangeStep: FANTOM_MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.StakeReceived,
          filter: {
            staker: this.currentAccount,
          },
        }),
        // Get pending withdrawal requests, one can get all TokensBurned events for given staker
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock,
          latestBlockNumber,
          rangeStep: FANTOM_MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.TokensBurned,
          filter: {
            staker: this.currentAccount,
          },
        }),
        this.getPastEvents({
          provider,
          contract: fantomPoolContract,
          startBlock,
          latestBlockNumber,
          rangeStep: FANTOM_MAX_BLOCK_RANGE,
          eventName: EFantomPoolEvents.Withdrawn,
          filter: {
            staker: this.currentAccount,
          },
        }),
      ]);

    const pendingRawEvents: EventData[] = [];

    unstakeRawEvents.forEach(current => {
      // Events with wrId >= firstWrId are pending
      if (+current.returnValues.wrId >= +firstWrId) {
        pendingRawEvents.push(current);
      }
    });

    const { bondEvents: stakeRawEventsAFTMB, certEvents: stakeRawEventsAFTMC } =
      getFilteredContractEvents(stakeRawEvents);

    const {
      bondEvents: withdrawnRawEventsAFTMB,
      certEvents: withdrawnRawEventsAFTMC,
    } = getFilteredContractEvents(withdrawnRawEvents);

    const {
      bondEvents: pendingRawEventsAFTMB,
      certEvents: pendingRawEventsAFTMC,
    } = getFilteredContractEvents(pendingRawEvents);

    const [
      completedBond,
      completedCertificate,
      unstakeBond,
      unstakeCertificate,
      pendingBond,
      pendingCertificate,
    ] = await Promise.all(
      [
        stakeRawEventsAFTMB,
        stakeRawEventsAFTMC,
        withdrawnRawEventsAFTMB,
        withdrawnRawEventsAFTMC,
        pendingRawEventsAFTMB,
        pendingRawEventsAFTMC,
      ].map(rawEvents => getTxEventsHistoryGroup({ rawEvents, web3 })),
    );

    return {
      completedBond,
      completedCertificate,
      pendingBond,
      pendingCertificate,
      unstakeBond,
      unstakeCertificate,
    };
  }

  /**
   * Internal function to get past events, using the defined range.
   *
   * @private
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEvents({
    provider,
    contract,
    eventName,
    startBlock,
    rangeStep,
    filter,
  }: IGetPastEvents): Promise<EventData[]> {
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const eventsPromises: Promise<EventData[]>[] = [];

    for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
      const fromBlock = i;
      const toBlock = fromBlock + rangeStep;

      eventsPromises.push(
        contract.getPastEvents(eventName, { fromBlock, toBlock, filter }),
      );
    }

    const pastEvents = await Promise.all(eventsPromises);

    return flatten(pastEvents);
  }

  /**
   * Fetch transaction data.
   *
   * @public
   * @note Parses first uint256 param from transaction input.
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IFetchTxData>}
   */
  public async fetchTxData(txHash: string): Promise<IFetchTxData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    const { 0: amount } =
      tx.value === '0'
        ? web3.eth.abi.decodeParameters(['uint256'], tx.input.slice(10))
        : { 0: tx.value };

    return {
      amount: new BigNumber(web3.utils.fromWei(amount)),
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
   * Stake token.
   *
   * @public
   * @note Initiates two transactions and connect if writeProvider isn't connected.
   * @note Estimates gas and multiplies it by `GAS_FEE_MULTIPLIER` to prevent MetaMask issue with gas calculation.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aFTMb or aFTMc)
   * @returns {Promise<IStakeData>}
   */
  public async stake(amount: BigNumber, token: string): Promise<IStakeData> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EFantomErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const gasFee = await this.getStakeGasFee(amount, token as TFtmSyntToken);
    const balance = await this.getFtmBalance();

    // multiplication needs to avoid problems with max amount
    // and fee calculation in the wallet
    const multipliedGasFee = gasFee.multipliedBy(FANTOM_GAS_FEE_MULTIPLIER);
    const maxAllowedAmount = balance.minus(multipliedGasFee);

    const stakeAmount = amount.isGreaterThan(maxAllowedAmount)
      ? maxAllowedAmount
      : amount;

    const hexAmount = convertNumberToHex(stakeAmount, ETH_SCALE_FACTOR);
    const fantomPoolContract = this.getFantomPoolContract(this.writeProvider);
    const stakeMethodName = this.getStakeMethodName(token as TFtmSyntToken);
    const contractMethod = fantomPoolContract.methods[stakeMethodName]();

    const gasLimit: number = await contractMethod.estimateGas({
      from: this.currentAccount,
      value: hexAmount,
    });

    const gasPrice = await this.writeProvider.getSafeGasPriceWei();

    const tx = await contractMethod.send({
      from: this.currentAccount,
      value: hexAmount,
      gas: this.getIncreasedGasLimit(gasLimit),
      gasPrice: gasPrice.toString(10),
    });

    return { txHash: tx.transactionHash };
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @private
   * @param {number} gasLimit - initial gas limit
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * FANTOM_ESTIMATE_GAS_MULTIPLIER);
  }

  /**
   * Internal function to return stake method by token symbol.
   *
   * @param {TFtmSyntToken} token - token symbol (aFTMb or aFTMc)
   * @private
   * @returns {string}
   */
  private getStakeMethodName(token: TFtmSyntToken): string {
    switch (token) {
      case 'aFTMc':
        return 'stakeAndClaimCerts';

      default:
        return 'stakeAndClaimBonds';
    }
  }

  /**
   * Checks if allowance is greater or equal to amount.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @param {string} [spender] - spender address (by default it is aFTMb token address)
   * @returns {Promise<BigNumber>} - allowance in wei
   */
  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const aFTMcContract = await this.getAftmcTokenContract();
    const { fantomConfig } = configFromEnv();

    const allowance = await aFTMcContract.methods
      .allowance(this.currentAccount, spender || fantomConfig.aftmbToken)
      .call();

    return new BigNumber(allowance);
  }

  /**
   * Checks if allowance is greater or equal to amount.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @param {string} [amount] - amount
   * @returns {Promise<boolean>} - true if amount doesn't exceed allowance, false - otherwise.
   */
  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    const allowance = await this.getACAllowance();

    return allowance.isGreaterThanOrEqualTo(
      convertNumberToHex(amount, ETH_SCALE_FACTOR),
    );
  }

  /**
   * Approve aFTMc for aFTMb, i.e. allow aFTMb smart contract to access and transfer aFTMc tokens.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} [amount] - amount to approve (by default it's MAX_UINT256)
   * @param {number} [scale = 1] - scale factor for amount
   * @returns {Promise<IWeb3SendResult | undefined>}
   */
  public async approveACForAB(
    amount = MAX_UINT256,
    scale = 1,
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return undefined;
    }

    const { fantomConfig } = configFromEnv();
    const aFTMcContract = await this.getAftmcTokenContract();

    const data = aFTMcContract.methods
      .approve(fantomConfig.aftmbToken, convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.aftmcToken,
      { data, estimate: true },
    );
  }

  /**
   * Switch aFTMc to aFTMb.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} args - object with amount to switch and scale
   * @returns {Promise<IWeb3SendResult>}
   */
  public async lockShares({
    amount,
    scale = ETH_SCALE_FACTOR,
  }: IShareArgs): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EFantomErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aFTMbContract = await this.getAftmbTokenContract();
    const { fantomConfig } = configFromEnv();

    const data = aFTMbContract.methods
      .lockShares(convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.aftmbToken,
      { data, estimate: true },
    );
  }

  /**
   * Switch aFTMb to aFTMc.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} args - object with amount to switch and scale
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unlockShares({
    amount,
    scale = ETH_SCALE_FACTOR,
  }: IShareArgs): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EFantomErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aFTMbContract = await this.getAftmbTokenContract();
    const { fantomConfig } = configFromEnv();

    const data = aFTMbContract.methods
      .unlockShares(convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.aftmbToken,
      { data, estimate: true },
    );
  }

  /**
   * Unstake token.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aFTMb or aFTMc)
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unstake(amount: BigNumber, token: string): Promise<IWeb3SendResult> {
    const { fantomConfig } = configFromEnv();
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EFantomErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const fantomPoolContract = this.getFantomPoolContract(this.writeProvider);
    const unstakeMethodName = this.getUnstakeMethodName(token as TFtmSyntToken);
    const txn = fantomPoolContract.methods[unstakeMethodName](hexAmount);

    const gasLimit: number = await txn.estimateGas({
      from: this.currentAccount,
    });

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      fantomConfig.fantomPool,
      {
        data: txn.encodeABI(),
        estimate: true,
        gasLimit: this.getIncreasedGasLimit(gasLimit).toString(),
      },
    );
  }

  /**
   * Internal function to return unstake method by token symbol.
   *
   * @private
   * @param {TFtmSyntToken} token - token symbol (aFTMb or aFTMc)
   * @private
   * @returns {string}
   */
  private getUnstakeMethodName(token: TFtmSyntToken): string {
    switch (token) {
      case 'aFTMc':
        return 'burnCerts';

      default:
        return 'burnBonds';
    }
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @param {BigNumber} amount - amount to stake
   * @param {TFtmSyntToken} token - token symbol (aFTMb or aFTMc)
   * @returns {Promise<BigNumber>}
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: TFtmSyntToken,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const contractStake =
      fantomPoolContract.methods[this.getStakeMethodName(token)];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: convertNumberToHex(amount, ETH_SCALE_FACTOR),
    });

    const increasedGasLimit = this.getIncreasedGasLimit(estimatedGas);

    return provider.getContractMethodFee(increasedGasLimit);
  }

  /**
   * Get burn fee for amount
   *
   * @public
   * @param {BigNumber} amount - amount to burn
   * @returns {Promise<BigNumber>}
   */
  public async getBurnFee(amount: BigNumber): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);
    const burnFee = await fantomPoolContract.methods
      .getBurnFee(hexAmount)
      .call();

    return this.convertFromWei(burnFee);
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const fantomPoolContract = this.getFantomPoolContract(provider);

    const minStake = await fantomPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol (aFTMb or aFTMc)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { fantomConfig } = configFromEnv();
    const isAftmb = token === 'aFTMb';

    const tokenContract = isAftmb
      ? await this.getAftmbTokenContract()
      : await this.getAftmcTokenContract();

    const address = isAftmb ? fantomConfig.aftmbToken : fantomConfig.aftmcToken;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    const chainId: number = isMainnet
      ? EEthereumNetworkId.fantom
      : EEthereumNetworkId.fantomTestnet;

    return this.writeProvider.addTokenToWallet({
      address,
      symbol,
      decimals,
      chainId,
    });
  }

  /**
   * Return FTM balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getFtmBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const ftmBalance = await web3.eth.getBalance(this.currentAccount);

    return this.convertFromWei(ftmBalance);
  }

  /**
   * Return aFTMb token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getABBalance(): Promise<BigNumber> {
    const aFTMbContract = await this.getAftmbTokenContract();

    const aFTMbBalance = await aFTMbContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(aFTMbBalance);
  }

  /**
   * Return aFTMc token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const aFTMcContract = await this.getAftmcTokenContract();

    const aFTMcBalance = await aFTMcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(aFTMcBalance);
  }

  /**
   * Return aFTMc/FTM ratio.
   *
   * @public
   * @note [Read about aFTMc/FTM ratio](https://www.ankr.com/docs/staking/liquid-staking/ftm/staking-mechanics/#exchange-ratio).
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aFTMcContract = await this.getAftmcTokenContract();
    const web3 = provider.getWeb3();

    const rawRatio = await aFTMcContract.methods.ratio().call();
    const ratio = web3.utils.fromWei(rawRatio);

    return new BigNumber(ratio);
  }

  /**
   * Get total pending unstake amount.
   *
   * @public
   * @param {TUnstakingStatsType} - unstake type (by default it's all)
   * @returns {Promise<BigNumber>}
   */
  public async getPendingClaim(
    type: TUnstakingStatsType = 'all',
  ): Promise<BigNumber> {
    return this.apiGateWay.api
      .get(`/v1alpha/fantom/unstakingStats/${this.currentAccount}/${type}`)
      .then(({ data }) => new BigNumber(data.unstakingAmount))
      .catch(() => ZERO);
  }

  /**
   * Get pending data for aFTMb and aFTMc.
   *
   * @public
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    const [pendingBond, pendingCertificate] = await Promise.all([
      this.getPendingClaim('bond'),
      this.getPendingClaim('cert'),
    ]);

    return {
      pendingBond,
      pendingCertificate,
    };
  }
}

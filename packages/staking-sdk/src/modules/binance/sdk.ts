import { getPastEvents } from '@ankr.com/advanced-api';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem, Unit } from 'web3-utils';

import {
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
  MAX_UINT256_SCALE,
  ProviderManagerSingleton,
  ZERO,
  ZERO_EVENT_HASH,
} from '../common';
import { GetBlocksManager } from '../common/GetBlocksManager';
import {
  ABI_ABNBB,
  ABI_ABNBC,
  ABI_BINANCE_PARTERS,
  ABI_BINANCE_POOL,
  ABI_ERC20,
  AETHC_BSC_ABI,
  AETH_BSC_ABI,
  SWAP_POOL_ABI,
} from '../contracts';
import { EMaticSDKErrorCodes, MATIC_SCALE_FACTOR } from '../polygon';
import {
  IEventsBatch,
  IGetPastEvents,
  IPartnerClaimHistoryData,
  IPendingData,
  IStakable,
  IStakeData,
  ITxEventsHistoryData,
  ITxHistory,
  ITxHistoryItem,
} from '../stake';
import { IFetchTxData, IShareArgs, ISwitcher } from '../switcher';
import { convertNumberToHex, sleep } from '../utils';
import { batchEvents } from '../utils/batchEvents';

import {
  BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
  BINANCE_PARTNERS_CONTRACT_START_BLOCK,
  BINANCE_POOL_CONTRACT_START_BLOCK,
  BINANCE_READ_PROVIDER_ID,
  BNB_ESTIMATE_GAS_MULTIPLIER,
  BNB_GAS_FEE_SAFE_LIMIT,
  BNB_MAX_BLOCK_RANGE,
  BNB_STAKING_MAX_DECIMALS_LEN,
  CERT_STAKING_LOG_HASH,
  TOPIC_WITH_TOKEN_TYPE_INFO,
} from './const';
import {
  EBinanceErrorCodes,
  EBinancePartnersEvents,
  EBinancePoolEvents,
  EBinancePoolEventsMap,
  ETokenType,
  IBinanceSDKArgs,
  IGetTxReceipt,
  TBnbSyntToken,
} from './types';

/**
 * BinanceSDK allows you to interact with Binance Liquid Staking smart contracts on BNB Smart Chain: aBNBb, aBNBc, WBNB, and BinancePool.
 *
 * For more information on Binance Liquid Staking from Ankr, refer to the [development details](https://www.ankr.com/docs/staking/liquid-staking/bnb/staking-mechanics).
 *
 * @class
 */
export class BinanceSDK
  extends GetBlocksManager
  implements ISwitcher, IStakable
{
  /**
   * instance — SDK instance.
   *
   * @type {BinanceSDK}
   * @static
   * @private
   */
  private static instance?: BinanceSDK;

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
   * @readonly
   * @private
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
   * stakeGasFee — cached stake gas fee.
   *
   * @type {BigNumber}
   * @private
   */
  private stakeGasFee?: BigNumber;

  /**
   * Private constructor. Instead, use `BinanceSDK.getInstance`.
   *
   * @constructor
   * @private
   */
  private constructor({
    readProvider,
    writeProvider,
    apiUrl,
  }: IBinanceSDKArgs) {
    super();
    BinanceSDK.instance = this;

    this.apiUrl = apiUrl;
    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
  }

  /**
   * Initialization method for SDK.
   *
   * Auto-connects writeProvider if chains are the same.
   * Initializes readProvider to support multiple chains.
   *
   * @public
   * @static
   * @param {IBinanceSDKArgs} [args] - user-defined providers and advanced API url.
   * @returns {Promise<BinanceSDK>}
   */
  public static async getInstance(
    args?: Partial<IBinanceSDKArgs>,
  ): Promise<BinanceSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      args?.writeProvider ?? providerManager.getETHWriteProvider(),
      args?.readProvider ??
        providerManager.getETHReadProvider(BINANCE_READ_PROVIDER_ID),
    ]);

    const isAddrActual =
      BinanceSDK.instance?.currentAccount === writeProvider.currentAccount;

    const isSameWriteProvider =
      BinanceSDK.instance?.writeProvider === writeProvider;

    const isSameReadProvider = getIsSameReadProvider(
      BinanceSDK.instance?.readProvider,
      readProvider,
    );

    const isInstanceActual =
      isAddrActual && isSameWriteProvider && isSameReadProvider;

    if (BinanceSDK.instance && isInstanceActual) {
      return BinanceSDK.instance;
    }

    if (readProvider === undefined) {
      throw new Error('Read provider not defined');
    }

    const instance = new BinanceSDK({
      writeProvider,
      readProvider,
      apiUrl: args?.apiUrl,
    });

    const isBinanceChain = await instance.isBinanceNetwork(writeProvider);

    if (isBinanceChain && !writeProvider.isConnected()) {
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

    const isBinanceChain = await this.isBinanceNetwork(this.writeProvider);

    if (isBinanceChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isBinanceChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  /**
   * Internal function to check the current network.
   *
   * @private
   * @param {Web3KeyWriteProvider} provider - current selected provider
   * @returns {Promise<boolean>}
   */
  private async isBinanceNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      EEthereumNetworkId.smartchain,
      EEthereumNetworkId.smartchainTestnet,
    ].includes(chainId);
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
    return advancedAPIConfig.isActiveForBinance
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
      blockchain: 'bsc',
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
    rangeStep,
    filter,
    latestBlockNumber,
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
   * Internal function to convert wei value to human readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @param {Unit} unit - units
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string, unit?: Unit): BigNumber {
    return new BigNumber(
      this.readProvider.getWeb3().utils.fromWei(amount, unit),
    );
  }

  /**
   * Internal function to convert value to hex format.
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  private convertToHex(amount: BigNumber): string {
    return convertNumberToHex(amount, ETH_SCALE_FACTOR);
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
          txType: this.getTxType(event),
          isBond: returnValues.isRebasing,
        }),
      );
  }

  /**
   * Internal function to map event type to transaction type.
   *
   * @private
   * @param {string} [rawTxType] - transaction type
   * @returns {string | null}
   */
  private getTxType(rawTxType?: string): string | null {
    switch (rawTxType) {
      case EBinancePoolEvents.Staked:
        return EBinancePoolEventsMap.Staked;

      case EBinancePoolEvents.UnstakePending:
        return EBinancePoolEventsMap.UnstakePending;

      default:
        return null;
    }
  }

  /**
   * Internal function to get aBNBb token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getABNBBContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);

    return provider.createContract(ABI_ABNBB, binanceConfig.aBNBbToken);
  }

  /**
   * Internal function to get aBNBc token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getABNBCContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);

    return provider.createContract(ABI_ABNBC, binanceConfig.aBNBcToken);
  }

  /**
   * Internal function to get BinancePool contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getBinancePoolContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_BINANCE_POOL as AbiItem[],
      binanceConfig.binancePool,
    );
  }

  /**
   * Internal function to get BinancePartners contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getBinancePartersContract(
    isForceRead = false,
  ): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_BINANCE_PARTERS as AbiItem[],
      binanceConfig.binancePartners,
    );
  }

  /**
   * Internal function to get WBNB token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getWrappedBNBContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      binanceConfig.WBNBContract,
    );
  }

  /**
   * Internal function to get old aETHc contract
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getAETHContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      AETH_BSC_ABI as AbiItem[],
      binanceConfig.aETHToken,
    );
  }

  /**
   * Internal function to get Swap Pool contract
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getSwapPoolContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      SWAP_POOL_ABI as AbiItem[],
      binanceConfig.swapPool,
    );
  }

  /**
   * Internal function to get aETHc contract
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getAETHCContract(isForceRead = false): Promise<Contract> {
    const { binanceConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      AETHC_BSC_ABI as AbiItem[],
      binanceConfig.aETHcToken,
    );
  }

  /**
   * Internal method for getting a safe amount in HEX format.
   *
   * @private
   * @param {BigNumber} amount - amount for stake
   * @returns {string}
   */
  private getSafeBinanceHexAmount(amount: BigNumber): string {
    const safeAmount = amount.decimalPlaces(
      BNB_STAKING_MAX_DECIMALS_LEN,
      BigNumber.ROUND_DOWN,
    );

    return this.convertToHex(safeAmount);
  }

  /**
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol (aBNBb, aBNBc, aETH, aETHc)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { binanceConfig } = configFromEnv();

    let contract: Contract;
    let address: string;
    switch (token) {
      case 'aBNBb':
        contract = await this.getABNBBContract();
        address = binanceConfig.aBNBbToken;
        break;
      case 'aBNBc':
        contract = await this.getABNBCContract();
        address = binanceConfig.aBNBcToken;
        break;
      case 'aETH':
        contract = await this.getAETHContract();
        address = binanceConfig.aETHToken;
        break;
      case 'aETHc':
        contract = await this.getAETHCContract();
        address = binanceConfig.aETHcToken;
        break;
      default: {
        throw new Error(EBinanceErrorCodes.UNSUPPORTED_TOKEN);
      }
    }

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    const chainId: number = isMainnet
      ? EEthereumNetworkId.smartchain
      : EEthereumNetworkId.smartchainTestnet;

    return this.writeProvider.addTokenToWallet({
      address,
      symbol,
      decimals,
      chainId,
    });
  }

  /**
   * Return aBNBb token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getABBalance(): Promise<BigNumber> {
    const aBNBbTokenContract = await this.getABNBBContract(true);

    const balance = await aBNBbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return BNB token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getBNBBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const contract = await this.getWrappedBNBContract(true);

    const [currBalance, decimals] = await Promise.all([
      web3.eth.getBalance(this.currentAccount),
      contract.methods.decimals().call(),
    ]);

    return this.readProvider.getFormattedBalance(currBalance, decimals);
  }

  /**
   * Returns old aETHc token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getAETHBalance(): Promise<BigNumber> {
    const contract = await this.getAETHContract(true);
    const balance = await contract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Returns aETHc token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getAETHCBalance(): Promise<BigNumber> {
    const contract = await this.getAETHCContract();
    const balance = await contract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Returns available aETHc token balance for oldSwap
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getAvailableToSwapAETHC(): Promise<BigNumber> {
    const { binanceConfig } = configFromEnv();
    const contract = await this.getAETHCContract();

    const balance = await contract.methods
      .balanceOf(binanceConfig.aETHToken)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract(true);

    const minStake = await binancePoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Internal function to return raw pool events.
   *
   * @private
   * @returns {Promise<IEventsBatch>}
   */
  private async getPoolEventsBatch(
    from: number,
    to: number,
  ): Promise<IEventsBatch> {
    const binancePoolContract = await this.getBinancePoolContract(true);

    await sleep(500);

    const unstakeRawEvents = await this.getPastEvents({
      provider: this.readProvider,
      contract: binancePoolContract,
      eventName: EBinancePoolEvents.UnstakePending,
      startBlock: from,
      latestBlockNumber: to,
      rangeStep: BNB_MAX_BLOCK_RANGE,
      filter: { claimer: this.currentAccount },
    });

    await sleep(500);

    const rebasingEvents = await this.getPastEvents({
      provider: this.readProvider,
      contract: binancePoolContract,
      eventName: EBinancePoolEvents.IsRebasing,
      startBlock: from,
      latestBlockNumber: to,
      rangeStep: BNB_MAX_BLOCK_RANGE,
    });

    const ratio = await this.getACRatio();

    return {
      stakeRawEvents: [],
      unstakeRawEvents,
      rebasingEvents,
      ratio,
    };
  }

  /**
   * Get pending data for aBNBb and aBNBc.
   *
   * @public
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const {
      unstakeRawEvents,
      rebasingEvents: isRebasingEvents,
      ratio,
    } = await this.getPoolEventsBatch(
      latestBlockNumber - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
      latestBlockNumber,
    );
    let pendingUnstakes = await this.getPendingClaim();
    let pendingRawEvents: EventData[] = [];

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakePendingReverse = unstakeRawEvents.reverse();

      for (
        let i = 0;
        i < unstakePendingReverse.length && !pendingUnstakes.isZero();
        i += 1
      ) {
        const unstakeEventItem = unstakePendingReverse[i];
        const itemAmount = this.convertFromWei(
          unstakeEventItem.returnValues.amount,
        );
        pendingUnstakes = pendingUnstakes.minus(itemAmount);

        pendingRawEvents = [...pendingRawEvents, unstakeEventItem];
      }
    }

    const abnbcHashSet = new Set<string>(
      isRebasingEvents
        .filter(x => x.raw.data === ZERO_EVENT_HASH)
        .map(y => y.transactionHash),
    );

    const pendingUnstakesABNBB = pendingRawEvents.filter(
      x => !abnbcHashSet.has(x.transactionHash),
    );
    const pendingUnstakesABNBC = pendingRawEvents.filter(x =>
      abnbcHashSet.has(x.transactionHash),
    );

    return {
      pendingBond: pendingUnstakesABNBB.reduce(
        (sum, item) => sum.plus(this.convertFromWei(item.returnValues.amount)),
        ZERO,
      ),
      pendingCertificate: pendingUnstakesABNBC.reduce(
        (sum, item) =>
          sum.plus(
            this.convertFromWei(item.returnValues.amount).multipliedBy(ratio),
          ),
        ZERO,
      ),
    };
  }

  /**
   * Get total pending unstake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getPendingClaim(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract();

    const pending = await binancePoolContract.methods
      .pendingUnstakesOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  /**
   * Get relayer fee.
   *
   * @public
   * @note The fee for cross-chain transfer of BNB between BNB Chain and BNB (Smart) Chain while staking it.
   * @returns {Promise<BigNumber>}
   */
  public async getRelayerFee(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract(true);

    const relayerFee = await binancePoolContract.methods.getRelayerFee().call();

    return this.convertFromWei(relayerFee);
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @note Caches computed gas fee value for future computations.
   * @param {BigNumber} amount - amount to stake
   * @param {TBnbSyntToken} token - token symbol
   * @returns {Promise<BigNumber>}
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: TBnbSyntToken,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const binancePoolContract = await this.getBinancePoolContract();

    const contractStake =
      binancePoolContract.methods[this.getStakeMethodName(token)];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: this.getSafeBinanceHexAmount(amount),
    });

    const increasedGasLimit = this.getIncreasedGasLimit(estimatedGas);

    const stakeGasFee = await provider.getContractMethodFee(increasedGasLimit);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  /**
   * Internal function to return stake method by token symbol.
   *
   * @private
   * @param {TBnbSyntToken} token - token symbol
   * @param {boolean | undefined} [withCode = false] - code flag
   * @returns {string}
   */
  private getStakeMethodName(token: TBnbSyntToken, withCode = false): string {
    switch (token) {
      case 'aBNBc':
        return withCode ? 'stakeAndClaimCertsWithCode' : 'stakeAndClaimCerts';

      default:
        return withCode ? 'stakeAndClaimBondsWithCode' : 'stakeAndClaimBonds';
    }
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @private
   * @param {number} gasLimit - initial gas limit
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * BNB_ESTIMATE_GAS_MULTIPLIER);
  }

  /**
   * Get transaction history.
   *
   * @public
   * @deprecated Use `getTxHistory` instead. This method will be removed.
   * @note Currently returns data for the last 14 days.
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    return this.getTxEventsHistoryRange(
      latestBlockNumber - BINANCE_HISTORY_2_WEEKS_BLOCK_OFFSET,
      latestBlockNumber,
    );
  }

  /**
   * Get transaction history.
   *
   * @public
   * @deprecated Use `getTxHistoryRange` instead. This method will be removed.
   * @note Currently returns data for block range.
   * @param {number} from - from block
   * @param {number} to - to block
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistoryRange(
    from: number,
    to: number,
  ): Promise<ITxEventsHistoryData> {
    const binancePoolContract = await this.getBinancePoolContract(true);

    const { unstakeRawEvents, rebasingEvents, ratio } =
      await this.getPoolEventsBatch(from, to);

    const stakeRawEvents = await this.getPastEvents({
      provider: this.readProvider,
      contract: binancePoolContract,
      eventName: EBinancePoolEvents.Staked,
      startBlock: from,
      latestBlockNumber: to,
      rangeStep: BNB_MAX_BLOCK_RANGE,
      filter: { delegator: this.currentAccount },
    });

    const abnbcHashSet = new Set<string>(
      rebasingEvents
        .filter(x => x.raw.data === ZERO_EVENT_HASH)
        .map(y => y.transactionHash),
    );

    let pendingUnstakes = await this.getPendingClaim();
    let completedRawEvents: EventData[] = [];
    let pendingRawEvents: EventData[] = [];

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse = unstakeRawEvents.reverse();

      for (
        let i = 0;
        i < unstakeRawEventsReverse.length && !pendingUnstakes.isZero();
        i += 1
      ) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const itemAmount = this.convertFromWei(
          unstakeRawEventItem.returnValues.amount,
        );
        pendingUnstakes = pendingUnstakes.minus(itemAmount);

        pendingRawEvents = [...pendingRawEvents, unstakeRawEventItem];
      }

      completedRawEvents = [
        ...stakeRawEvents,
        ...unstakeRawEventsReverse.slice(pendingRawEvents.length),
      ];
    } else {
      completedRawEvents = [...stakeRawEvents, ...unstakeRawEvents];
    }

    const completedABNBBEvents = completedRawEvents.filter(
      x => !abnbcHashSet.has(x.transactionHash),
    );
    const completedABNBCEvents = completedRawEvents.filter(x =>
      abnbcHashSet.has(x.transactionHash),
    );

    const pendingABNBBEvents = pendingRawEvents.filter(
      x => !abnbcHashSet.has(x.transactionHash),
    );
    const pendingABNBCEvents = pendingRawEvents.filter(x =>
      abnbcHashSet.has(x.transactionHash),
    );

    const completedBond = await this.getTxEventsHistoryGroup(
      completedABNBBEvents,
    );
    const completedCertificate = await this.getTxEventsHistoryGroup(
      completedABNBCEvents,
    );
    const pendingBond = await this.getTxEventsHistoryGroup(pendingABNBBEvents);
    const pendingCertificate = await this.getTxEventsHistoryGroup(
      pendingABNBCEvents,
    );

    return {
      completedBond,
      completedCertificate: completedCertificate.map(x => ({
        ...x,
        txAmount: x.txAmount.multipliedBy(ratio),
      })),
      pendingBond,
      pendingCertificate: pendingCertificate.map(x => ({
        ...x,
        txAmount: x.txAmount.multipliedBy(ratio),
      })),
      unstakeBond: [],
      unstakeCertificate: [],
    };
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
      BINANCE_POOL_CONTRACT_START_BLOCK,
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
   * @param {boolean | undefined} isUnstakeOnly - if true, only unstake events will be returned
   * @returns {Promise<ITxHistory>} - transaction history
   */
  public async getTxHistoryRange(
    lowestBlock: number,
    highestBlock: number,
    isUnstakeOnly = false,
  ): Promise<ITxHistory> {
    const binancePoolContract = await this.getBinancePoolContract(true);

    const getUnstakePastEventsArgs: IGetPastEvents = {
      latestBlockNumber: highestBlock,
      startBlock: lowestBlock,
      contract: binancePoolContract,
      eventName: EBinancePoolEvents.UnstakePending,
      provider: this.readProvider,
      rangeStep: BNB_MAX_BLOCK_RANGE,
    };

    const unstakeRawEvents = await this.getPastEvents({
      ...getUnstakePastEventsArgs,
      filter: { claimer: this.currentAccount },
    });

    if (!advancedAPIConfig.isActiveForBinance) {
      await sleep(500);
    }

    const rebasingEvents = await this.getPastEvents({
      ...getUnstakePastEventsArgs,
      eventName: EBinancePoolEvents.IsRebasing,
    });

    const abnbcHashSet = new Set<string>(
      rebasingEvents
        .filter(x => x.raw.data === ZERO_EVENT_HASH)
        .map(y => y.transactionHash),
    );

    const mapEvent = (event: EventData) => {
      const isRebasing = !abnbcHashSet.has(event.transactionHash);

      return {
        ...event,
        returnValues: {
          ...event.returnValues,
          isRebasing,
        },
      };
    };

    const updatedUnstakeEvents = unstakeRawEvents.map(mapEvent);
    const unstakeHistory = await this.getTxEventsHistoryGroup(
      updatedUnstakeEvents,
    );

    if (isUnstakeOnly) {
      return {
        stakeHistory: [],
        unstakeHistory,
      };
    }

    if (!advancedAPIConfig.isActiveForBinance) {
      await sleep(500);
    }

    const stakeRawEvents = await this.getPastEvents({
      ...getUnstakePastEventsArgs,
      eventName: EBinancePoolEvents.Staked,
      filter: { delegator: this.currentAccount },
    });

    const updatedStakeEvents = stakeRawEvents.map(mapEvent);

    const stakeHistory = await this.getTxEventsHistoryGroup(updatedStakeEvents);

    return {
      stakeHistory,
      unstakeHistory,
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
      amount: this.convertFromWei(amount),
      destinationAddress: tx.from as string | undefined,
      isPending: tx.transactionIndex === null,
    };
  }

  /**
   * Fetch unstake to external transaction data.
   *
   * @public
   * @note Parses first uint256 param from transaction input.
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IFetchTxData>}
   */
  public async fetchUnstakeTxData(txHash: string): Promise<IFetchTxData> {
    const provider = await this.getProvider();

    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);

    const { binanceConfig } = configFromEnv();

    const toAddress = tx.to?.toLowerCase();

    const address = tx.from;

    let amount;

    // TODO: https://ankrnetwork.atlassian.net/browse/STAKAN-2454
    if (toAddress === binanceConfig.swapPool.toLowerCase()) {
      const parameters = web3.eth.abi.decodeParameters(
        ['uint256'],
        tx.input.slice(10),
      );
      amount = parameters['0'];
    } else if (toAddress === binanceConfig.binancePool.toLowerCase()) {
      try {
        const parameters = web3.eth.abi.decodeParameters(
          ['address', 'uint256'],
          tx.input.slice(10),
        );
        amount = parameters['1'];
      } catch (e) {
        const parameters = web3.eth.abi.decodeParameters(
          ['uint256'],
          tx.input.slice(10),
        );
        amount = parameters['0'];
      }
    } else {
      throw new Error('Unsupported transaction');
    }

    return {
      amount: this.convertFromWei(amount),
      destinationAddress: address,
      isPending: tx.transactionIndex === null,
    };
  }

  /**
   * Fetch transaction receipt.
   *
   * @deprecated usefull only for old BNB tokens contracts in the testnet.
   * @public
   * @note Scans logs to find topic `0x0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d` to show the aBNBc amount.
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IGetTxReceipt | null>}
   */
  public async fetchTxReceiptOld(
    txHash: string,
  ): Promise<IGetTxReceipt | null> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    const certUnlockedLog = receipt?.logs.find(log =>
      log.topics.includes(CERT_STAKING_LOG_HASH),
    );

    if (certUnlockedLog) {
      const certDecodedLog = web3.eth.abi.decodeLog(
        [{ type: 'uint256', name: 'amount' }],
        certUnlockedLog.data,
        certUnlockedLog.topics,
      );

      return {
        ...receipt,
        certAmount: web3.utils.fromWei(certDecodedLog.amount),
      } as IGetTxReceipt | null;
    }

    return receipt as IGetTxReceipt | null;
  }

  /**
   * Fetch transaction receipt.
   *
   * @public
   * @note Scans logs to find topic `0x19e86fee7352f6a0c9bf1635ff7e554c083f9af69dff8d69c054f2ac5dba1a9c` to show the ankrBNB amount.
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IGetTxReceipt | null>}
   */
  public async fetchTxReceipt(txHash: string): Promise<IGetTxReceipt | null> {
    const provider = await this.getProvider();

    const {
      eth: { getTransactionReceipt },
      utils: { hexToNumberString },
    } = provider.getWeb3();

    const receipt = await getTransactionReceipt(txHash);

    const logWithTokenTypeInfo = receipt?.logs.find(log =>
      log.topics.includes(TOPIC_WITH_TOKEN_TYPE_INFO),
    );

    if (!logWithTokenTypeInfo) {
      return receipt as IGetTxReceipt | null;
    }

    const tokenType = +hexToNumberString(logWithTokenTypeInfo.data);
    const isAnkrBNB = tokenType === ETokenType.ankrBNB;

    if (isAnkrBNB) {
      const { binanceConfig } = configFromEnv();

      const logWithAmount = receipt.logs.find(
        log => log.address === binanceConfig.aBNBcToken,
      );

      const certAmount = logWithAmount
        ? this.convertFromWei(hexToNumberString(logWithAmount.data))
        : '0';

      return {
        ...receipt,
        certAmount,
      } as IGetTxReceipt | null;
    }

    return receipt as IGetTxReceipt | null;
  }

  /**
   * Checking whether a code partner exists.
   *
   * @param {string} partnerCode - partner code
   * @returns {Promise<boolean>}
   */
  public async checkExistPartnerCode(partnerCode: string): Promise<boolean> {
    const binancePartnersContract = await this.getBinancePartersContract();

    return binancePartnersContract.methods
      .ifExistPartnerByCode(partnerCode)
      .call();
  }

  /**
   * Get partner code by address.
   *
   * @param {string} address - partner address
   * @returns {Promise<string>}
   */
  public async getPartnerCodeByAddress(address: string): Promise<string> {
    const binancePartnersContract = await this.getBinancePartersContract();

    return binancePartnersContract.methods
      .getPartnerCodeByAddress(address)
      .call();
  }

  /**
   * Get claimable rewards for partner.
   *
   * @param {string} code - partner code
   * @returns {Promise<string>}
   */
  public async getPartnerClaimableRewards(code: string): Promise<BigNumber> {
    const binancePartnersContract = await this.getBinancePartersContract();

    const data = await binancePartnersContract.methods
      .getRewardsOf(code)
      .call();

    return this.convertFromWei(data);
  }

  /**
   * Get claim history for partner.
   *
   */
  public async getPartnerClaimHistory(
    code: string,
  ): Promise<IPartnerClaimHistoryData[]> {
    const binancePartnersContract = await this.getBinancePartersContract();
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const events = await this.getPastEvents({
      provider: this.readProvider,
      contract: binancePartnersContract,
      eventName: EBinancePartnersEvents.RewardsClaimed,
      startBlock: BINANCE_PARTNERS_CONTRACT_START_BLOCK,
      latestBlockNumber,
      rangeStep: BNB_MAX_BLOCK_RANGE,
      filter: { code },
    });

    const blockNumbers = events.map(event => event.blockNumber);
    const blocks = await this.getBlocks(web3, blockNumbers);

    const data = blocks.map((block, index) => ({
      ...events[index],
      timestamp: block.timestamp as number,
    }));

    return data
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(({ returnValues: { rewards }, timestamp }) => ({
        amount: this.convertFromWei(rewards),
        date: new Date(timestamp * 1_000),
      }));
  }

  /**
   * Claim partner rewards.
   *
   */
  public async claimPartnerRewards(): Promise<IWeb3SendResult> {
    const { binanceConfig } = configFromEnv();

    const binancePartnersContract = await this.getBinancePartersContract();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const data = binancePartnersContract.methods.claimRewards().encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.binancePartners,
      { data, estimate: true },
    );
  }

  /**
   * Stake token.
   *
   * @public
   * @note Initiates two transactions and connect if writeProvider isn't connected.
   * @note Estimates gas and multiplies it by `ESTIMATE_GAS_MULTIPLIER` to prevent MetaMask issue with gas calculation.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aBNBb or aBNBc)
   * @param {number | undefined} scale - scale factor for amount (not using)
   * @param {string} referralCode - referral code
   * @returns {Promise<IStakeData>}
   */
  public async stake(
    amount: BigNumber,
    token: string,
    scale?: number,
    referralCode?: string,
  ): Promise<IStakeData> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EBinanceErrorCodes.ZERO_AMOUNT);
    }
    const { binanceConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    let gasFee = this.stakeGasFee;

    if (!gasFee) {
      gasFee = await this.getStakeGasFee(amount, token as TBnbSyntToken);
    }

    const isUsingRefCode = !!referralCode;
    const balance = await this.getBNBBalance();
    const gasFeeSafeLimit = gasFee.multipliedBy(BNB_GAS_FEE_SAFE_LIMIT);
    const maxSafeAmount = balance.minus(gasFee).minus(gasFeeSafeLimit);
    const stakeAmount = amount.isGreaterThan(maxSafeAmount)
      ? maxSafeAmount
      : amount;

    if (stakeAmount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EBinanceErrorCodes.LOW_BALANCE_FOR_GAS_FEE);
    }

    const binancePoolContract = await this.getBinancePoolContract();

    const contractStake =
      binancePoolContract.methods[
        this.getStakeMethodName(token as TBnbSyntToken, isUsingRefCode)
      ];

    const safeHexAmount = this.getSafeBinanceHexAmount(stakeAmount);

    const gasLimit: number = isUsingRefCode
      ? await contractStake(referralCode).estimateGas({
          from: this.currentAccount,
          value: safeHexAmount,
        })
      : await contractStake().estimateGas({
          from: this.currentAccount,
          value: safeHexAmount,
        });

    if (isUsingRefCode) {
      const data = contractStake(referralCode).encodeABI();

      const tx = await this.writeProvider.sendTransactionAsync(
        this.currentAccount,
        binanceConfig.binancePool,
        { data, value: safeHexAmount, estimate: true },
      );

      return { txHash: tx.transactionHash };
    }

    const tx = await contractStake().send({
      from: this.currentAccount,
      value: safeHexAmount,
      gas: this.getIncreasedGasLimit(gasLimit),
    });

    return { txHash: tx.transactionHash };
  }

  /**
   * Unstake token.
   *
   * @public
   * @note You will need to call `approveACForAB` before that.
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aBNBb or aBNBc)
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unstake(
    amount: BigNumber,
    token: string,
  ): Promise<IWeb3SendResult> {
    const { binanceConfig } = configFromEnv();

    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EBinanceErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const binancePoolContract = await this.getBinancePoolContract();
    const hexAmount = this.convertToHex(amount);

    const contractUnstake =
      binancePoolContract.methods[
        this.getUnstakeMethodName(token as TBnbSyntToken)
      ];

    const data = contractUnstake(hexAmount).encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.binancePool,
      { data, estimate: true },
    );
  }

  /**
   * Unstake token to external address.
   *
   * @public
   * @note You will need to call `approveACForAB` before that.
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aBNBb or aBNBc)
   * @param {string} externalAddress - choose external address to unstake to
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unstakeToExternal(
    amount: BigNumber,
    token: string,
    externalAddress: string,
  ): Promise<IWeb3SendResult> {
    const { binanceConfig } = configFromEnv();

    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EBinanceErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const binancePoolContract = await this.getBinancePoolContract();
    const hexAmount = this.convertToHex(amount);

    const contractUnstake =
      binancePoolContract.methods[
        this.getUnstakeToExternalMethodName(token as TBnbSyntToken)
      ];

    const data = contractUnstake(externalAddress, hexAmount).encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.binancePool,
      { data, estimate: true },
    );
  }

  /**
   * Internal function to return unstake method by token symbol.
   *
   * @private
   * @param {TBnbSyntToken} token - token symbol
   * @returns {string}
   */
  private getUnstakeMethodName(token: TBnbSyntToken) {
    switch (token) {
      case 'aBNBc':
        return 'unstakeCerts';

      default:
        return 'unstakeBonds';
    }
  }

  /**
   * Internal function to return unstake method by token symbol.
   *
   * @private
   * @param {TBnbSyntToken} token - token symbol
   * @returns {string}
   */
  private getUnstakeToExternalMethodName(token: TBnbSyntToken) {
    switch (token) {
      case 'aBNBc':
        return 'unstakeCertsFor';

      default:
        return 'unstakeBondsFor';
    }
  }

  /**
   * Return aBNBc/BNB ratio.
   *
   * @public
   * @note [Read about aBNBc/BNB ratio](https://www.ankr.com/docs/staking/liquid-staking/bnb/staking-mechanics#exchange-ratio).
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const aBNBcContract = await this.getABNBCContract(true);
    const web3 = provider.getWeb3();

    const rawRatio = await aBNBcContract.methods.ratio().call();
    const ratio = web3.utils.fromWei(rawRatio);

    return new BigNumber(ratio);
  }

  /**
   * Returns certificate old aETHc token ratio
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getAETHRatio(): Promise<BigNumber> {
    const contract = await this.getAETHContract(true);
    const ratio = await contract.methods.ratio().call();

    return this.convertFromWei(ratio);
  }

  /**
   * Returns aBNBc token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const aBNBcContract = await this.getABNBCContract(true);

    const rawBalance = await aBNBcContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(rawBalance);
  }

  /**
   * Approve aBNBc for aBNBb, i.e. allow aBNBb smart contract to access and transfer aBNBc tokens.
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
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }
    const hexAmount = convertNumberToHex(
      amount,
      amount.isEqualTo(MAX_UINT256) ? MAX_UINT256_SCALE : scale,
    );

    const { binanceConfig } = configFromEnv();
    const aBNBcContract = await this.getABNBCContract();
    const data = aBNBcContract.methods
      .approve(binanceConfig.aBNBbToken, hexAmount)
      .encodeABI();
    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.aBNBcToken,
      { data, estimate: true },
    );
  }

  /**
   * Approve aMATICc for SwapPool, i.e. allow SwapPool smart contract to access and transfer aMATICc tokens.
   *
   * @public
   * @note Initiates connect if writeProvider doesn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber | undefined} [amount = MAX_UINT256] - amount to approve
   * @param {number | undefined} [scale = MATIC_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<boolean>}
   */
  public async approveACTokenForSwapPool(
    amount: BigNumber = MAX_UINT256,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<IWeb3SendResult> {
    const acTokenContract = await this.getABNBCContract();
    const { binanceConfig } = configFromEnv();

    const amountHex = convertNumberToHex(
      amount,
      amount.isEqualTo(MAX_UINT256) ? MAX_UINT256_SCALE : scale,
    );
    const txn = acTokenContract.methods.approve(
      binanceConfig.swapPool,
      amountHex,
    );

    const gasLimit: number = await txn.estimateGas({
      from: this.currentAccount,
    });

    const gasPrice = await this.writeProvider.getSafeGasPriceWei();

    return txn.send({
      from: this.currentAccount,
      gas: this.getIncreasedGasLimit(gasLimit),
      gasPrice: gasPrice.toString(10),
    });
  }

  /**
   * Checks if allowance is greater or equal to amount.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @param {string} [hexAmount] - amount in HEX
   * @returns {Promise<boolean>} - true if amount doesn't exceed allowance, false - otherwise.
   */
  public async checkAllowance(hexAmount: string): Promise<boolean> {
    const allowance = await this.getACAllowance();

    return allowance.isGreaterThanOrEqualTo(hexAmount);
  }

  /**
   * Return aBNBc token allowance.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @returns {Promise<BigNumber>} - allowance
   */
  public async getACAllowance(): Promise<BigNumber> {
    const aBNBcContract = await this.getABNBCContract();
    const { binanceConfig } = configFromEnv();

    const allowance = await aBNBcContract.methods
      .allowance(this.currentAccount, binanceConfig.aBNBbToken)
      .call();

    return this.convertFromWei(allowance);
  }

  /**
   * Return aBNBc Swap Pool token allowance.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @returns {Promise<BigNumber>} - allowance
   */
  public async getACSwapPoolAllowance(): Promise<BigNumber> {
    const acTokenContract = await this.getABNBCContract();
    const { binanceConfig } = configFromEnv();

    return this.convertFromWei(
      await acTokenContract.methods
        .allowance(this.currentAccount, binanceConfig.swapPool)
        .call(),
    );
  }

  /**
   * Switch aBNBc to aBNBb.
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
      throw new Error(EBinanceErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aBNBbContract = await this.getABNBBContract();
    const { binanceConfig } = configFromEnv();

    const data = aBNBbContract.methods
      .lockShares(convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.aBNBbToken,
      { data, estimate: true },
    );
  }

  /**
   * Switch aBNBb to aBNBc.
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
      throw new Error(EBinanceErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aBNBbContract = await this.getABNBBContract();
    const { binanceConfig } = configFromEnv();

    const data = aBNBbContract.methods
      .unlockShares(convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.aBNBbToken,
      { data, estimate: true },
    );
  }

  /**
   * Swap old aETHc to new aETHc
   *
   * @public
   * @param {BigNumber} amount - amount to swap
   * @returns {Promise<IWeb3SendResult>}
   */
  public async swapOldAETHC(amount: BigNumber): Promise<IWeb3SendResult> {
    const contract = await this.getAETHContract();
    const { binanceConfig } = configFromEnv();

    const data = contract.methods
      .swapOld(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.aETHToken,
      { data, estimate: true },
    );
  }

  /**
   * Flash Unstake token.
   *
   * @public
   * @note For aMATICc token only.
   * @note You will need to call `approveACTokenForSwapPool` before that.
   * @note Initiates connect if writeProvider doesn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aMATICb or aMATICc)
   * @param {number | undefined} [scale = MATIC_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<void>}
   */
  public async flashUnstake(
    amount: BigNumber,
    token: string,
    scale = MATIC_SCALE_FACTOR,
  ): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }
    const { binanceConfig } = configFromEnv();
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const amountHex = convertNumberToHex(amount, scale);
    const swapPoolContract = await this.getSwapPoolContract();

    const txn = swapPoolContract.methods.swapEth(
      amountHex,
      this.currentAccount,
    );

    const gasLimit: number = await txn.estimateGas({
      from: this.currentAccount,
    });

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      binanceConfig.swapPool,
      {
        data: txn.encodeABI(),
        estimate: true,
        gasLimit: this.getIncreasedGasLimit(gasLimit).toString(),
      },
    );
  }

  /**
   * Return WBNBb swap pool token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getWBNBSwapPoolBalance(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract(true);

    const balance = await swapPoolContract.methods.wbnbAmount().call();

    return this.convertFromWei(balance);
  }

  /**
   * Return BNB swap pool token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getBNBSwapPoolLiquidity(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract(true);

    const balance = await swapPoolContract.methods
      .getAvailableLiquidity()
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return unstake fee for swap pool.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable fee
   */
  public async getSwapPoolUnstakeFee(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract(true);

    const fee = await swapPoolContract.methods.unstakeFee().call();

    return new BigNumber(fee);
  }

  /**
   * Return BNB swap pool max fee.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable fee
   */
  public async getBNBSwapPoolMaxFee(): Promise<BigNumber> {
    const swapPoolContract = await this.getSwapPoolContract(true);

    const maxFee = await swapPoolContract.methods.FEE_MAX().call();

    return new BigNumber(maxFee);
  }
}
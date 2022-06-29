import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import {
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import {
  ETH_SCALE_FACTOR,
  isMainnet,
  MAX_UINT256,
  ZERO,
  configFromEnv,
  ZERO_EVENT_HASH,
} from '../common';
import {
  ABI_ERC20,
  ABI_ABNBB,
  ABI_ABNBC,
  ABI_BINANCE_POOL,
} from '../contracts';
import {
  ITxEventsHistoryData,
  IGetPastEvents,
  IPendingData,
  ITxEventsHistoryGroupItem,
  IEventsBatch,
  IStakable,
  IStakeData,
} from '../stake';
import { IFetchTxData, IShareArgs, ISwitcher } from '../switcher';
import { convertNumberToHex } from '../utils';

import {
  BINANCE_HISTORY_BLOCK_OFFSET,
  BINANCE_READ_PROVIDER_ID,
  BNB_MAX_BLOCK_RANGE,
  BNB_SAFE_PRECISION,
  CERT_STAKING_LOG_HASH,
  ESTIMATE_GAS_MULTIPLIER,
} from './const';
import {
  TBnbSyntToken,
  IBinanceSDKProviders,
  IGetTxReceipt,
  EBinancePoolEvents,
  EBinancePoolEventsMap,
  EBinanceErrorCodes,
} from './types';

/**
 * BinanceSDK allows you to interact with Binance Liquid Staking smart contracts on BNB Smart Chain: aBNBb, aBNBc, and BinancePool. <br /><br />For more information on Binance Liquid Staking from Ankr, refer to the <a href="https://www.ankr.com/docs/staking/liquid-staking/bnb/staking-mechanics">development details</a>.
 *
 * @class
 */
export class BinanceSDK implements ISwitcher, IStakable {
  /**
   * instance — SDK instance.
   * @type {BinanceSDK}
   * @static
   * @private
   */
  private static instance?: BinanceSDK;

  /**
   * writeProvider — provider which has signer for signing transactions.
   * @type {Web3KeyWriteProvider}
   * @private
   */
  private readonly writeProvider: Web3KeyWriteProvider;

  /**
   * readProvider — provider which allows to read data without connecting the wallet.
   * @type {Web3KeyReadProvider}
   * @private
   */
  private readonly readProvider: Web3KeyReadProvider;

  /**
   * currentAccount — connected account.
   * @type {string}
   * @private
   */
  private currentAccount: string;

  /**
   * stakeGasFee — cached stake gas fee.
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
  private constructor({ readProvider, writeProvider }: IBinanceSDKProviders) {
    BinanceSDK.instance = this;

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
   * @returns {Promise<PolygonSDK>}
   */
  public static async getInstance(): Promise<BinanceSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(BINANCE_READ_PROVIDER_ID),
    ]);

    const addrHasNotBeenUpdated =
      BinanceSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      BinanceSDK.instance?.writeProvider === writeProvider &&
      BinanceSDK.instance?.readProvider === readProvider;

    if (BinanceSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return BinanceSDK.instance;
    }

    const instance = new BinanceSDK({ writeProvider, readProvider });
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
   * Internal function to get past events, using the defined range.
   *
   * @private
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEvents({
    contract,
    eventName,
    startBlock,
    rangeStep,
    filter,
    latestBlockNumber,
  }: IGetPastEvents): Promise<EventData[]> {
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
   * TODO: reuse it from stake/api/getTxEventsHistoryGroup
   *
   * @private
   * @param {EventData} [rawEvents] - events
   * @returns {Promise<ITxEventsHistoryGroupItem[]>}
   */
  private async getTxEventsHistoryGroup(
    rawEvents?: EventData[],
  ): Promise<ITxEventsHistoryGroupItem[]> {
    if (!Array.isArray(rawEvents) || !rawEvents.length) {
      return [];
    }

    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    const calls = rawEvents.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks = await provider.executeBatchCalls<BlockTransactionObject>(
      calls,
    );

    const rawData = blocks.map((block, index) => ({
      ...rawEvents[index],
      timestamp: block.timestamp as number,
    }));

    return rawData
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(
        ({ event, returnValues: { amount }, timestamp, transactionHash }) => ({
          txAmount: this.convertFromWei(amount),
          txDate: new Date(timestamp * 1_000),
          txHash: transactionHash,
          txType: this.getTxType(event),
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
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ABNBB as AbiItem[],
      binanceConfig.aBNBbToken,
    );
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
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol (aBNBb or aBNBc)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { binanceConfig } = configFromEnv();
    const isAbnbb = token === 'aBNBb';

    const tokenContract = isAbnbb
      ? await this.getABNBBContract()
      : await this.getABNBCContract();

    const address = isAbnbb
      ? binanceConfig.aBNBbToken
      : binanceConfig.aBNBcToken;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      tokenContract.methods.symbol().call(),
      tokenContract.methods.decimals().call(),
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
    const aBNBbTokenContract = await this.getABNBBContract();

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
    const contract = await this.getWrappedBNBContract();

    const [currBalance, decimals] = await Promise.all([
      web3.eth.getBalance(this.currentAccount),
      contract.methods.decimals().call(),
    ]);

    return this.readProvider.getFormattedBalance(currBalance, decimals);
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract();

    const minStake = await binancePoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Internal function to return raw pool events.
   *
   * @private
   * @returns {Promise<IEventsBatch>}
   */
  private async getPoolEventsBatch(): Promise<IEventsBatch> {
    const binancePoolContract = await this.getBinancePoolContract(true);
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const [unstakeRawEvents, rebasingEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: binancePoolContract,
        eventName: EBinancePoolEvents.UnstakePending,
        startBlock: latestBlockNumber - BINANCE_HISTORY_BLOCK_OFFSET,
        latestBlockNumber,
        rangeStep: BNB_MAX_BLOCK_RANGE,
        filter: { claimer: this.currentAccount },
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: binancePoolContract,
        eventName: EBinancePoolEvents.IsRebasing,
        startBlock: latestBlockNumber - BINANCE_HISTORY_BLOCK_OFFSET,
        latestBlockNumber,
        rangeStep: BNB_MAX_BLOCK_RANGE,
      }),
      this.getACRatio(),
    ]);

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
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    const {
      unstakeRawEvents,
      rebasingEvents: isRebasingEvents,
      ratio,
    } = await this.getPoolEventsBatch();
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
   * @note This is a fee for cross-chain transfer of BNB between BNB Chain and BNB (Smart) Chain while staking it.
   * @returns {Promise<BigNumber>}
   */
  public async getRelayerFee(): Promise<BigNumber> {
    const binancePoolContract = await this.getBinancePoolContract();

    const relayerFee = await binancePoolContract.methods.getRelayerFee().call();

    return this.convertFromWei(relayerFee);
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @note Caches computed gas fee value for future computations.
   * @param {string} amount - amount to stake
   * @param {TBnbSyntToken} token - token symbol
   * @returns {Promise<BigNumber>}
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: TBnbSyntToken,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const binancePoolContract = await this.getBinancePoolContract();

    const bnbSpecificAmount = new BigNumber(
      amount.toPrecision(BNB_SAFE_PRECISION, BigNumber.ROUND_DOWN),
    );

    const contractStake =
      binancePoolContract.methods[this.getStakeMethodName(token)];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: this.convertToHex(bnbSpecificAmount),
    });

    const increasedGasLimit = this.getIncreasedGasLimit(estimatedGas);

    const stakeGasFee = await provider.getContractMethodFee(increasedGasLimit);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  /**
   * Internal function to return stake method by token symbol.
   *
   * @param {TBnbSyntToken} token - token symbol
   * @returns {string}
   */
  private getStakeMethodName(token: TBnbSyntToken) {
    switch (token) {
      case 'aBNBc':
        return 'stakeAndClaimCerts';

      default:
        return 'stakeAndClaimBonds';
    }
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @param {number} gasLimit - initial gas limit
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * ESTIMATE_GAS_MULTIPLIER);
  }

  /**
   * Get transaction history.
   *
   * @public
   * @note Currently returns data for the last 14 days.
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const binancePoolContract = await this.getBinancePoolContract(true);
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const { unstakeRawEvents, rebasingEvents, ratio } =
      await this.getPoolEventsBatch();

    const stakeRawEvents = await this.getPastEvents({
      provider: this.readProvider,
      contract: binancePoolContract,
      eventName: EBinancePoolEvents.Staked,
      startBlock: latestBlockNumber - BINANCE_HISTORY_BLOCK_OFFSET,
      latestBlockNumber,
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

    const [
      completedBond,
      completedCertificate,
      pendingBond,
      pendingCertificate,
    ] = await Promise.all([
      this.getTxEventsHistoryGroup(completedABNBBEvents),
      this.getTxEventsHistoryGroup(completedABNBCEvents),
      this.getTxEventsHistoryGroup(pendingABNBBEvents),
      this.getTxEventsHistoryGroup(pendingABNBCEvents),
    ]);

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
    };
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
   * Fetch transaction receipt.
   *
   * @public
   * @note Scans logs to find topic `0x0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d` to show the aBNBc amount.
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IGetTxReceipt | null>}
   */
  public async fetchTxReceipt(txHash: string): Promise<IGetTxReceipt | null> {
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
   * Stake token.
   *
   * @public
   * @note Initiates two transactions and connect if writeProvider isn't connected.
   * @note Estimates gas and multiplies it by `ESTIMATE_GAS_MULTIPLIER` to prevent MetaMask issue with gas calculation.
   * @note <a href="https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens">Read about Ankr Liquid Staking token types</a>.
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aBNBb or aBNBc)
   * @returns {Promise<IStakeData>}
   */
  public async stake(amount: BigNumber, token: string): Promise<IStakeData> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EBinanceErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    let gasFee = this.stakeGasFee;
    if (!gasFee) {
      gasFee = await this.getStakeGasFee(amount, token as TBnbSyntToken);
    }

    const balance = await this.getBNBBalance();
    const maxAmount = balance.minus(gasFee);
    const stakeAmount = amount.isGreaterThan(maxAmount) ? maxAmount : amount;
    const binancePoolContract = await this.getBinancePoolContract();

    const bnbSpecificAmount = new BigNumber(
      stakeAmount.toPrecision(BNB_SAFE_PRECISION, BigNumber.ROUND_DOWN),
    );

    const contractStake =
      binancePoolContract.methods[
        this.getStakeMethodName(token as TBnbSyntToken)
      ];

    const gasLimit: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: this.convertToHex(bnbSpecificAmount),
    });

    const tx = await contractStake().send({
      from: this.currentAccount,
      value: this.convertToHex(bnbSpecificAmount),
      gas: this.getIncreasedGasLimit(gasLimit),
    });

    return { txHash: tx.transactionHash };
  }

  /**
   * Unstake token.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note <a href="https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens">Read about Ankr Liquid Staking token types</a>.
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aBNBb or aBNBc)
   * @returns {Promise<void>}
   */
  public async unstake(amount: BigNumber, token: string): Promise<void> {
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

    await contractUnstake(hexAmount).send({
      from: this.currentAccount,
    });
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
   * Return aBNBc/BNB ratio.
   *
   * @public
   * @note <a href="https://www.ankr.com/docs/staking/liquid-staking/bnb/staking-mechanics#exchange-ratio">Read more on aBNBc/BNB ratio</a>.
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const aBNBcContract = await this.getABNBCContract();
    const web3 = provider.getWeb3();

    const rawRatio = await aBNBcContract.methods.ratio().call();
    const ratio = web3.utils.fromWei(rawRatio);

    return new BigNumber(ratio);
  }

  /**
   * Returns Certificate BNB token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const aBNBcContract = await this.getABNBCContract();

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

    const hexAmount = convertNumberToHex(amount, scale);
    const isAllowed = await this.checkAllowance(hexAmount);

    if (isAllowed) {
      return undefined;
    }

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
   * Checks if allowance is greater or equal to amount.
   *
   * @public
   * @note Allowance is the amount which _spender is still allowed to withdraw from _owner.
   * @param {string} [amount] - amount
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
   * @param {string} [spender] - spender address (by default it is aBNBb token address)
   * @returns {Promise<BigNumber>} - allowance in wei
   */
  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const aBNBcContract = await this.getABNBCContract();
    const { binanceConfig } = configFromEnv();

    const allowance = await aBNBcContract.methods
      .allowance(
        this.writeProvider.currentAccount,
        spender || binanceConfig.aBNBbToken,
      )
      .call();

    return new BigNumber(allowance);
  }

  /**
   * Switch aBNBc to aBNBb.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {BigNumber} amount - amount to switch
   * @param {number} [scale = 10 ** 18] - scale factor for amount
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
   * @param {BigNumber} amount - amount to switch
   * @param {number} [scale = 10 ** 18] - scale factor for amount
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
}

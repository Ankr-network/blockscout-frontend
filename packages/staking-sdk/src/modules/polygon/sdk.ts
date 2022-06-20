import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import {
  EEthereumNetworkId,
  IWeb3SendResult,
  ProviderManager,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from 'provider';

import { ApiGateway } from '../api';
import {
  configFromEnv,
  ETH_NETWORK_BY_ENV,
  ETH_SCALE_FACTOR,
  MAX_UINT256,
  ZERO,
} from '../common';
import ABI_AMATICB from '../contracts/aMATICb.json';
import ABI_AMATICC from '../contracts/aMATICc.json';
import ABI_ERC20 from '../contracts/IERC20.json';
import ABI_POLYGON_POOL from '../contracts/PolygonPoolV3.json';
import {
  IPendingData,
  ITxEventsHistoryGroupItem,
  ITxEventsHistoryData,
  IStakable,
} from '../stake';
import { ISwitcher } from '../switcher';
import { convertNumberToHex } from '../utils';

import {
  ALLOWANCE_RATE,
  BLOCK_OFFSET,
  DEFAULT_THEME,
  MAX_BLOCK_RANGE,
  POLYGON_PROVIDER_READ_ID,
} from './const';
import {
  TMaticSyntToken,
  EPolygonPoolEvents,
  EPolygonPoolEventsMap,
  IEventsBatch,
  IGetTxData,
  ITxHistoryEventData,
  IPolygonSDKProviders,
  IGetPastEvents,
  ILockSharesArgs,
  IUnlockSharesArgs,
  EErrorCodes,
} from './types';

/**
 * PolygonSDK allows to interact with Ethereum blockchain, aMATICb/aMATICc tokens and Polygon pool contracts.
 *
 * @class
 */
export class PolygonSDK implements ISwitcher, IStakable {
  /**
   * instance - sdk instance
   * @type {Web3KeyWriteProvider}
   * @static
   * @private
   */
  private static instance?: PolygonSDK;

  /**
   * writeProvider - provider which has signer
   * @type {Web3KeyWriteProvider}
   * @private
   */
  private readonly writeProvider: Web3KeyWriteProvider;

  /**
   * readProvider - provider which allows to read data without connecting the wallet
   * @type {Web3KeyReadProvider}
   * @private
   */
  private readonly readProvider: Web3KeyReadProvider;

  /**
   * apiGateWay - gateway instance
   * @type {ApiGateway}
   * @private
   */
  private readonly apiGateWay: ApiGateway;

  /**
   * currentAccount - connected account
   * @type {string}
   * @private
   */
  private currentAccount: string;

  /**
   * Private constructor - use `PolygonSDK.getInstance` instead
   *
   * @constructor
   * @private
   * @param {IPolygonSDKProviders} - read and write providers
   */
  private constructor({ writeProvider, readProvider }: IPolygonSDKProviders) {
    PolygonSDK.instance = this;

    const config = configFromEnv();
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
    this.apiGateWay = new ApiGateway(config.gatewayConfig);
  }

  /**
   * Initialization method for sdk
   *
   * Auto connects write provider if chains are the same.
   * Initialize read provider to support multiple chains.
   *
   * @public
   * @returns {Promise<PolygonSDK>}
   */
  public static async getInstance(): Promise<PolygonSDK> {
    const providerManager = new ProviderManager(DEFAULT_THEME);
    const [writeProvider, readProvider] = (await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(POLYGON_PROVIDER_READ_ID),
    ])) as unknown as [Web3KeyWriteProvider, Web3KeyReadProvider];

    const addressHasNotBeenUpdated =
      PolygonSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      PolygonSDK.instance?.writeProvider === writeProvider &&
      PolygonSDK.instance?.readProvider === readProvider;

    if (PolygonSDK.instance && addressHasNotBeenUpdated && hasNewProvider) {
      return PolygonSDK.instance;
    }

    const instance = new PolygonSDK({ writeProvider, readProvider });
    const isEthChain = await instance.isEthNetwork(writeProvider);

    if (isEthChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  /**
   * Internal function to choose right provider for read on write purpose.
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

    const isEthChain = await this.isEthNetwork(this.writeProvider);

    if (isEthChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isEthChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  /**
   * Internal function to check current network
   *
   * @private
   * @param {Web3KeyWriteProvider} provider - current selected provider
   * @returns {Promise<boolean>}
   */
  private async isEthNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      chainId,
    );
  }

  /**
   * Internal function to get Matic token contract
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getMaticTokenContract(isForceRead = false): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      contractConfig.maticToken,
    );
  }

  /**
   * Internal function to get Bond Matic token contract
   *
   * @private
   * @param {Web3} web3 - web3 instance
   * @returns {Promise<Contract>}
   */
  private static getAMATICBTokenContract(web3: Web3): Contract {
    const { contractConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICB as AbiItem[],
      contractConfig.aMaticbToken,
    );
  }

  /**
   * Internal function to get Certificate Matic token contract
   *
   * @private
   * @param {Web3} web3 - web3 instance
   * @returns {Promise<Contract>}
   */
  private static getAMATICCTokenContract(web3: Web3): Contract {
    const { contractConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICC as AbiItem[],
      contractConfig.aMaticCToken,
    );
  }

  /**
   * Internal function to get Polygon pool contract
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getPolygonPoolContract(isForceRead = false): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_POLYGON_POOL as AbiItem[],
      contractConfig.polygonPool,
    );
  }

  /**
   * Internal function to get Ankr token contract
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use read provider
   * @returns {Promise<Contract>}
   */
  private async getAnkrTokenContract(isForceRead = false): Promise<Contract> {
    const { contractConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      ABI_ERC20 as AbiItem[],
      contractConfig.ankrContract,
    );
  }

  /**
   * Internal function map event type to transaction type
   *
   * @private
   * @param {string} [rawTxType] - transaction type
   * @returns {string | null}
   */
  private getTxType(rawTxType?: string): string | null {
    switch (rawTxType) {
      case EPolygonPoolEvents.MaticClaimPending:
      case EPolygonPoolEvents.TokensBurned:
        return EPolygonPoolEventsMap.Unstaking;

      case EPolygonPoolEvents.StakePendingV2:
        return EPolygonPoolEventsMap.Staking;

      default:
        return null;
    }
  }

  /**
   * Internal function to convert wei value to human readable format
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  /**
   * Internal function to get past events using the defined range
   *
   * @typedef {Object} IGetPastEvents
   * @property {Contract} contract - selected contract
   * @property {string} eventName - event name
   * @property {number} startBlock - start block (from)
   * @property {number} latestBlockNumber - last block (to)
   * @property {number} rangeStep - range
   * @property {Filter} filter - events filter
   *
   * @private
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEvents({
    contract,
    eventName,
    startBlock,
    latestBlockNumber,
    rangeStep,
    filter,
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
   * Internal function returns transaction history group from events
   * TODO: reuse it form stake/api/getTxEventsHistoryGroup
   *
   * @typedef {Object} ITxEventsHistoryGroupItem
   * @property {BigNumber} txAmount - transaction amount
   * @property {Date} txDate - transaction date
   * @property {string} txHash - transaction hash
   * @property {string | null} txType - transaction type
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

    const rawData: ITxHistoryEventData[] = blocks.map((block, index) => ({
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
   * Returns matic token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getMaticBalance(): Promise<BigNumber> {
    const maticTokenContract = await this.getMaticTokenContract();

    const balance = await maticTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Returns bond matic token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getABBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticbTokenContract = PolygonSDK.getAMATICBTokenContract(web3);

    const balance = await aMaticbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Returns certificate matic token balance
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);

    const balance = await aMaticCTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Returns certificate matic token ratio
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);

    const ratio = await aMaticCTokenContract.methods.ratio().call();

    return this.convertFromWei(ratio);
  }

  /**
   * Returns certificate matic token allowance
   *
   * @public
   * @param {string} [spender] - spender address (by default it's aMATICb token address)
   * @returns {Promise<BigNumber>} - allowance in wei
   */
  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);
    const { contractConfig } = configFromEnv();

    const allowance = await aMaticCTokenContract.methods
      .allowance(
        this.writeProvider.currentAccount,
        spender || contractConfig.aMaticbToken,
      )
      .call();

    return new BigNumber(allowance);
  }

  /**
   * Approve certificate token for bond.
   *
   * @public
   * @note Initiates connect if write provider isn't connected.
   * @param {BigNumber} [amount] - amount to approve (by default it's MAX_UINT256)
   * @param {number} [scale = 1] - scale factor for amount
   * @returns {Promise<IWeb3SendResult | undefined>}
   */
  public async approveACForAB(
    amount: BigNumber = MAX_UINT256,
    scale?: number,
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticCTokenContract = PolygonSDK.getAMATICCTokenContract(web3);

    const data = aMaticCTokenContract.methods
      .approve(contractConfig.aMaticbToken, convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aMaticCToken,
      { data, estimate: true },
    );
  }

  /**
   * Lock shares
   *
   * @public
   * @note Initiates connect if write provider isn't connected.
   * @param {BigNumber} amount - amount to lock
   * @param {number} [scale = 10 ** 18] - scale factor for amount
   * @returns {Promise<IWeb3SendResult>}
   */
  public async lockShares({
    amount,
    scale = ETH_SCALE_FACTOR,
  }: ILockSharesArgs): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticbTokenContract = PolygonSDK.getAMATICBTokenContract(web3);

    const data = aMaticbTokenContract.methods
      .lockShares(convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aMaticbToken,
      { data, estimate: true },
    );
  }

  /**
   * Unlock shares
   *
   * @public
   * @note Initiates connect if write provider isn't connected.
   * @param {BigNumber} amount - amount to lock
   * @param {number} [scale = 10 ** 18] - scale factor for amount
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unlockShares({
    amount,
    scale = ETH_SCALE_FACTOR,
  }: IUnlockSharesArgs): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticbTokenContract = PolygonSDK.getAMATICBTokenContract(web3);

    const data = aMaticbTokenContract.methods
      .unlockShares(convertNumberToHex(amount, scale))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.aMaticbToken,
      { data, estimate: true },
    );
  }

  /**
   * Get total pending unstake amount
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getPendingClaim(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const pending = await polygonPoolContract.methods
      .pendingMaticClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  /**
   * Get pending data by bond and certificate
   *
   * @typedef {Object} IPendingData
   * @property {BigNumber} pendingBond - pending bond unstakes
   * @property {BigNumber} pendingCertificate - pending certificate unstakes
   *
   * @public
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    const { unstakeRawEvents, ratio } = await this.getPoolEventsBatch();
    let totalUnstakingValue = await this.getPendingClaim();

    let pendingRawEvents: EventData[] = [];

    if (totalUnstakingValue.isGreaterThan(ZERO)) {
      const unstakePendingReverse: EventData[] = unstakeRawEvents.reverse();

      for (
        let i = 0;
        i < unstakePendingReverse.length && !totalUnstakingValue.isZero();
        i += 1
      ) {
        const unstakeEventItem = unstakePendingReverse[i];
        const isCert = !unstakeEventItem.returnValues.isRebasing;

        const itemAmount =
          isCert && !ratio.isZero()
            ? this.convertFromWei(
                unstakeEventItem.returnValues.amount,
              ).dividedBy(ratio)
            : this.convertFromWei(unstakeEventItem.returnValues.amount);

        totalUnstakingValue = totalUnstakingValue.minus(itemAmount);

        pendingRawEvents = [...pendingRawEvents, unstakeEventItem];
      }
    }

    const pendingBondEvents = pendingRawEvents.filter(
      x => x.returnValues.isRebasing,
    );
    const pendingCertificateEvents = pendingRawEvents.filter(
      x => !x.returnValues.isRebasing,
    );

    return {
      pendingBond: pendingBondEvents.reduce(
        (sum, item) => sum.plus(this.convertFromWei(item.returnValues.amount)),
        ZERO,
      ),
      pendingCertificate: pendingCertificateEvents.reduce(
        (sum, item) =>
          sum.plus(
            this.convertFromWei(item.returnValues.amount).multipliedBy(ratio),
          ),
        ZERO,
      ),
    };
  }

  /**
   * Get minimum stake amount
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract();

    const minStake = await polygonPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Internal function returns pool raw events
   *
   * @typedef {Object} IEventsBatch
   * @property {EventData[]} stakeRawEvents - stake raw events
   * @property {EventData[]} unstakeRawEvents - unstake raw events
   * @property {BigNumber} ratio - certificate ratio
   *
   * @private
   * @returns {Promise<IEventsBatch>}
   */
  private async getPoolEventsBatch(): Promise<IEventsBatch> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);

    const latestBlockNumber = await this.readProvider
      .getWeb3()
      .eth.getBlockNumber();
    const startBlock = latestBlockNumber - BLOCK_OFFSET;

    const [stakeRawEvents, unstakeRawEvents, ratio] = await Promise.all([
      this.getPastEvents({
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.StakePendingV2,
        startBlock,
        latestBlockNumber,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getPastEvents({
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.TokensBurned,
        startBlock,
        latestBlockNumber,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getACRatio(),
    ]);

    return {
      stakeRawEvents,
      unstakeRawEvents,
      ratio,
    };
  }

  /**
   * Get transaction history
   *
   * @typedef {Object} ITxEventsHistoryGroupItem
   * @property {BigNumber} txAmount - transaction amount
   * @property {Date} txDate - transaction date
   * @property {string} txHash - transaction hash
   * @property {(string | null)} txType - transaction type (stake or unstake)
   *
   * @typedef {Object} ITxEventsHistoryData
   * @property {ITxEventsHistoryGroupItem[]} completedBond - completed transactions for bond tokens
   * @property {ITxEventsHistoryGroupItem[]} completedCertificate - completed transaction for certificate tokens
   * @property {ITxEventsHistoryGroupItem[]} pendingBond - pending unstakes for bond tokens
   * @property {ITxEventsHistoryGroupItem[]} pendingCertificate - pending unstakes for certificate tokens
   *
   * @public
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const { stakeRawEvents, unstakeRawEvents, ratio } =
      await this.getPoolEventsBatch();

    let pendingUnstakes = await this.getPendingClaim();
    let completedRawEvents: EventData[] = [];
    let pendingRawEvents: EventData[] = [];

    if (pendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse: EventData[] = unstakeRawEvents.reverse();

      for (
        let i = 0;
        i < unstakeRawEventsReverse.length && !pendingUnstakes.isZero();
        i += 1
      ) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const isCert = !unstakeRawEventItem.returnValues.isRebasing;

        const itemAmount = isCert
          ? this.convertFromWei(
              unstakeRawEventItem.returnValues.amount,
            ).dividedBy(ratio)
          : this.convertFromWei(unstakeRawEventItem.returnValues.amount);

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

    const completedBondEvents = completedRawEvents.filter(
      x => x.returnValues.isRebasing,
    );
    const completedCertificateEvents = completedRawEvents.filter(
      x => !x.returnValues.isRebasing,
    );

    const pendingBondEvents = pendingRawEvents.filter(
      x => x.returnValues.isRebasing,
    );
    const pendingCertificateEvents = pendingRawEvents.filter(
      x => !x.returnValues.isRebasing,
    );

    const [
      completedBond,
      completedCertificate,
      pendingBond,
      pendingCertificate,
    ] = await Promise.all([
      this.getTxEventsHistoryGroup(completedBondEvents),
      this.getTxEventsHistoryGroup(completedCertificateEvents),
      this.getTxEventsHistoryGroup(pendingBondEvents),
      this.getTxEventsHistoryGroup(pendingCertificateEvents),
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
   * @typedef {Object} IFetchTxData
   * @property {BigNumber} [amount] - transaction amount or value
   * @property {boolean} isPending - is transaction still in pending state
   * @property {string} [destinationAddress] - transaction destination address
   *
   * @public
   * @note parses first uint256 param from transaction input
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IFetchTxData>}
   */
  public async fetchTxData(txHash: string): Promise<IGetTxData> {
    const provider = await this.getProvider();

    const web3 = provider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);
    const { 0: lockShares } = web3.eth.abi.decodeParameters(
      ['uint256'],
      tx.input.slice(10),
    );

    return {
      amount: new BigNumber(web3.utils.fromWei(lockShares)),
      destinationAddress: tx.from as string | undefined,
      isPending: tx.transactionIndex === null,
    };
  }

  /**
   * Fetch transaction receipt
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
   * Internal function returns stake method by token symbol
   *
   * @param {string} token - token symbol
   * @returns {string}
   */
  private getStakeMethodName(token: TMaticSyntToken): string {
    switch (token) {
      case 'aMATICc':
        return 'stakeAndClaimCerts';
      default:
        return 'stakeAndClaimBonds';
    }
  }

  /**
   * Stake tokens
   *
   * @public
   * @note Initiates two transactions and connect if write provider isn't connected.
   * @note Checks allowance and approves if it's needed. Then, does stake.
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive
   * @param {number} [scale] - scale factor for amount
   * @returns {Promise<{ txHash: string }>}
   */
  public async stake(
    amount: BigNumber,
    token: string,
    scale = ETH_SCALE_FACTOR,
  ): Promise<{ txHash: string }> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const [polygonPoolContract, maticTokenContract] = await Promise.all([
      this.getPolygonPoolContract(),
      this.getMaticTokenContract(),
    ]);
    const rawAmount = amount.multipliedBy(scale);
    // 0. Check current allowance
    const allowance = new BigNumber(
      await maticTokenContract.methods
        .allowance(this.currentAccount, contractConfig.polygonPool)
        .call(),
    );
    // 1. Approve MATIC token transfer to our PolygonPool contract
    if (allowance.isLessThan(rawAmount)) {
      await maticTokenContract.methods
        .approve(contractConfig.polygonPool, convertNumberToHex(rawAmount))
        .send({ from: this.currentAccount });
    }

    const contractStakeMethod =
      polygonPoolContract.methods[
        this.getStakeMethodName(token as TMaticSyntToken)
      ];

    // 2. Do staking
    const tx2 = await contractStakeMethod(convertNumberToHex(rawAmount)).send({
      from: this.currentAccount,
    });

    return { txHash: tx2.transactionHash };
  }

  /**
   * Get unstake fee
   *
   * @public
   * @note uses backend endpoint to get unstake fee
   * @returns {Promise<{ unstakeFee: string; useBeforeBlock: number; signature: string; }>}
   */
  public async getUnstakeFee(): Promise<{
    unstakeFee: string;
    useBeforeBlock: number;
    signature: string;
  }> {
    const { data } = await this.apiGateWay.api.get<{
      unstakeFee: string;
      useBeforeBlock: number;
      signature: string;
    }>(`/v1alpha/polygon/unstakeFee?address=${this.currentAccount}`);

    return {
      unstakeFee: data.unstakeFee,
      useBeforeBlock: data.useBeforeBlock,
      signature: data.signature,
    };
  }

  /**
   * Internal function returns unstake method by token symbol
   *
   * @private
   * @param {string} token - token symbol
   * @returns {string}
   */
  private getUnstakeMethodName(token: TMaticSyntToken): string {
    switch (token) {
      case 'aMATICc':
        return 'unstakeCerts';

      default:
        return 'unstakeBonds';
    }
  }

  /**
   * Unstake tokens
   *
   * @public
   * @note Initiates connect if write provider isn't connected.
   * @note Checks allowance and approves if it's needed. Then, does unstake.
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to receive
   * @param {number} [scale] - scale factor for amount;
   * @returns {Promise<void>}
   */
  public async unstake(
    amount: BigNumber,
    token: string,
    scale = ETH_SCALE_FACTOR,
  ): Promise<void> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EErrorCodes.ZERO_AMOUNT);
    }

    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const polygonPoolContract = await this.getPolygonPoolContract();
    const ankrTokenContract = await this.getAnkrTokenContract();
    const rawAmount = amount.multipliedBy(scale);
    // Do unstaking
    // 0. Check current allowance
    const allowance = new BigNumber(
      await ankrTokenContract.methods
        .allowance(this.currentAccount, contractConfig.polygonPool)
        .call(),
    );

    const { unstakeFee } = await this.getUnstakeFee();

    // 1. Approve payment in Ankr for unstake
    const fee = new BigNumber(unstakeFee);

    if (allowance.isLessThan(fee)) {
      await ankrTokenContract.methods
        .approve(
          contractConfig.polygonPool,
          convertNumberToHex(fee.multipliedBy(ALLOWANCE_RATE)),
        )
        .send({ from: this.currentAccount });
    }
    // 2. Call unstake method
    // Fetch fees here and make allowance one more time if required
    const { useBeforeBlock, signature } = await this.getUnstakeFee();

    const contractUnstake =
      polygonPoolContract.methods[
        this.getUnstakeMethodName(token as TMaticSyntToken)
      ];

    await contractUnstake(
      convertNumberToHex(rawAmount),
      convertNumberToHex(fee),
      convertNumberToHex(useBeforeBlock),
      signature,
    ).send({ from: this.currentAccount });
  }

  /**
   * Add token to wallet
   *
   * @public
   * @note Initiates connect if write provider isn't connected.
   * @param {string} token - token symbol (aMATICc or aMATICb)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    return this.writeProvider.addTokenToWallet({
      address:
        token === 'aMATICc'
          ? contractConfig.aMaticCToken
          : contractConfig.aMaticbToken,
      symbol: token,
      decimals: 18,
      chainId: ETH_NETWORK_BY_ENV,
    });
  }
}

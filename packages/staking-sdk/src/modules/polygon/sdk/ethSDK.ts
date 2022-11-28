import {
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { ApiGateway, getPastEvents } from '../../api';
import {
  configFromEnv,
  ETH_NETWORK_BY_ENV,
  ETH_SCALE_FACTOR,
  IS_ADVANCED_API_ACTIVE,
  MAX_UINT256,
  ProviderManagerSingleton,
  ZERO,
} from '../../common';
import ABI_AMATICB from '../../contracts/aMATICb.json';
import ABI_AMATICC from '../../contracts/aMATICc.json';
import ABI_ERC20 from '../../contracts/IERC20.json';
import ABI_POLYGON_POOL from '../../contracts/PolygonPoolV3.json';
import { EthereumSDK } from '../../ethereum';
import {
  getFilteredContractEvents,
  IEventsBatch,
  IGetPastEvents,
  IPendingData,
  IStakable,
  IStakeData,
  ITxEventsHistoryData,
  ITxEventsHistoryGroupItem,
  ITxHistoryEventData,
} from '../../stake';
import { IFetchTxData, IShareArgs, ISwitcher } from '../../switcher';
import { convertNumberToHex } from '../../utils';
import {
  MATIC_ETH_BLOCK_2_WEEKS_OFFSET,
  MATIC_ON_ETH_PROVIDER_READ_ID,
  MAX_BLOCK_RANGE,
} from '../const';
import {
  EMaticSDKErrorCodes,
  EPolygonPoolEvents,
  EPolygonPoolEventsMap,
  IMaticSDKProviders,
  TMaticSyntToken,
} from '../types';

/**
 * PolygonOnEthereumSDK allows you to interact with Polygon Liquid Staking smart contracts on the Ethereum blockchain: MATIC, aMATICb, aMATICc, and polygonPool.
 *
 * For more information on Polygon Liquid Staking from Ankr, refer to the [development details](https://www.ankr.com/docs/staking/liquid-staking/matic/staking-mechanics).
 *
 * @class
 */
export class PolygonOnEthereumSDK implements ISwitcher, IStakable {
  /**
   * instance — SDK instance.
   *
   * @type {PolygonOnEthereumSDK}
   * @static
   * @private
   */
  private static instance?: PolygonOnEthereumSDK;

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
   * apiGateWay — gateway instance.
   *
   * @type {ApiGateway}
   * @private
   */
  private readonly apiGateWay: ApiGateway;

  /**
   * currentAccount — connected account.
   *
   * @type {string}
   * @private
   */
  private currentAccount: string;

  /**
   * Private constructor. Instead, use `PolygonOnEthereumSDK.getInstance`.
   *
   * @constructor
   * @private
   */
  private constructor({ writeProvider, readProvider }: IMaticSDKProviders) {
    PolygonOnEthereumSDK.instance = this;

    const config = configFromEnv();
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
    this.apiGateWay = new ApiGateway(config.gatewayConfig);
  }

  /**
   * Initialization method for the SDK.
   *
   * Auto-connects writeProvider if chains are the same.
   * Initializes readProvider to support multiple chains.
   *
   * @public
   * @static
   * @param {Partial<IMaticSDKProviders>} [args] - User defined providers.
   * @returns {Promise<PolygonOnEthereumSDK>}
   */
  public static async getInstance(
    args?: Partial<IMaticSDKProviders>,
  ): Promise<PolygonOnEthereumSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = (await Promise.all([
      args?.writeProvider ?? providerManager.getETHWriteProvider(),
      args?.readProvider ??
        providerManager.getETHReadProvider(MATIC_ON_ETH_PROVIDER_READ_ID),
    ])) as unknown as [Web3KeyWriteProvider, Web3KeyReadProvider];

    const addressHasNotBeenUpdated =
      PolygonOnEthereumSDK.instance?.currentAccount ===
      writeProvider.currentAccount;
    const hasNewProvider =
      PolygonOnEthereumSDK.instance?.writeProvider === writeProvider &&
      PolygonOnEthereumSDK.instance?.readProvider === readProvider;

    if (
      PolygonOnEthereumSDK.instance &&
      addressHasNotBeenUpdated &&
      hasNewProvider
    ) {
      return PolygonOnEthereumSDK.instance;
    }

    const instance = new PolygonOnEthereumSDK({ writeProvider, readProvider });
    const isEthChain = await instance.isEthNetwork(writeProvider);

    if (isEthChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  /**
   * Internal function to choose the right provider for read or write purpose.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
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
   * Internal function to check the current network.
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
   * Internal function to get MATIC token contract.
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
   * Internal function to get aMATICb token contract.
   *
   * @private
   * @static
   * @param {Web3} web3 - Web3 instance
   * @returns {Contract}
   */
  private static getAMATICBTokenContract(web3: Web3): Contract {
    const { contractConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICB as AbiItem[],
      contractConfig.aMaticbToken,
    );
  }

  /**
   * Internal function to get aMATICc token contract.
   *
   * @private
   * @static
   * @param {Web3} web3 - Web3 instance
   * @returns {Contract}
   */
  private static getAMATICCTokenContract(web3: Web3): Contract {
    const { contractConfig } = configFromEnv();

    return new web3.eth.Contract(
      ABI_AMATICC as AbiItem[],
      contractConfig.aMaticCToken,
    );
  }

  /**
   * Internal function to get polygonPool contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
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
   * Internal function to get ANKR token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
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
   * Internal function to map event type to transaction type.
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
   * Internal function to convert wei value to human-readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  /**
   * An internal function for getting past events from the API or blockchain
   * according to the current environment.
   *
   * @private
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEvents(options: IGetPastEvents): Promise<EventData[]> {
    return IS_ADVANCED_API_ACTIVE
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
      fromBlock: startBlock,
      toBlock: latestBlockNumber,
      blockchain: 'eth',
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
   * Internal function to return transaction history group from events.
   * TODO: reuse it from stake/api/getTxEventsHistoryGroup
   *
   * @private
   * @param {EventData[]} [rawEvents] - events
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
   * Approve MATIC for PolygonPool, i.e. allow PolygonPool smart contract to access and transfer MATIC tokens.
   *
   * @public
   * @note Initiates connect if writeProvider doesn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber | undefined} [amount = MAX_UINT256] - amount to approve
   * @param {number | undefined} [scale = ETH_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<boolean>}
   */
  public async approveMATICToken(
    amount: BigNumber = MAX_UINT256,
    scale = ETH_SCALE_FACTOR,
  ): Promise<boolean> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const maticTokenContract = await this.getMaticTokenContract();

    const amountHex = convertNumberToHex(amount, scale);

    const allowance = new BigNumber(
      await maticTokenContract.methods
        .allowance(this.currentAccount, contractConfig.polygonPool)
        .call(),
    );

    if (allowance.isGreaterThanOrEqualTo(amountHex)) {
      return true;
    }

    const approve: TransactionReceipt | undefined =
      await maticTokenContract.methods
        .approve(contractConfig.polygonPool, amountHex)
        .send({
          from: this.currentAccount,
        });

    return !!approve;
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @param {BigNumber} amount - amount to stake
   * @param {TMaticSyntToken} token - token symbol (aMATICb or aMATICc)
   * @param {number | undefined} [scale = ETH_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<BigNumber>}
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: TMaticSyntToken,
    scale = ETH_SCALE_FACTOR,
  ): Promise<BigNumber> {
    const amountHex = convertNumberToHex(amount, scale);

    const minimumStake = await this.getMinimumStake();

    if (amount.isLessThan(minimumStake)) {
      return ZERO;
    }

    const [provider, polygonPoolContract] = await Promise.all([
      this.getProvider(true),
      this.getPolygonPoolContract(true),
    ]);

    const stakeMethodName = this.getStakeMethodName(token);
    const contractStakeMethod = polygonPoolContract.methods[stakeMethodName];

    let estimatedGas: number;

    try {
      estimatedGas = await contractStakeMethod(amountHex).estimateGas({
        from: this.currentAccount,
      });
    } catch {
      estimatedGas = 0;
    }

    return provider.getContractMethodFee(estimatedGas);
  }

  /**
   * Return MATIC token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getMaticBalance(): Promise<BigNumber> {
    const maticTokenContract = await this.getMaticTokenContract(true);

    const balance = await maticTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return aMATICb token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getABBalance(): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();
    const aMaticbTokenContract =
      PolygonOnEthereumSDK.getAMATICBTokenContract(web3);

    const balance = await aMaticbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return aMATICc token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();
    const aMaticCTokenContract =
      PolygonOnEthereumSDK.getAMATICCTokenContract(web3);

    const balance = await aMaticCTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return aMATICc/MATIC ratio.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();
    const aMaticCTokenContract =
      PolygonOnEthereumSDK.getAMATICCTokenContract(web3);

    const ratio = await aMaticCTokenContract.methods.ratio().call();

    return this.convertFromWei(ratio);
  }

  /**
   * Return aMATICc token allowance.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @param {string} [spender] - spender address (by default, it's aMATICb token address)
   * @returns {Promise<BigNumber>} - allowance in wei
   */
  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();
    const aMaticCTokenContract =
      PolygonOnEthereumSDK.getAMATICCTokenContract(web3);
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
   * Approve aMATICc for aMATICb, i.e. allow aMATICb smart contract to access and transfer aMATICc tokens.
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
    scale?: number,
  ): Promise<IWeb3SendResult | undefined> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticCTokenContract =
      PolygonOnEthereumSDK.getAMATICCTokenContract(web3);

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
   * Switch aMATICc to aMATICb.
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
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticbTokenContract =
      PolygonOnEthereumSDK.getAMATICBTokenContract(web3);

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
   * Switch aMATICb to aMATICc.
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
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { contractConfig } = configFromEnv();
    const web3 = this.writeProvider.getWeb3();
    const aMaticbTokenContract =
      PolygonOnEthereumSDK.getAMATICBTokenContract(web3);

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
   * Get total pending unstake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getPendingClaim(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);

    const pending = await polygonPoolContract.methods
      .pendingMaticClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  /**
   * Get pending data for aMATICb and aMATICc.
   *
   * @public
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    const pendingClaim = await this.getPendingClaim();
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    // If there are no pending amount we do not need any calculations
    if (pendingClaim.isZero()) {
      return {
        pendingBond: ZERO,
        pendingCertificate: ZERO,
      };
    }

    const { unstakeRawEvents, ratio } = await this.getPoolEventsBatch(
      latestBlockNumber - MATIC_ETH_BLOCK_2_WEEKS_OFFSET,
      latestBlockNumber,
    );

    // the reverse is necessary to get new unstake events first
    const reversedUnstakeEvents = unstakeRawEvents.reverse();
    let unstakingValue = pendingClaim;

    return reversedUnstakeEvents.reduce<IPendingData>(
      (result, unstakeEvent) => {
        // as soon as the unstakingValue value is 0,
        // other events are already claimed
        if (unstakingValue.isLessThanOrEqualTo(0)) {
          return result;
        }

        const amount = this.convertFromWei(unstakeEvent.returnValues.amount);
        unstakingValue = unstakingValue.minus(amount);

        const isUnstakeBondEvent = unstakeEvent.returnValues.isRebasing;

        if (isUnstakeBondEvent) {
          return {
            ...result,
            pendingBond: result.pendingBond.plus(amount),
          };
        }

        return {
          ...result,
          pendingCertificate: result.pendingCertificate.plus(
            amount.multipliedBy(ratio),
          ),
        };
      },
      {
        pendingBond: ZERO,
        pendingCertificate: ZERO,
      },
    );
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);

    const minStake = await polygonPoolContract.methods.getMinimumStake().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Internal function to return pool raw events.
   *
   * @private
   * @note Currently returns raw pool events for block range.
   * @param {number} from - from block
   * @param {number} to - to block
   * @returns {Promise<IEventsBatch>}
   */
  private async getPoolEventsBatch(
    from: number,
    to: number,
  ): Promise<IEventsBatch> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);

    const [stakeRawEvents, unstakeRawEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.StakePendingV2,
        startBlock: from,
        latestBlockNumber: to,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: polygonPoolContract,
        eventName: EPolygonPoolEvents.TokensBurned,
        startBlock: from,
        latestBlockNumber: to,
        rangeStep: MAX_BLOCK_RANGE,
        filter: { staker: this.currentAccount },
      }),
      this.getACRatio(),
    ]);

    return {
      stakeRawEvents,
      unstakeRawEvents,
      rebasingEvents: [],
      ratio,
    };
  }

  /**
   * Get transaction history.
   *
   * @public
   * @note Currently returns data for the last 14 days.
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    return this.getTxEventsHistoryRange(
      latestBlockNumber - MATIC_ETH_BLOCK_2_WEEKS_OFFSET,
      latestBlockNumber,
    );
  }

  /**
   * Get transaction history.
   *
   * @public
   * @note Currently returns data for block range.
   * @param {number} from - from block
   * @param {number} to - to block
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistoryRange(
    from: number,
    to: number,
  ): Promise<ITxEventsHistoryData> {
    const { stakeRawEvents, unstakeRawEvents, ratio } =
      await this.getPoolEventsBatch(from, to);

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

    const {
      bondEvents: completedBondEvents,
      certEvents: completedCertificateEvents,
    } = getFilteredContractEvents(completedRawEvents);

    const {
      bondEvents: pendingBondEvents,
      certEvents: pendingCertificateEvents,
    } = getFilteredContractEvents(pendingRawEvents);

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
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();

    return web3.eth.getBlockNumber();
  }

  /**
   * Fetch transaction data.
   *
   * @public
   * @note Parses first uint256 param from transaction input.
   * @param {string} txHash - transaction hash
   * @returns {Promise<IFetchTxData>}
   */
  public async fetchTxData(txHash: string): Promise<IFetchTxData> {
    const provider = await this.getProvider(true);

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
   * Fetch transaction receipt.
   *
   * @public
   * @param {string} txHash - transaction hash.
   * @returns {Promise<TransactionReceipt | null>}
   */
  public async fetchTxReceipt(
    txHash: string,
  ): Promise<TransactionReceipt | null> {
    const provider = await this.getProvider(true);
    const web3 = provider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  /**
   * Internal function to return stake method by token symbol.
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
   * Stake token.
   *
   * @public
   * @note Initiates two transactions and connect if writeProvider isn't connected.
   * @note Checks allowance and approves if it's needed. Then stakes.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aMATICb or aMATICc)
   * @param {number} [scale = ETH_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<IStakeData>}
   */
  public async stake(
    amount: BigNumber,
    token: string,
    scale = ETH_SCALE_FACTOR,
  ): Promise<IStakeData> {
    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const [polygonPoolContract, maticTokenContract] = await Promise.all([
      this.getPolygonPoolContract(true),
      this.getMaticTokenContract(true),
    ]);
    const rawAmount = amount.multipliedBy(scale);
    // 0. Check current allowance
    const allowance = new BigNumber(
      await maticTokenContract.methods
        .allowance(this.currentAccount, contractConfig.polygonPool)
        .call(),
    );
    // 1. Approve MATIC token transfer to our polygonPool contract
    if (allowance.isLessThan(rawAmount)) {
      await maticTokenContract.methods
        .approve(contractConfig.polygonPool, convertNumberToHex(rawAmount))
        .send({ from: this.currentAccount });
    }

    const contractStakeMethod =
      polygonPoolContract.methods[
        this.getStakeMethodName(token as TMaticSyntToken)
      ];

    const data = contractStakeMethod(convertNumberToHex(rawAmount)).encodeABI();

    // 2. Do staking
    const { transactionHash: txHash } =
      await this.writeProvider.sendTransactionAsync(
        this.currentAccount,
        contractConfig.polygonPool,
        { data },
      );

    return { txHash };
  }

  /**
   * Get unstake fee.
   *
   * @public
   * @note Uses backend endpoint to get the unstake fee.
   * @returns {Promise<IUnstakeFeeData>}
   */
  public async getUnstakeFee(): Promise<string> {
    const polygonPoolContract = await this.getPolygonPoolContract(true);
    return polygonPoolContract.methods.ethUnstakeFee().call();
  }

  /**
   * Internal function to return unstake method by token symbol.
   *
   * @private
   * @param {TMaticSyntToken} token - token symbol
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
   * Unstake token.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note Checks allowance and approves if it's needed. Then unstakes.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aMATICb or aMATICc)
   * @param {number} [scale = ETH_SCALE_FACTOR] - scale factor for amount
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unstake(
    amount: BigNumber,
    token: string,
    scale = ETH_SCALE_FACTOR,
  ): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EMaticSDKErrorCodes.ZERO_AMOUNT);
    }

    const { contractConfig } = configFromEnv();

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const sdk = await EthereumSDK.getInstance();
    const ethBalance = new BigNumber(await sdk.getEthBalance());

    const polygonPoolContract = await this.getPolygonPoolContract();
    const rawAmount = amount.multipliedBy(scale);
    const unstakeFee = await this.getUnstakeFee();
    const unstakeFeeETH = Web3.utils.fromWei(unstakeFee);

    if (ethBalance.isLessThan(unstakeFeeETH)) {
      throw new Error(EMaticSDKErrorCodes.INSUFFICIENT_BALANCE);
    }

    const contractUnstake =
      polygonPoolContract.methods[
        this.getUnstakeMethodName(token as TMaticSyntToken)
      ];

    const data = contractUnstake(
      convertNumberToHex(rawAmount),
      convertNumberToHex(0),
      convertNumberToHex(0),
      '0x0',
    ).encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.polygonPool,
      { data, estimate: true, value: convertNumberToHex(unstakeFee) },
    );
  }

  /**
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
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

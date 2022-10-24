import {
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { getPastEvents } from '../api';
import {
  configFromEnv,
  ETH_SCALE_FACTOR,
  isMainnet,
  IS_ADVANCED_API_ACTIVE,
  MAX_UINT256,
  ProviderManagerSingleton,
  ZERO,
} from '../common';
import { AAVAXB_ABI, AAVAXC_ABI, AVALANCHE_POOL_ABI } from '../contracts';
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
} from '../stake';
import { IFetchTxData, IShareArgs, ISwitcher } from '../switcher';
import { convertNumberToHex } from '../utils';

import {
  AVALANCHE_READ_PROVIDER_ID,
  AVAX_DECIMALS,
  AVAX_ESTIMATE_GAS_MULTIPLIER,
  AVAX_HISTORY_2_WEEKS_OFFSET,
  AVAX_MAX_BLOCK_RANGE,
  AVAX_MAX_PARALLEL_REQ,
  AVAX_SCALE_FACTOR,
  GAS_FEE_MULTIPLIER,
} from './const';
import {
  EAvalancheErrorCodes,
  EAvalanchePoolEvents,
  EAvalanchePoolEventsMap,
  IAvalancheSDKProviders,
} from './types';

/**
 * AvalancheSDK allows you to interact with Avalanche Liquid Staking smart contracts on Avalanche network: aAVAXb, aAVAXc, and AvalanchePool.
 *
 * For more information on Avalanche Liquid Staking from Ankr, refer to the [development details](https://www.ankr.com/docs/staking/liquid-staking/avax/staking-mechanics).
 *
 * @class
 */
export class AvalancheSDK implements ISwitcher, IStakable {
  /**
   * readProvider — provider which allows to read data without connecting the wallet.
   *
   * @type {Web3KeyReadProvider}
   * @readonly
   * @private
   */
  private readonly readProvider: Web3KeyReadProvider;

  /**
   * writeProvider — provider which has signer for signing transactions.
   *
   * @type {Web3KeyWriteProvider}
   * @readonly
   * @private
   */
  private readonly writeProvider: Web3KeyWriteProvider;

  /**
   * instance — SDK instance.
   *
   * @type {AvalancheSDK}
   * @static
   * @private
   */
  private static instance?: AvalancheSDK;

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
   * Private constructor. Instead, use `AvalancheSDK.getInstance`.
   *
   * @constructor
   * @private
   */
  private constructor({ readProvider, writeProvider }: IAvalancheSDKProviders) {
    AvalancheSDK.instance = this;

    this.currentAccount = writeProvider.currentAccount;
    this.readProvider = readProvider;
    this.writeProvider = writeProvider;
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
   * @param {BigNumber} amount - value in human readable format
   * @returns {string}
   */
  private convertToHex(amount: BigNumber): string {
    return this.readProvider
      .getWeb3()
      .utils.numberToHex(amount.multipliedBy(AVAX_SCALE_FACTOR).toString(10));
  }

  /**
   * Internal function to get aAVAXb token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getAAVAXBTokenContract(isForceRead = false): Promise<Contract> {
    const { avalancheConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      AAVAXB_ABI as AbiItem[],
      avalancheConfig.aAVAXb,
    );
  }

  /**
   * Internal function to get aAVAXc token contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getAAVAXCTokenContract(isForceRead = false): Promise<Contract> {
    const { avalancheConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      AAVAXC_ABI as AbiItem[],
      avalancheConfig.aAVAXc,
    );
  }

  /**
   * Internal function to get AvalanchePool contract.
   *
   * @private
   * @param {boolean} [isForceRead = false] - forces to use readProvider
   * @returns {Promise<Contract>}
   */
  private async getAvalanchePoolContract(
    isForceRead = false,
  ): Promise<Contract> {
    const { avalancheConfig } = configFromEnv();
    const provider = await this.getProvider(isForceRead);
    const web3 = provider.getWeb3();

    return new web3.eth.Contract(
      AVALANCHE_POOL_ABI as AbiItem[],
      avalancheConfig.avalanchePool,
    );
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
      blockchain: 'avalanche',
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
    latestBlockNumber,
    startBlock,
    filter,
    rangeStep,
  }: IGetPastEvents): Promise<EventData[]> {
    if (latestBlockNumber <= AVAX_HISTORY_2_WEEKS_OFFSET) {
      return [];
    }

    const eventsPromises: Promise<EventData[]>[][] = [];

    for (
      let i = startBlock, idx = 0, parallelReqCounter = 1;
      i <= latestBlockNumber;
      i += rangeStep, parallelReqCounter += 1
    ) {
      const fromBlock = i;
      const toBlock = fromBlock + rangeStep;

      if (!eventsPromises[idx]) {
        eventsPromises[idx] = [];
      }

      eventsPromises[idx].push(
        contract.getPastEvents(eventName, {
          fromBlock,
          toBlock,
          filter,
        }),
      );

      if (parallelReqCounter === AVAX_MAX_PARALLEL_REQ) {
        parallelReqCounter = 0;
        idx += 1;
      }
    }

    if (!eventsPromises.length || !eventsPromises[0]?.length) {
      return [];
    }

    const pastEvents = await Promise.all(
      eventsPromises.map(async evPromisesGroup => {
        const eventsData = await Promise.all(evPromisesGroup);

        return eventsData.flat();
      }),
    );

    return pastEvents.flat();
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

    const isAvalancheChain = await this.isAvalancheNetwork(this.writeProvider);

    if (isAvalancheChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isAvalancheChain) {
      return this.writeProvider;
    }

    return this.readProvider;
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
   * Internal function to map event type to transaction type.
   *
   * @private
   * @param {string} [rawTxType] - transaction type
   * @returns {string | null}
   */
  private getTxType(rawTxType?: string): string | null {
    switch (rawTxType) {
      case EAvalanchePoolEvents.StakePending:
        return EAvalanchePoolEventsMap.StakePending;

      case EAvalanchePoolEvents.AvaxClaimPending:
        return EAvalanchePoolEventsMap.AvaxClaimPending;

      default:
        return null;
    }
  }

  /**
   * Internal function to check the current network.
   *
   * @private
   * @param {Web3KeyWriteProvider} provider - current selected provider
   * @returns {Promise<boolean>}
   */
  private async isAvalancheNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      EEthereumNetworkId.avalanche,
      EEthereumNetworkId.avalancheTestnet,
    ].includes(chainId);
  }

  /**
   * Initialization method for SDK.
   *
   * Auto-connects writeProvider if chains are the same.
   * Initializes readProvider to support multiple chains.
   *
   * @public
   * @static
   * @param {Partial<IAvalancheSDKProviders>} [args] - user-defined providers.
   * @returns {Promise<AvalancheSDK>}
   */
  public static async getInstance(
    args?: Partial<IAvalancheSDKProviders>,
  ): Promise<AvalancheSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      args?.writeProvider ?? providerManager.getETHWriteProvider(),
      args?.readProvider ??
        providerManager.getETHReadProvider(AVALANCHE_READ_PROVIDER_ID),
    ]);

    const addrHasNotBeenUpdated =
      AvalancheSDK.instance?.currentAccount === writeProvider.currentAccount;
    const hasNewProvider =
      AvalancheSDK.instance?.writeProvider === writeProvider &&
      AvalancheSDK.instance?.readProvider === readProvider;

    if (AvalancheSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return AvalancheSDK.instance;
    }

    const instance = new AvalancheSDK({ writeProvider, readProvider });
    const isAvalancheChain = await instance.isAvalancheNetwork(writeProvider);

    if (isAvalancheChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  /**
   * Add token to wallet.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @param {string} token - token symbol (aAVAXb or aAVAXc)
   * @returns {Promise<boolean>}
   */
  public async addTokenToWallet(token: string): Promise<boolean> {
    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const { avalancheConfig } = configFromEnv();

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();
    const contract =
      token === 'aAVAXb' ? aAVAXbTokenContract : aAVAXcTokenContract;

    const [symbol, rawDecimals]: [string, string] = await Promise.all([
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
    ]);

    const decimals = Number.parseInt(rawDecimals, 10);

    return this.writeProvider.addTokenToWallet({
      address:
        token === 'aAVAXb' ? avalancheConfig.aAVAXb : avalancheConfig.aAVAXc,
      symbol,
      decimals,
      chainId: isMainnet
        ? EEthereumNetworkId.avalanche
        : EEthereumNetworkId.avalancheTestnet,
    });
  }

  /**
   * Return aAVAXb token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getABBalance(): Promise<BigNumber> {
    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();

    const balance = await aAVAXbTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return aAVAXc token balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human readable balance
   */
  public async getACBalance(): Promise<BigNumber> {
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();

    const balance = await aAVAXcTokenContract.methods
      .balanceOf(this.currentAccount)
      .call();

    return this.convertFromWei(balance);
  }

  /**
   * Return aAVAXc/AVAX ratio.
   *
   * @public
   * @note [Read about aAVAXc/AVAX ratio](https://www.ankr.com/docs/staking/liquid-staking/avax/staking-mechanics/#exchange-ratio).
   * @returns {Promise<BigNumber>} - human readable ratio
   */
  public async getACRatio(): Promise<BigNumber> {
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();
    const rawRatio = await aAVAXcTokenContract.methods.ratio().call();

    return this.convertFromWei(rawRatio);
  }

  /**
   * Checks if allowance is greater or equal to amount.
   *
   * @public
   * @note Allowance is the amount which spender is still allowed to withdraw from owner.
   * @param {string} [spender] - spender address (by default it is aAVAXb token address)
   * @returns {Promise<BigNumber>} - allowance in wei
   */
  public async getACAllowance(spender?: string): Promise<BigNumber> {
    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();
    const { avalancheConfig } = configFromEnv();

    const allowance = await aAVAXcTokenContract.methods
      .allowance(
        this.writeProvider.currentAccount,
        spender || avalancheConfig.aAVAXb,
      )
      .call();

    return new BigNumber(allowance);
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
   * Approve aAVAXc for aAVAXb, i.e. allow aAVAXb smart contract to access and transfer aAVAXc tokens.
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

    const hexAmount = convertNumberToHex(amount, scale);
    const isAllowed = await this.checkAllowance(hexAmount);

    if (isAllowed) {
      return undefined;
    }

    const { avalancheConfig } = configFromEnv();

    const aAVAXcTokenContract = await this.getAAVAXCTokenContract();

    const data = aAVAXcTokenContract.methods
      .approve(avalancheConfig.aAVAXb, hexAmount)
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.aAVAXc,
      { data, estimate: true },
    );
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
   * Switch aAVAXc to aAVAXb.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} args - object with amount to switch and scale
   * @returns {Promise<IWeb3SendResult>}
   */
  public async lockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EAvalancheErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();
    const { avalancheConfig } = configFromEnv();

    const data = aAVAXbTokenContract.methods
      .lockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.aAVAXb,
      { data, estimate: true },
    );
  }

  /**
   * Switch aAVAXb to aAVAXc.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} args - object with amount to switch and scale
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unlockShares({ amount }: IShareArgs): Promise<IWeb3SendResult> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EAvalancheErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const aAVAXbTokenContract = await this.getAAVAXBTokenContract();
    const { avalancheConfig } = configFromEnv();

    const data = aAVAXbTokenContract.methods
      .unlockShares(convertNumberToHex(amount, ETH_SCALE_FACTOR))
      .encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.aAVAXb,
      { data, estimate: true },
    );
  }

  /**
   * Return AVAX balance.
   *
   * @public
   * @returns {Promise<BigNumber>} - human-readable balance
   */
  public async getAVAXBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const currBalance = await web3.eth.getBalance(this.currentAccount);

    return this.readProvider.getFormattedBalance(currBalance, AVAX_DECIMALS);
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const minStake = await avalanchePoolContract.methods
      .getMinimumStake()
      .call();

    return this.convertFromWei(minStake);
  }

  /**
   * Internal function to return raw pool events.
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
    const avalanchePoolContract = await this.getAvalanchePoolContract(true);

    const [stakeRawEvents, unstakeRawEvents, ratio] = await Promise.all([
      this.getPastEvents({
        provider: this.readProvider,
        contract: avalanchePoolContract,
        eventName: EAvalanchePoolEvents.StakePending,
        filter: { staker: this.currentAccount },
        startBlock: from,
        latestBlockNumber: to,
        rangeStep: AVAX_MAX_BLOCK_RANGE,
      }),
      this.getPastEvents({
        provider: this.readProvider,
        contract: avalanchePoolContract,
        eventName: EAvalanchePoolEvents.AvaxClaimPending,
        filter: { claimer: this.currentAccount },
        startBlock: from,
        latestBlockNumber: to,
        rangeStep: AVAX_MAX_BLOCK_RANGE,
      }),
      this.getACRatio(),
    ]);

    return {
      rebasingEvents: [],
      stakeRawEvents,
      unstakeRawEvents,
      ratio,
    };
  }

  /**
   * Get total pending unstake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getPendingClaim(): Promise<BigNumber> {
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const pending = await avalanchePoolContract.methods
      .pendingAvaxClaimsOf(this.currentAccount)
      .call();

    return this.convertFromWei(pending);
  }

  /**
   * Get pending data for aAVAXb and aAVAXc.
   *
   * @public
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @returns {Promise<IPendingData>}
   */
  public async getPendingData(): Promise<IPendingData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const { unstakeRawEvents, ratio } = await this.getPoolEventsBatch(
      latestBlockNumber - AVAX_HISTORY_2_WEEKS_OFFSET,
      latestBlockNumber,
    );
    let totalUnstakingValue = await this.getPendingClaim();

    let pendingBond: BigNumber = ZERO;
    let pendingCertificate: BigNumber = ZERO;

    if (totalUnstakingValue.isGreaterThan(ZERO)) {
      const unstakePendingReverse: EventData[] = unstakeRawEvents.reverse();

      for (
        let i = 0;
        i < unstakePendingReverse.length && !totalUnstakingValue.isZero();
        i += 1
      ) {
        const unstakeEventItem = unstakePendingReverse[i];

        const itemAmount = this.convertFromWei(
          unstakeEventItem.returnValues.amount,
        );

        totalUnstakingValue = totalUnstakingValue.minus(itemAmount);

        if (unstakeEventItem.returnValues.isRebasing) {
          pendingBond = pendingBond.plus(
            this.convertFromWei(unstakeEventItem.returnValues.amount),
          );
        } else {
          pendingCertificate = pendingCertificate.plus(
            this.convertFromWei(
              unstakeEventItem.returnValues.amount,
            ).multipliedBy(ratio),
          );
        }
      }
    }

    return {
      pendingBond,
      pendingCertificate,
    };
  }

  /**
   * Get transaction history.
   *
   * @public
   * @note Currently returns data for the last 26 days.
   * @returns {Promise<ITxEventsHistoryData>}
   */
  public async getTxEventsHistory(): Promise<ITxEventsHistoryData> {
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    return this.getTxEventsHistoryRange(
      latestBlockNumber - AVAX_HISTORY_2_WEEKS_OFFSET,
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

    let totalPendingUnstakes = await this.getPendingClaim();
    let completedRawEvents: EventData[] = [];
    let pendingRawEvents: EventData[] = [];

    if (totalPendingUnstakes.isGreaterThan(0)) {
      const unstakeRawEventsReverse = unstakeRawEvents.reverse();

      for (
        let i = 0;
        i < unstakeRawEventsReverse.length && !totalPendingUnstakes.isZero();
        i += 1
      ) {
        const unstakeRawEventItem = unstakeRawEventsReverse[i];
        const isCert = !unstakeRawEventItem.returnValues.isRebasing;

        const itemAmount =
          isCert && !ratio.isZero()
            ? this.convertFromWei(
                unstakeRawEventItem.returnValues.amount,
              ).dividedBy(ratio)
            : this.convertFromWei(unstakeRawEventItem.returnValues.amount);

        totalPendingUnstakes = totalPendingUnstakes.minus(itemAmount);

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
      bondEvents: completedAAVAXBEvents,
      certEvents: completedAAVAXCEvents,
    } = getFilteredContractEvents(completedRawEvents);

    const { bondEvents: pendingAAVAXBEvents, certEvents: pendingAAVAXCEvents } =
      getFilteredContractEvents(pendingRawEvents);

    const [
      completedBond,
      completedCertificate,
      pendingBond,
      pendingCertificate,
    ] = await Promise.all([
      this.getTxEventsHistoryGroup(completedAAVAXBEvents),
      this.getTxEventsHistoryGroup(completedAAVAXCEvents),
      this.getTxEventsHistoryGroup(pendingAAVAXBEvents),
      this.getTxEventsHistoryGroup(pendingAAVAXCEvents),
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
    const provider = await this.getProvider();
    const web3 = provider.getWeb3();

    return web3.eth.getBlockNumber();
  }

  /**
   * Internal function to return stake method by token symbol.
   *
   * @param {string} token - token symbol (aAVAXb or aAVAXc)
   * @private
   * @returns {string}
   */
  private getStakeMethodName(token: string): string {
    switch (token) {
      case 'aAVAXc':
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
   * @note Estimates gas and multiplies it by `GAS_FEE_MULTIPLIER` to prevent MetaMask issue with gas calculation.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (aAVAXb or aAVAXc)
   * @returns {Promise<IStakeData>}
   */
  public async stake(amount: BigNumber, token: string): Promise<IStakeData> {
    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EAvalancheErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    let gasFee = this.stakeGasFee;
    if (!gasFee) {
      gasFee = await this.getStakeGasFee(amount, token);
    }

    const balance = await this.getAVAXBalance();

    // multiplication needs to avoid problems with max amount
    // and fee calculation in the wallet
    const multipliedGasFee = gasFee.multipliedBy(GAS_FEE_MULTIPLIER);
    const maxAllowedAmount = balance.minus(multipliedGasFee);

    const stakeAmount = amount.isGreaterThan(maxAllowedAmount)
      ? maxAllowedAmount
      : amount;

    const value = convertNumberToHex(stakeAmount, AVAX_SCALE_FACTOR);

    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const contractStake =
      avalanchePoolContract.methods[this.getStakeMethodName(token)];

    const tx = await contractStake().send({
      from: this.currentAccount,
      value,
    });

    return { txHash: tx.transactionHash };
  }

  /**
   * Get stake gas fee.
   *
   * @public
   * @note Caches computed gas fee value for future computations.
   * @param {BigNumber} amount - amount to stake
   * @param {string} token - token symbol (aAVAXb or aAVAXc)
   * @returns {Promise<BigNumber>}
   */
  public async getStakeGasFee(
    amount: BigNumber,
    token: string,
  ): Promise<BigNumber> {
    const provider = await this.getProvider();
    const avalanchePoolContract = await this.getAvalanchePoolContract();

    const contractStake =
      avalanchePoolContract.methods[this.getStakeMethodName(token)];

    const estimatedGas: number = await contractStake().estimateGas({
      from: this.currentAccount,
      value: convertNumberToHex(amount, AVAX_SCALE_FACTOR),
    });

    const increasedGasLimit = AvalancheSDK.getIncreasedGasLimit(estimatedGas);

    const stakeGasFee = await provider.getContractMethodFee(increasedGasLimit);

    this.stakeGasFee = stakeGasFee;

    return stakeGasFee;
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @param {number} gasLimit - initial gas limit
   * @private
   * @static
   * @returns {number}
   */
  private static getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * AVAX_ESTIMATE_GAS_MULTIPLIER);
  }

  /**
   * Internal function to return unstake method by token symbol.
   *
   * @private
   * @param {string} token - token symbol (aAVAXb or aAVAXc)
   * @private
   * @returns {string}
   */
  private getUnstakeMethodName(token: string): string {
    switch (token) {
      case 'aAVAXc':
        return 'claimCerts';

      default:
        return 'claimBonds';
    }
  }

  /**
   * Unstake token.
   *
   * @public
   * @note Initiates connect if writeProvider isn't connected.
   * @note [Read about Ankr Liquid Staking token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (aAVAXb or aAVAXc)
   * @returns {Promise<IWeb3SendResult>}
   */
  public async unstake(
    amount: BigNumber,
    token: string,
  ): Promise<IWeb3SendResult> {
    const { avalancheConfig } = configFromEnv();

    if (amount.isLessThanOrEqualTo(ZERO)) {
      throw new Error(EAvalancheErrorCodes.ZERO_AMOUNT);
    }

    if (!this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    const avalanchePoolContract = await this.getAvalanchePoolContract();
    const value = this.convertToHex(amount);

    const contractUnstake =
      avalanchePoolContract.methods[this.getUnstakeMethodName(token)];

    const data = contractUnstake(value).encodeABI();

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      avalancheConfig.avalanchePool,
      { data, estimate: true },
    );
  }
}

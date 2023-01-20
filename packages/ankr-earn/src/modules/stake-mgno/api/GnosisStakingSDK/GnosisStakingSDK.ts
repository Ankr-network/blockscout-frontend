import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';

import {
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { ETH_SCALE_FACTOR, ZERO } from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { getProviderStatsUrl } from 'modules/stake-mgno/utils/getProviderStatsUrl';

import {
  GNOSIS_HISTORY_BLOCK_RANGE,
  GNOSIS_HISTORY_START_BLOCK,
  GNOSIS_PROVIDER_READ_ID,
  GNOSIS_STAKING_MAX_DECIMALS_LENGTH,
} from './const';
import { GnosisStakingReadSDK } from './GnosisStakingReadSDK';
import {
  EGnosisEvents,
  EGnosisEventsMap,
  IDelegatorEventData,
  IFetchTxData,
  IHistoryData,
  IProviderStats,
} from './types';

const { contractConfig } = configFromEnv();

interface IGnosisStakingSDKProviders {
  writeProvider: Web3KeyWriteProvider;
  readProvider: Web3KeyReadProvider;
}

export class GnosisStakingSDK extends GnosisStakingReadSDK {
  private static instance?: GnosisStakingSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  public api: AxiosInstance;

  private currentAccount: string;

  private constructor({
    readProvider,
    writeProvider,
  }: IGnosisStakingSDKProviders) {
    super({ readProvider });

    GnosisStakingSDK.instance = this;

    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;

    const { gatewayConfig } = configFromEnv();

    this.api = axios.create({
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });
  }

  public static async getInstance(): Promise<GnosisStakingSDK> {
    const providerManager = getProviderManager();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(GNOSIS_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      GnosisStakingSDK.instance?.currentAccount ===
      writeProvider.currentAccount;
    const hasNewProvider =
      GnosisStakingSDK.instance?.writeProvider === writeProvider;

    if (GnosisStakingSDK.instance && addrHasNotBeenUpdated && hasNewProvider) {
      return GnosisStakingSDK.instance;
    }

    const instance = new GnosisStakingSDK({ writeProvider, readProvider });
    const isGnosisChain = await instance.isGnosisNetwork(writeProvider);

    if (isGnosisChain && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  public async getMgnoBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const mgnoContract = await this.getMgnoContract();
    const balance = await provider.getErc20Balance(
      mgnoContract,
      this.currentAccount,
    );

    return balance;
  }

  // todo: will implement it later
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  public async getTipRewards(provider: string): Promise<BigNumber> {
    return ZERO;
  }

  public async getAllMyTipRewards(): Promise<BigNumber> {
    const providers = await this.getAllProviderAddresses();
    const rewards = await Promise.all(
      providers.map(provider => this.getTipRewards(provider)),
    );

    return rewards.reduce((acc, reward) => {
      acc.plus(reward);
      return acc;
    }, ZERO);
  }

  public async getRewards(provider: string): Promise<BigNumber> {
    const stakingContract = await this.getStakingContract();

    const rewards = await stakingContract.methods
      .getValidationReward(provider, this.currentAccount)
      .call();
    return this.convertFromWei(rewards);
  }

  public async getAllMyRewards(): Promise<BigNumber> {
    const providers = await this.getAllProviderAddresses();
    const rewards = await Promise.all(
      providers.map(provider => this.getRewards(provider)),
    );

    return rewards.reduce((acc, reward) => acc.plus(reward), ZERO);
  }

  public async mintMgno(): Promise<string> {
    const mgnoContract = await this.getMgnoContract();

    const hexAmount = convertNumberToHex(
      new BigNumber(1_000).decimalPlaces(8),
      ETH_SCALE_FACTOR,
    );

    const data = await mgnoContract.methods
      .mint(this.currentAccount, hexAmount)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.mGNOToken,
      { data, estimate: true },
    );

    return transactionHash;
  }

  public async getMyTotalDelegatedAmount(): Promise<BigNumber> {
    const providers = await this.getAllProviderAddresses();

    const delegationSet = await Promise.all(
      providers.map((provider: string) =>
        this.getDelegatedAmount(provider, this.currentAccount),
      ),
    );

    const result = delegationSet.reduce((acc, delegationAmount) => {
      acc = acc.plus(new BigNumber(delegationAmount));
      return acc;
    }, ZERO);

    return result;
  }

  public async getMyDelegatedAmount(provider: string): Promise<BigNumber> {
    return this.getDelegatedAmount(provider, this.currentAccount);
  }

  public async getHistoryData(): Promise<IHistoryData[]> {
    const providers = await this.getAllProviderAddresses();
    const providersStatsArr: AxiosResponse<IProviderStats>[] =
      await Promise.all(
        providers.map(provider => this.api.get(getProviderStatsUrl(provider))),
      );
    const providersStatsMap = new Map(
      providersStatsArr.map((stats, index) => [providers[index], stats.data]),
    );

    const stakingContract = await this.getStakingContract();
    const web3 = this.readProvider.getWeb3();
    const latestBlockNumber = await web3.eth.getBlockNumber();

    const events = await this.getPastEvents({
      eventName: EGnosisEvents.StakePending,
      latestBlockNumber,
      contract: stakingContract,
      startBlock: GNOSIS_HISTORY_START_BLOCK,
      rangeStep: GNOSIS_HISTORY_BLOCK_RANGE,
      filter: { staker: this.currentAccount },
    });

    const calls = events.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks =
      await this.readProvider.executeBatchCalls<BlockTransactionObject>(calls);

    const rawData: IDelegatorEventData[] = blocks.map((block, index) => ({
      ...events[index],
      timestamp: block.timestamp as number,
    }));

    return rawData
      .map(event => {
        const { provider, amount } = event.returnValues;

        return {
          date: new Date(event.timestamp * 1_000),
          hash: event.transactionHash,
          link: '',
          event: this.getTxType(event.event),
          provider: providersStatsMap.get(provider)?.provider.name ?? provider,
          amount: this.convertFromWei(amount),
        };
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  public async stake(
    validator: Web3Address,
    amount: BigNumber,
  ): Promise<string> {
    const stakingContract = await this.getStakingContract();

    const hexAmount = convertNumberToHex(
      amount.decimalPlaces(GNOSIS_STAKING_MAX_DECIMALS_LENGTH),
      ETH_SCALE_FACTOR,
    );

    const data = stakingContract.methods
      .stakeGNO(validator, hexAmount)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.gnosisStakingContract,
      { data, estimate: true },
    );

    return transactionHash;
  }

  public async approve(amount: BigNumber): Promise<boolean> {
    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return true;
    }

    const mgnoTokenContract = await this.getMgnoContract();

    const data = mgnoTokenContract.methods
      .approve(
        contractConfig.gnosisStakingContract,
        convertNumberToHex(amount, ETH_SCALE_FACTOR),
      )
      .encodeABI();

    const { receiptPromise } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.mGNOToken,
      { data, estimate: true },
    );

    const { status } = await receiptPromise;

    return status;
  }

  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    const mgnoTokenContract = await this.getMgnoContract();

    const allowance = await mgnoTokenContract.methods
      .allowance(this.currentAccount, contractConfig.gnosisStakingContract)
      .call();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    return new BigNumber(allowance).isGreaterThanOrEqualTo(hexAmount);
  }

  public async fetchTxData(txHash: string): Promise<IFetchTxData> {
    const { writeProvider } = this;

    const web3 = writeProvider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);
    const providerHash = tx.input.slice(10, 74);

    const { 0: amount } =
      tx.value === '0'
        ? web3.eth.abi.decodeParameters(['uint256'], tx.input.slice(74, 138))
        : { 0: tx.value };

    return {
      amount: this.convertFromWei(amount),
      destinationAddress: tx.to as string | undefined,
      isPending: tx.transactionIndex === null,
      provider: `0x${providerHash.slice(24)}`,
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
    const { writeProvider } = this;

    const web3 = writeProvider.getWeb3();

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    return receipt as TransactionReceipt | null;
  }

  /**
   * Internal function to map event type to transaction type.
   *
   * @private
   * @param {string} [rawTxType] - transaction type
   * @returns {string | null}
   */
  private getTxType(rawTxType?: string): string | undefined {
    switch (rawTxType) {
      case EGnosisEvents.StakePending:
        return EGnosisEventsMap.Stake;

      default:
        return undefined;
    }
  }
}

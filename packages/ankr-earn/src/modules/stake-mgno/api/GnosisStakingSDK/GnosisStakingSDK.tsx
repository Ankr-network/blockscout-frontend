import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData } from 'web3-eth-contract';

import {
  EEthereumNetworkId,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { ETH_SCALE_FACTOR, ZERO } from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { getProviderStatsUrl } from 'modules/stake-mgno/utils/getProviderStatsUrl';

import INSURANCE_ABI from '../contracts/InsuranceContract.json';
import MGNO_ABI from '../contracts/mGNO.json';
import PROVIDER_ABI from '../contracts/ProviderContract.json';
import REWARD_ABI from '../contracts/RewardContract.json';
import STAKING_ABI from '../contracts/StakingContract.json';
import VALIDATOR_MANAGER_ABI from '../contracts/ValidatorManagerContract.json';

import {
  GNOSIS_HISTORY_BLOCK_RANGE,
  GNOSIS_HISTORY_START_BLOCK,
  GNOSIS_PROVIDER_READ_ID,
  GNOSIS_STAKING_MAX_DECIMALS_LENGTH,
} from './const';
import {
  EGnosisEvents,
  EGnosisEventsMap,
  IDelegatorEventData,
  IFetchTxData,
  IGetPastEvents,
  IHistoryData,
  IProvider,
  IProviderStats,
} from './types';

const { contractConfig } = configFromEnv();

interface IGnosisStakingSDKProviders {
  writeProvider: Web3KeyWriteProvider;
  readProvider: Web3KeyReadProvider;
}

export class GnosisStakingSDK {
  private static instance?: GnosisStakingSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private readonly readProvider: Web3KeyReadProvider;

  public api: AxiosInstance;

  private currentAccount: string;

  private constructor({
    readProvider,
    writeProvider,
  }: IGnosisStakingSDKProviders) {
    GnosisStakingSDK.instance = this;

    this.writeProvider = writeProvider;
    this.readProvider = readProvider;
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
    const providerManager = ProviderManagerSingleton.getInstance();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(GNOSIS_PROVIDER_READ_ID),
    ]);

    const addrHasNotBeenUpdated =
      GnosisStakingSDK.instance?.currentAccount ===
      writeProvider.currentAccount;
    const hasNewProvider =
      GnosisStakingSDK.instance?.writeProvider === writeProvider &&
      GnosisStakingSDK.instance.readProvider === readProvider;

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

  private async isGnosisNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.gnosis, EEthereumNetworkId.sokol].includes(
      chainId,
    );
  }

  private async getProvider(): Promise<
    Web3KeyWriteProvider | Web3KeyReadProvider
  > {
    const isGnosisChain = await this.isGnosisNetwork(this.writeProvider);

    if (isGnosisChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isGnosisChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  private async getMgnoContract(): Promise<Contract> {
    return this.readProvider.createContract(MGNO_ABI, contractConfig.mGNOToken);
  }

  private async getProviderContract(): Promise<Contract> {
    return this.readProvider.createContract(
      PROVIDER_ABI,
      contractConfig.gnosisProviderContract,
    );
  }

  private async getStakingContract(): Promise<Contract> {
    return this.readProvider.createContract(
      STAKING_ABI,
      contractConfig.gnosisStakingContract,
    );
  }

  private async getInsuranceContract(): Promise<Contract> {
    return this.readProvider.createContract(
      INSURANCE_ABI,
      contractConfig.gnosisInsuranceContract,
    );
  }

  private async getRewardContract(): Promise<Contract> {
    return this.readProvider.createContract(
      REWARD_ABI,
      contractConfig.gnosisRewardContract,
    );
  }

  private async getValidatorManagerContract(): Promise<Contract> {
    return this.readProvider.createContract(
      VALIDATOR_MANAGER_ABI,
      contractConfig.gnosisValidatorManagerContract,
    );
  }

  public async getContributed(provider: string): Promise<BigNumber> {
    const insuranceContract = await this.getInsuranceContract();
    const contributed = await insuranceContract.methods
      .getContributed(provider)
      .call();

    return this.convertFromWei(contributed);
  }

  public async getTipRewards(provider: string): Promise<BigNumber> {
    const validatorManagerContract = await this.getValidatorManagerContract();

    const tipRewards = await validatorManagerContract.methods
      .getStakerTipReward(provider, this.currentAccount)
      .call();
    return this.convertFromWei(tipRewards);
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
    const validatorManagerContract = await this.getValidatorManagerContract();

    const tipRewards = await validatorManagerContract.methods
      .getStakerKeyReward(provider, this.currentAccount)
      .call();
    return this.convertFromWei(tipRewards);
  }

  public async getAllMyRewards(): Promise<BigNumber> {
    const providers = await this.getAllProviderAddresses();
    const rewards = await Promise.all(
      providers.map(provider => this.getRewards(provider)),
    );

    return rewards.reduce((acc, reward) => {
      acc.plus(reward);
      return acc;
    }, ZERO);
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
    // rangeStep,
    filter,
    latestBlockNumber,
  }: IGetPastEvents): Promise<EventData[]> {
    const eventsPromises: Promise<EventData[]>[] = [];

    // for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
    //   const fromBlock = i;
    //   const toBlock = fromBlock + rangeStep;

    eventsPromises.push(
      contract.getPastEvents(eventName, {
        fromBlock: startBlock,
        toBlock: latestBlockNumber,
        filter,
      }),
    );
    // }

    const pastEvents = await Promise.all(eventsPromises);

    return flatten(pastEvents);
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

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const stakingConfig = await this.getStakingContract();

    const minStake = await stakingConfig.methods.getMinStake().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Get max available for stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMaxStake(provider: string): Promise<BigNumber> {
    const stakingConfig = await this.getStakingContract();

    const maxStake = await stakingConfig.methods.getAvailable(provider).call();

    return this.convertFromWei(maxStake);
  }

  public async mintMgno(): Promise<string> {
    const mgnoContract = await this.getMgnoContract();

    const hexAmount = convertNumberToHex(
      new BigNumber(10_000_000).decimalPlaces(8),
      ETH_SCALE_FACTOR,
    );

    const data = await mgnoContract.methods
      .mint(this.currentAccount, hexAmount)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.mGNOToken,
      { data },
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

  public async getDelegatedAmount(
    provider: string,
    staker: string,
  ): Promise<BigNumber> {
    const stakingContract = await this.getStakingContract();

    const data = await stakingContract.methods
      .getStake(provider, staker)
      .call();

    return this.convertFromWei(data);
  }

  public async getMyDelegatedAmount(provider: string): Promise<BigNumber> {
    return this.getDelegatedAmount(provider, this.currentAccount);
  }

  public async getProviderStats(provider: string): Promise<IProviderStats> {
    return (await this.api.get(getProviderStatsUrl(provider))).data;
  }

  public async getHistoryData(): Promise<IHistoryData[]> {
    const providers = await this.getAllProviderAddresses();
    const providersStatsArr: AxiosResponse<IProviderStats, unknown>[] =
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

    return rawData.map(event => {
      const { provider, amount } = event.returnValues;

      return {
        date: new Date(event.timestamp * 1_000),
        hash: event.transactionHash,
        link: '',
        event: this.getTxType(event.event),
        provider: providersStatsMap.get(provider)?.provider.name ?? provider,
        amount: this.convertFromWei(amount),
      };
    });
  }

  public async getDelegatedAmountByProvider(
    provider: string,
  ): Promise<BigNumber> {
    const stakingConfig = await this.getStakingContract();

    const maxStake = await stakingConfig.methods
      .getProviderBalance(provider)
      .call();

    return this.convertFromWei(maxStake[0]);
  }

  public async getAllProviders(): Promise<IProvider[]> {
    const validators = await this.getAllProviderAddresses();

    return this.loadValidatorsInfo(validators);
  }

  public async getAllProviderAddresses(): Promise<string[]> {
    const providerContract = await this.getProviderContract();
    return providerContract.methods.getProviders().call();
  }

  private async loadValidatorsInfo(
    validators: Web3Address[],
  ): Promise<IProvider[]> {
    const validatorsWithInfo = await Promise.all(
      validators.map(validator => this.loadValidatorInfo(validator)),
    );

    return validatorsWithInfo;
  }

  // todo: change it
  private async loadValidatorInfo(validator: Web3Address): Promise<IProvider> {
    return {
      provider: validator,
      owner: '0xz0312bk132bhj312jvh',
      status: ' ',
      nodeKeys: 4,
      slashingProtection: 99,
      insurancePool: ZERO,
      staked: ZERO,
      available: ZERO,
    };
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
      { data },
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
      { data },
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
}

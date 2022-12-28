import axios, { AxiosInstance } from 'axios';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { Contract, EventData } from 'web3-eth-contract';

import { EEthereumNetworkId, Web3KeyReadProvider } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import { ZERO } from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { SLASHING_PROTECTION_VAR } from 'modules/stake-mgno/const';
import { getProviderStatsUrl } from 'modules/stake-mgno/utils/getProviderStatsUrl';

import INSURANCE_ABI from '../contracts/InsuranceContract.json';
import MGNO_ABI from '../contracts/mGNO.json';
import PROVIDER_ABI from '../contracts/ProviderContract.json';
import REWARD_ABI from '../contracts/RewardContract.json';
import STAKING_ABI from '../contracts/StakingContract.json';
import VALIDATOR_MANAGER_ABI from '../contracts/ValidatorManagerContract.json';

import { GNOSIS_PROVIDER_READ_ID } from './const';
import {
  IGetPastEvents,
  IProvider,
  IProvidersStakedData,
  IProviderStakedData,
  IProviderStats,
} from './types';

const { contractConfig } = configFromEnv();

interface IGnosisStakingReadSDKProviders {
  readProvider: Web3KeyReadProvider;
}

export class GnosisStakingReadSDK {
  private static readInstance?: GnosisStakingReadSDK;

  protected readonly readProvider: Web3KeyReadProvider;

  public api: AxiosInstance;

  protected constructor({ readProvider }: IGnosisStakingReadSDKProviders) {
    GnosisStakingReadSDK.readInstance = this;

    this.readProvider = readProvider;

    const { gatewayConfig } = configFromEnv();

    this.api = axios.create({
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });
  }

  public static async getInstance(): Promise<GnosisStakingReadSDK> {
    const providerManager = getProviderManager();
    const readProvider = await providerManager.getETHReadProvider(
      GNOSIS_PROVIDER_READ_ID,
    );

    if (GnosisStakingReadSDK.readInstance) {
      return GnosisStakingReadSDK.readInstance;
    }

    return new GnosisStakingReadSDK({ readProvider });
  }

  protected async isGnosisNetwork(
    provider: Web3KeyReadProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.gnosis, EEthereumNetworkId.sokol].includes(
      chainId,
    );
  }

  public async getProvider(): Promise<Web3KeyReadProvider> {
    return this.readProvider;
  }

  protected async getMgnoContract(): Promise<Contract> {
    return this.readProvider.createContract(MGNO_ABI, contractConfig.mGNOToken);
  }

  protected async getProviderContract(): Promise<Contract> {
    return this.readProvider.createContract(
      PROVIDER_ABI,
      contractConfig.gnosisProviderContract,
    );
  }

  protected async getStakingContract(): Promise<Contract> {
    return this.readProvider.createContract(
      STAKING_ABI,
      contractConfig.gnosisStakingContract,
    );
  }

  protected async getInsuranceContract(): Promise<Contract> {
    return this.readProvider.createContract(
      INSURANCE_ABI,
      contractConfig.gnosisInsuranceContract,
    );
  }

  protected async getRewardContract(): Promise<Contract> {
    return this.readProvider.createContract(
      REWARD_ABI,
      contractConfig.gnosisRewardContract,
    );
  }

  protected async getValidatorManagerContract(): Promise<Contract> {
    return this.readProvider.createContract(
      VALIDATOR_MANAGER_ABI,
      contractConfig.gnosisValidatorManagerContract,
    );
  }

  public async getContributed(provider: string): Promise<BigNumber> {
    const insuranceContract = await this.getInsuranceContract();
    const contributed = await insuranceContract.methods
      .getTotalContributed(provider)
      .call();

    return this.convertFromWei(contributed);
  }

  /**
   * Internal function to get past events, using the defined range.
   *
   * @protected
   * @param {IGetPastEvents}
   * @returns {Promise<EventData[]>}
   */
  protected async getPastEvents({
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
        contract.getPastEvents(eventName, {
          fromBlock,
          toBlock: latestBlockNumber > toBlock ? toBlock : latestBlockNumber,
          filter,
        }),
      );
    }

    const pastEvents = await Promise.all(eventsPromises);

    return flatten(pastEvents);
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const stakingConfig = await this.getStakingContract();

    const minStake = await stakingConfig.methods.minStakeAmount().call();

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

  protected async getDelegatedAmount(
    provider: string,
    staker: string,
  ): Promise<BigNumber> {
    const stakingContract = await this.getStakingContract();

    const data = await stakingContract.methods
      .getStaker(provider, staker)
      .call();

    return this.convertFromWei(data[0]);
  }

  public async getProviderStats(provider: string): Promise<IProviderStats> {
    return (await this.api.get(getProviderStatsUrl(provider))).data;
  }

  public async getProvidersStakedAvailable(): Promise<IProvidersStakedData> {
    const stakingConfig = await this.getStakingContract();

    const allProviders = await this.getAllProviderAddresses();
    const data = await stakingConfig.methods
      .getProvidersBalance(allProviders)
      .call();

    return {
      totalStaked: data[0].map((item: string) => this.convertFromWei(item)),
      availableToStake: data[1].map((item: string) =>
        this.convertFromWei(item),
      ),
    };
  }

  protected async getProviderStakedAvailable(
    provider: string,
  ): Promise<IProviderStakedData> {
    const stakingConfig = await this.getStakingContract();

    const data = await stakingConfig.methods
      .getProviderBalance(provider)
      .call();

    return {
      totalStaked: this.convertFromWei(data[0]),
      availableToStake: this.convertFromWei(data[1]),
    };
  }

  public async getMaxApr(): Promise<BigNumber> {
    const providers = await this.getAllProviderAddresses();

    const providersStats = (
      await Promise.all(
        providers.map(provider => this.getProviderStats(provider)),
      )
    ).sort((stats1, stats2) =>
      new BigNumber(+stats1.apr).minus(new BigNumber(+stats2.apr)).toNumber(),
    );

    return new BigNumber(+providersStats[0].apr);
  }

  public async getApr(provider: string): Promise<BigNumber> {
    const providerStats = await this.getProviderStats(provider);
    return new BigNumber(+providerStats.apr);
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

  protected async loadValidatorsInfo(
    validators: Web3Address[],
  ): Promise<IProvider[]> {
    const validatorsWithInfo = await Promise.all(
      validators.map(validator => this.loadValidatorInfo(validator)),
    );

    return validatorsWithInfo;
  }

  protected async loadValidatorInfo(provider: Web3Address): Promise<IProvider> {
    const providerStats = await this.getProviderStats(provider);
    const contributed = await this.getContributed(provider);
    const providerStakedData = await this.getProviderStakedAvailable(provider);
    const { totalStaked, availableToStake } = providerStakedData;

    const slashingProtection =
      contributed
        .multipliedBy(SLASHING_PROTECTION_VAR)
        .dividedBy(totalStaked) ?? ZERO;

    return {
      provider,
      providerName: providerStats?.provider.name ?? provider,
      status: ' ',
      nodeKeys: providerStats?.provider.totalKeys ?? 0,
      slashingProtection,
      insurancePool: contributed ?? ZERO,
      staked: totalStaked,
      available: availableToStake,
      apr: new BigNumber(+providerStats?.apr) ?? ZERO,
    };
  }

  /**
   * Internal function to convert wei value to human readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  public convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }
}

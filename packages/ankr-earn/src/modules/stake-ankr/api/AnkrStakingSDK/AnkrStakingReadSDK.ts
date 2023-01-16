import { getPastEvents } from '@ankr.com/advanced-api';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import prettyTime from 'pretty-time';
import { Memoize } from 'typescript-memoize';
import { BlockTransactionObject } from 'web3-eth';
import { Contract, EventData } from 'web3-eth-contract';

import {
  Address,
  EEthereumNetworkId,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ANKR_ABI, IS_ADVANCED_API_ACTIVE } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import {
  ETH_SCALE_FACTOR,
  featuresConfig,
  isMainnet,
  ZERO,
} from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import {
  LONG_CACHE_TIME,
  SHORT_CACHE_TIME,
  TEMPORARY_APY,
} from 'modules/stake-ankr/const';

import ANKR_TOKEN_STAKING_ABI from '../contracts/AnkrTokenStaking.json';
import STAKING_CONFIG_ABI from '../contracts/StakingConfig.json';

import {
  ANKR_HISTORY_BLOCK_RANGE,
  ANKR_HISTORY_START_BLOCK,
  ANKR_PROVIDER_READ_ID,
  SECONDS_IN_A_DAY,
  VALIDATOR_STATUS_MAPPING,
} from './const';
import {
  EAnkrEvents,
  IApyData,
  IChainConfig,
  IChainParams,
  IDelegatorDelegation,
  IDelegatorEventData,
  IGetPastEvents,
  IValidator,
} from './types';
import { sortEventData } from './utils';

const { contractConfig } = configFromEnv();

const ankrToken: Address = isMainnet
  ? contractConfig.ankrToken
  : contractConfig.testAnkrToken;

interface IAnkrStakingReadSDKProviders {
  readProvider: Web3KeyReadProvider;
}

interface IDelegationHistoryFilter {
  validator?: Web3Address;
  staker?: Web3Address;
}

export const BLOCK_TIME = 15;

export class AnkrStakingReadSDK {
  private static readInstance?: AnkrStakingReadSDK;

  protected readonly readProvider: Web3KeyReadProvider;

  constructor({ readProvider }: IAnkrStakingReadSDKProviders) {
    AnkrStakingReadSDK.readInstance = this;

    this.readProvider = readProvider;
  }

  public async getBlockNumber(): Promise<number> {
    return this.readProvider.getWeb3().eth.getBlockNumber();
  }

  public static async getInstance(): Promise<AnkrStakingReadSDK> {
    const providerManager = getProviderManager();
    const readProvider = await providerManager.getETHReadProvider(
      ANKR_PROVIDER_READ_ID,
    );

    if (AnkrStakingReadSDK.readInstance) {
      return AnkrStakingReadSDK.readInstance;
    }

    return new AnkrStakingReadSDK({ readProvider });
  }

  public async getProvider(): Promise<Web3KeyReadProvider> {
    return this.readProvider;
  }

  public async isEthNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      chainId,
    );
  }

  protected async getAnkrTokenContract(): Promise<Contract> {
    return this.readProvider.createContract(ANKR_ABI, ankrToken);
  }

  @Memoize({
    expiring: LONG_CACHE_TIME,
    hashFunction: (latestBlockNumber: number) => {
      return `${latestBlockNumber}`;
    },
  })
  public async getAllValidators(
    latestBlockNumber: number,
  ): Promise<IValidator[]> {
    const validators = await this.getAllValidatorsAddresses(latestBlockNumber);

    return this.loadValidatorsInfo(validators);
  }

  @Memoize({
    expiring: LONG_CACHE_TIME,
    hashFunction: (latestBlockNumber: number) => {
      return `${latestBlockNumber}`;
    },
  })
  public async getAllValidatorsAddresses(
    latestBlockNumber: number,
  ): Promise<Web3Address[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const validatorEvents = [
      EAnkrEvents.ValidatorAdded,
      EAnkrEvents.ValidatorRemoved,
    ];

    const [validatorAddedEvents, validatorRemovedEvents] = await Promise.all(
      validatorEvents.map(eventName =>
        this.getPastEvents({
          eventName,
          latestBlockNumber,
          contract: stakingContract,
          startBlock: ANKR_HISTORY_START_BLOCK,
          rangeStep: ANKR_HISTORY_BLOCK_RANGE,
        }),
      ),
    );

    const validators = new Set<Web3Address>();

    const sortedEventData = sortEventData(
      validatorAddedEvents,
      validatorRemovedEvents,
    );

    sortedEventData.forEach(log => {
      const { validator } = log.returnValues;
      if (log.event === EAnkrEvents.ValidatorAdded) {
        validators.add(validator);
      } else if (log.event === EAnkrEvents.ValidatorRemoved) {
        validators.delete(validator);
      }
    });

    return Array.from(validators);
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
    const { gatewayConfig } = configFromEnv();

    const apiUrl = featuresConfig.isBffEnabled
      ? gatewayConfig.advancedApiUrl
      : undefined;

    return getPastEvents({
      apiUrl,
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
  protected async getPastEventsBlockchain({
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

  protected getAnkrTokenStakingContract(): Contract {
    return this.readProvider.createContract(
      ANKR_TOKEN_STAKING_ABI,
      contractConfig.ankrTokenStaking,
    );
  }

  protected async loadValidatorsInfo(
    validators: Web3Address[],
    epoch?: number,
  ): Promise<IValidator[]> {
    const validatorsWithInfo = await Promise.all(
      validators.map(validator => this.loadValidatorInfo(validator, epoch)),
    );

    const totalDelegatedAmount = validatorsWithInfo.reduce(
      (acc, validator) => acc.plus(validator.totalDelegated),
      ZERO,
    );

    return validatorsWithInfo
      .map(validator => {
        return {
          ...validator,
          votingPower:
            new BigNumber(validator.totalDelegated)
              .dividedBy(totalDelegatedAmount)
              .multipliedBy(100)
              .toNumber() || 0,
        };
      })
      .sort((a, b) => {
        return new BigNumber(b.totalDelegated).comparedTo(
          new BigNumber(a.totalDelegated),
        );
      });
  }

  protected async getStakingConfigContract(): Promise<Contract> {
    return this.readProvider.createContract(
      STAKING_CONFIG_ABI,
      contractConfig.ankrStakingChainConfig,
    );
  }

  public async getActiveValidators(epoch?: number): Promise<IValidator[]> {
    const activeValidators = await this.getActiveValidatorsAddresses();
    return this.loadValidatorsInfo(activeValidators, epoch);
  }

  public async getActiveValidatorsAddresses(): Promise<Web3Address[]> {
    const stakingContract = this.getAnkrTokenStakingContract();
    return stakingContract.methods.getValidators().call();
  }

  protected async loadValidatorInfo(
    validator: Web3Address,
    epoch?: number,
  ): Promise<IValidator> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const status = epoch
      ? await stakingContract.methods
          .getValidatorStatusAtEpoch(validator, epoch)
          .call()
      : await stakingContract.methods.getValidatorStatus(validator).call();

    return {
      validator,
      changedAt: status.changedAt,
      claimedAt: status.claimedAt,
      totalDelegated: this.convertFromWei(status.totalDelegated),
      votingPower: 0,
      jailedBefore: status.jailedBefore,
      owner: status.ownerAddress,
      slashesCount: status.slashesCount,
      status: status.status,
      prettyStatus: VALIDATOR_STATUS_MAPPING[status.status] || 'UNKNOWN',
      commissionRate: status.commissionRate,
      totalRewards: this.convertFromWei(status.totalRewards),
    };
  }

  protected cachedChainConfig?: IChainConfig;

  public async getChainConfig(): Promise<IChainConfig> {
    if (this.cachedChainConfig) return this.cachedChainConfig;
    const stakingConfig = await this.getStakingConfigContract();
    const {
      activeValidatorsLength,
      epochBlockInterval,
      misdemeanorThreshold,
      felonyThreshold,
      validatorJailEpochLength,
      undelegatePeriod,
      minValidatorStakeAmount,
      minStakingAmount,
      lockPeriod,
    } = await stakingConfig.methods.getSlot0().call();

    this.cachedChainConfig = {
      activeValidatorsLength,
      epochBlockInterval,
      misdemeanorThreshold,
      felonyThreshold,
      validatorJailEpochLength,
      undelegatePeriod,
      minValidatorStakeAmount: this.convertFromWei(minValidatorStakeAmount),
      minStakingAmount: this.convertFromWei(minStakingAmount),
      lockPeriod,
    };
    return this.cachedChainConfig;
  }

  // TODO: add cache
  public async getChainParams(): Promise<IChainParams> {
    const { epochBlockInterval } = await this.getChainConfig();
    const blockNumber = await this.getBlockNumber();

    const epoch = epochBlockInterval
      ? Math.ceil(blockNumber / +epochBlockInterval)
      : 0;

    const endBlock = blockNumber + +epochBlockInterval;

    return {
      epoch,
      nextEpochIn: prettyTime(
        (endBlock - blockNumber) * BLOCK_TIME * 1000 * 1000 * 1000,
        's',
      ),
      nextEpochBlock: endBlock,
    };
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (filter: Partial<IDelegationHistoryFilter>) => {
      return `${filter.staker}${filter.validator}`;
    },
  })
  public async getDelegationHistory(
    filter: Partial<IDelegationHistoryFilter> = {},
    latestBlockNumber: number,
  ): Promise<IDelegatorDelegation[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const web3 = this.readProvider.getWeb3();

    const events = await this.getPastEvents({
      eventName: EAnkrEvents.Delegated,
      latestBlockNumber,
      contract: stakingContract,
      startBlock: ANKR_HISTORY_START_BLOCK,
      rangeStep: ANKR_HISTORY_BLOCK_RANGE,
      filter,
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

    return rawData.map((event): IDelegatorDelegation => {
      const { validator, staker, amount, epoch } = event.returnValues;
      return {
        event,
        validator,
        staker,
        amount,
        epoch,
        txDate: new Date(event.timestamp * 1_000),
      };
    });
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (filter: Partial<IDelegationHistoryFilter>) => {
      return `${filter.staker}`;
    },
  })
  public async getUndelegationHistory(
    filter: Partial<IDelegationHistoryFilter> = {},
    latestBlockNumber: number,
  ): Promise<IDelegatorDelegation[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const web3 = this.readProvider.getWeb3();

    const events = await this.getPastEvents({
      eventName: EAnkrEvents.Undelegated,
      latestBlockNumber,
      contract: stakingContract,
      startBlock: ANKR_HISTORY_START_BLOCK,
      rangeStep: ANKR_HISTORY_BLOCK_RANGE,
      filter,
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
      .map((event): IDelegatorDelegation => {
        const { validator, staker, amount, epoch } = event.returnValues;
        return {
          event,
          validator,
          staker,
          amount,
          epoch,
          txDate: new Date(event.timestamp * 1_000),
        };
      })
      .sort((a, b) => b.txDate.getTime() - a.txDate.getTime());
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (filter: Partial<IDelegationHistoryFilter>) => {
      return `${filter.staker}${filter.validator}`;
    },
  })
  public async getClaimHistory(
    filter: { validator?: Web3Address; staker?: Web3Address } = {},
    latestBlockNumber: number,
  ): Promise<IDelegatorDelegation[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const web3 = this.readProvider.getWeb3();

    const events = await this.getPastEvents({
      eventName: EAnkrEvents.Claimed,
      latestBlockNumber,
      contract: stakingContract,
      startBlock: ANKR_HISTORY_START_BLOCK,
      rangeStep: ANKR_HISTORY_BLOCK_RANGE,
      filter,
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

    return rawData.map((event): IDelegatorDelegation => {
      const { validator, staker, amount, epoch } = event.returnValues;
      return {
        event,
        validator,
        staker,
        amount,
        epoch,
        txDate: new Date(event.timestamp * 1_000),
      };
    });
  }

  public async getStakingRewards(
    validator: Web3Address,
    delegator: Web3Address,
  ): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    return stakingContract.methods
      .getStakingRewards(validator, delegator)
      .call();
  }

  /**
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const { minStakingAmount } = await this.getChainConfig();

    return minStakingAmount;
  }

  /**
   * Get total delegated ANKR amount.
   *
   * @public
   * @returns {BigNumber}
   */
  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (latestBlockNumber: number) => {
      return `${latestBlockNumber}`;
    },
  })
  public async getTotalTVL(latestBlockNumber: number): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators(latestBlockNumber);
    const delegationsSet = await Promise.all(
      validators.map(validator =>
        stakingContract.methods.getValidatorStatus(validator.validator).call(),
      ),
    );

    let result = ZERO;
    delegationsSet.forEach(validatorDelegation => {
      result = result.plus(new BigNumber(validatorDelegation.totalDelegated));
    });

    return result.dividedBy(ETH_SCALE_FACTOR);
  }

  /**
   * Get total delegated ANKR amount.
   *
   * @public
   * @returns {BigNumber}
   */
  public async getRewards(hoursBefore: number): Promise<BigNumber> {
    return ZERO.plus(hoursBefore);
  }

  /**
   * Get APY for validators.
   *
   * @public
   * @returns APY for validators
   */
  public async getAPY(): Promise<IApyData[]> {
    const [stakingContract, { epoch }, blockNumber] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getChainParams(),
      this.getBlockNumber(),
    ]);
    const provider = this.readProvider;
    const web3 = provider.getWeb3();
    const latestBlockNumber = blockNumber - ANKR_HISTORY_BLOCK_RANGE;

    const prevEpoch = epoch - 1;
    const validatorDepositedEvents = await this.getPastEvents({
      contract: stakingContract,
      startBlock: ANKR_HISTORY_START_BLOCK,
      latestBlockNumber,
      rangeStep: ANKR_HISTORY_BLOCK_RANGE,
      eventName: EAnkrEvents.ValidatorDeposited,
    });

    const calls = validatorDepositedEvents.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );
    const blocks = await provider.executeBatchCalls<BlockTransactionObject>(
      calls,
    );
    const rewardEvents = blocks
      .map((block, index) => ({
        ...validatorDepositedEvents[index],
        timestamp: block.timestamp as number,
        txDate: new Date((block.timestamp as number) * 1_000),
      }))
      .filter(block => +block.returnValues.epoch === prevEpoch);

    const validators = await this.getActiveValidators(prevEpoch);

    const rewardsMap = rewardEvents.reduce((acc, reward) => {
      const existedReward = acc.get(reward.returnValues.validator);
      acc.set(
        reward.returnValues.validator,
        (existedReward ?? ZERO).plus(
          this.convertFromWei(reward.returnValues.amount),
        ),
      );

      return acc;
    }, new Map<string, BigNumber>());

    const epochDurationDays = await this.getEpochDurationDays(blockNumber);
    const yearDays = new BigNumber(365);

    return validators.map(x => {
      const rewards = rewardsMap.get(x.validator) ?? ZERO;

      return {
        validator: x.validator,
        apy: !rewards.isZero()
          ? rewards
              .dividedBy(x.totalDelegated)
              .multipliedBy(yearDays.dividedBy(epochDurationDays))
              .multipliedBy(100)
          : TEMPORARY_APY,
      };
    });
  }

  /**
   * Internal function to convert wei value to human readable format.
   *
   * @protected
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  protected convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.readProvider.getWeb3().utils.fromWei(amount));
  }

  @Memoize({
    expiring: LONG_CACHE_TIME,
    hashFunction: (latestBlockNumber: number) => {
      return `${latestBlockNumber}`;
    },
  })
  public async getLockingPeriodDays(
    latestBlockNumber: number,
  ): Promise<number> {
    const { lockPeriod } = await this.getChainConfig();
    const epochDuration = await this.getEpochDurationDays(latestBlockNumber);
    const nextEpochSeconds = await this.getEpochEndSeconds(latestBlockNumber);

    return (
      lockPeriod * epochDuration + Math.ceil(nextEpochSeconds / (3600 * 24))
    );
  }

  public async getEpochEndSeconds(blockNumber: number): Promise<number> {
    const { epochBlockInterval } = await this.getChainConfig();

    return this.getEpochEndSecondsForBlockInterval(
      blockNumber,
      epochBlockInterval,
    );
  }

  protected getEpochEndSecondsForBlockInterval(
    blockNumber: number,
    epochBlockInterval: number,
  ): number {
    const nextEpochBlock =
      (Math.trunc(blockNumber / epochBlockInterval || 0) + 1) *
      epochBlockInterval;

    return (nextEpochBlock - blockNumber) * BLOCK_TIME;
  }

  protected async getEpochPrevDate(latestBlockNumber: number): Promise<Date> {
    const { epochBlockInterval } = await this.getChainConfig();

    const prevEpochBlock =
      (Math.trunc(latestBlockNumber / epochBlockInterval || 0) + 1) *
        epochBlockInterval -
      epochBlockInterval;

    const now = new Date();

    return new Date(
      now.getTime() - (latestBlockNumber - prevEpochBlock) * BLOCK_TIME * 1_000,
    );
  }

  protected async getEpochNextDate(latestBlockNumber: number): Promise<Date> {
    const { epochBlockInterval } = await this.getChainConfig();

    const nextEpochBlock =
      (Math.trunc(latestBlockNumber / epochBlockInterval || 0) + 1) *
      epochBlockInterval;

    const now = new Date();

    return new Date(
      now.getTime() + (nextEpochBlock - latestBlockNumber) * BLOCK_TIME * 1_000,
    );
  }

  protected async getEpochDurationDays(
    latestBlockNumber: number,
  ): Promise<number> {
    const { epochBlockInterval } = await this.getChainConfig();

    const prevEpochBlock =
      (Math.trunc(latestBlockNumber / epochBlockInterval || 0) + 1) *
        epochBlockInterval -
      epochBlockInterval;
    const nextEpochBlock =
      (Math.trunc(latestBlockNumber / epochBlockInterval || 0) + 1) *
      epochBlockInterval;

    return (
      Math.ceil((nextEpochBlock - prevEpochBlock) * BLOCK_TIME) /
      SECONDS_IN_A_DAY
    );
  }
}

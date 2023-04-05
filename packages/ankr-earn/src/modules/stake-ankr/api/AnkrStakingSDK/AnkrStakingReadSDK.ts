import { getPastEvents } from '@ankr.com/advanced-api';
import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
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
import {
  advancedAPIConfig,
  ANKR_ABI,
  batchEvents,
} from '@ankr.com/staking-sdk';

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
import ANKR_TOKEN_STAKING_V2_ABI from '../contracts/AnkrTokenStakingV2.json';
import STAKING_CONFIG_ABI from '../contracts/StakingConfig.json';
import VALIDATOR_STORAGE_ABI from '../contracts/ValidatorStorage.json';

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
  IGetIsMigratedDelegator,
  IGetPastEventsArgs,
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

  protected getAnkrTokenContract(): Contract {
    return this.readProvider.createContract(ANKR_ABI, ankrToken);
  }

  @Memoize({
    expiring: LONG_CACHE_TIME,
  })
  public async getAllValidators(): Promise<IValidator[]> {
    const validators = await this.getActiveValidatorsAddresses();

    return this.loadValidatorsInfo(validators);
  }

  /**
   * @deprecated Since it can't be used with testnets AAPI (6 months history)
   * and for now we have only one active validator.
   * Please use the `getActiveValidatorsAddresses` method instead.
   *
   * @return {Promise<Web3Address[]>} list of all (enabled and disabled) validators addresses
   */
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
   * @param {IGetPastEventsArgs} options - options for getting past events
   * @returns {Promise<EventData[]>}
   */
  private async getPastEvents(
    options: IGetPastEventsArgs,
  ): Promise<EventData[]> {
    return advancedAPIConfig.isActiveForEth
      ? this.getPastEventsAPI(options)
      : this.getPastEventsBlockchain(options);
  }

  /**
   * Internal function to get past events from indexed logs API.
   *
   * @private
   * @param {IGetPastEventsArgs}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEventsAPI({
    contract,
    eventName,
    startBlock,
    latestBlockNumber,
    filter,
  }: IGetPastEventsArgs): Promise<EventData[]> {
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
      blockchain: isMainnet ? 'eth' : 'eth_goerli',
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
   * @param {IGetPastEventsArgs}
   * @returns {Promise<EventData[]>}
   */
  private async getPastEventsBlockchain({
    contract,
    eventName,
    startBlock,
    rangeStep,
    filter,
    latestBlockNumber,
  }: IGetPastEventsArgs): Promise<EventData[]> {
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
   * Returns Ankr Token Staking contract.
   *
   * @return  {Promise<Contract>} Ankr Token Staking contract
   */
  protected async getAnkrTokenStakingContract(): Promise<Contract> {
    const isMigrated = await this.getIsContractsMigrated();

    return isMigrated
      ? this.getAnkrTokenStakingContractV2()
      : this.getAnkrTokenStakingContractV1();
  }

  /**
   * Inner function for getting status of contracts migration.
   * @note STAKAN-2571 should be removed after migration
   *
   * @return  {Promise<boolean>}  true if contracts are migrated, false otherwise
   */
  @Memoize({
    expiring: LONG_CACHE_TIME,
  })
  protected async getIsContractsMigrated(): Promise<boolean> {
    const contract = this.getAnkrTokenStakingContractV2();
    try {
      const migrationEpoch = '_MIGRATION_EPOCH';
      await contract.methods[migrationEpoch]().call();
      return true;
    } catch (error) {
      return false;
    }
  }

  protected getAnkrTokenStakingContractV1(): Contract {
    return this.readProvider.createContract(
      ANKR_TOKEN_STAKING_ABI,
      contractConfig.ankrTokenStaking,
    );
  }

  protected getAnkrTokenStakingContractV2(): Contract {
    return this.readProvider.createContract(
      ANKR_TOKEN_STAKING_V2_ABI,
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

  public async getActiveValidators(epoch?: number): Promise<IValidator[]> {
    const activeValidators = await this.getActiveValidatorsAddresses();
    return this.loadValidatorsInfo(activeValidators, epoch);
  }

  public async getActiveValidatorsAddresses(): Promise<Web3Address[]> {
    const isMigrated = await this.getIsContractsMigrated();

    // todo: STAKAN-2571 remove this check after migration
    const contract = isMigrated
      ? this.getValidatorStorageContract()
      : await this.getAnkrTokenStakingContract();

    return contract.methods.getValidators().call();
  }

  protected getValidatorStorageContract(): Contract {
    return this.readProvider.createContract(
      VALIDATOR_STORAGE_ABI,
      contractConfig.ankrValidatorStorage,
    );
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (validator: Web3Address, epoch?: number) => {
      return `${validator}${epoch ?? ''}`;
    },
  })
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
    const stakingConfig = this.getStakingConfigContract();
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
      lockPeriod: +lockPeriod,
    };
    return this.cachedChainConfig;
  }

  protected getStakingConfigContract(): Contract {
    return this.readProvider.createContract(
      STAKING_CONFIG_ABI,
      contractConfig.ankrStakingChainConfig,
    );
  }

  // TODO: add cache
  public async getChainParams(): Promise<IChainParams> {
    const { epochBlockInterval } = await this.getChainConfig();
    const blockNumber = await this.getBlockNumber();

    const epoch = epochBlockInterval
      ? Math.floor(blockNumber / +epochBlockInterval)
      : 0;

    const endBlock = blockNumber + +epochBlockInterval;

    const nextEpochInSec =
      ((epoch + 1) * epochBlockInterval - blockNumber) * BLOCK_TIME;

    return {
      epoch,
      nextEpochIn: nextEpochInSec,
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

    const getPastEventsArgs: IGetPastEventsArgs = {
      eventName: EAnkrEvents.Delegated,
      latestBlockNumber,
      contract: stakingContract,
      startBlock: ANKR_HISTORY_START_BLOCK,
      rangeStep: ANKR_HISTORY_BLOCK_RANGE,
      filter,
    };

    const delegatedEvents = await this.getPastEvents(getPastEventsArgs);

    const redelegatedEvents = await this.getPastEvents({
      ...getPastEventsArgs,
      eventName: EAnkrEvents.Redelegated,
    });

    const events = [...redelegatedEvents, ...delegatedEvents];

    const uniqueEvents = events.filter(
      (event, index) =>
        events.findIndex(e => e.transactionHash === event.transactionHash) ===
        index,
    );

    const calls = uniqueEvents.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks =
      await this.readProvider.executeBatchCalls<BlockTransactionObject>(calls);

    const rawData: IDelegatorEventData[] = blocks.map((block, index) => ({
      ...uniqueEvents[index],
      timestamp: +block.timestamp,
    }));

    const result = rawData.map((event): IDelegatorDelegation => {
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

    return result;
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (filter: Partial<IDelegationHistoryFilter>) => {
      return `${filter.staker}${filter.validator}`;
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

    const result = rawData.map((event): IDelegatorDelegation => {
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

    return result;
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
  public async getTotalTVL(): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators();
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
   * @returns array of APY info for each validator
   */
  public async getAPY(): Promise<IApyData[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const [{ epoch: currentEpoch }, blockNumber] = await Promise.all([
      this.getChainParams(),
      this.getBlockNumber(),
    ]);

    const provider = this.readProvider;
    const web3 = provider.getWeb3();
    const latestBlockNumber = blockNumber - ANKR_HISTORY_BLOCK_RANGE;

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
      .map((block, index) => {
        const timestamp = +block.timestamp;

        return {
          ...validatorDepositedEvents[index],
          timestamp,
          txDate: new Date(timestamp * 1_000),
        };
      })
      .filter(block => +block.returnValues.epoch === currentEpoch);

    const validators = await this.getActiveValidators(currentEpoch);

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

    const result = validators.map(x => {
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

    return result;
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

  /**
   * Returns status of the user migration.
   *
   * @param {string} userAddress - user address
   * @returns {Promise<boolean>}  true if user is migrated, false otherwise
   */
  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (userAddress: string) => userAddress,
  })
  public async getIsMigratedDelegator(
    userAddress: string,
  ): Promise<IGetIsMigratedDelegator> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const latestBlockNumber = await this.getBlockNumber();

    const delegatedEvents = await this.getPastEvents({
      eventName: EAnkrEvents.Delegated,
      latestBlockNumber,
      contract: stakingContract,
      startBlock: ANKR_HISTORY_START_BLOCK,
      rangeStep: ANKR_HISTORY_BLOCK_RANGE,
      filter: { staker: userAddress },
    });

    const zeroDelegatedEvents = delegatedEvents.length === 0;

    if (zeroDelegatedEvents) {
      return {
        isMigrationNeeded: false,
      };
    }

    const isMigrated: boolean = await stakingContract.methods
      .isMigratedDelegator(userAddress)
      .call();

    return {
      isMigrated,
      isMigrationNeeded: true,
    };
  }
}
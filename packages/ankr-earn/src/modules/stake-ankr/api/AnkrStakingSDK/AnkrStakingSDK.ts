import BigNumber from 'bignumber.js';
import flatten from 'lodash/flatten';
import { Memoize } from 'typescript-memoize';
import { TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';

import {
  Address,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import {
  ANKR_ABI,
  MAX_UINT256,
  MAX_UINT256_SCALE,
} from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import {
  DEFAULT_ROUNDING,
  ETH_SCALE_FACTOR,
  isMainnet,
  ZERO,
} from 'modules/common/const';
import { Days, Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { SHORT_CACHE_TIME } from 'modules/stake-ankr/const';

import { AnkrStakingReadSDK } from './AnkrStakingReadSDK';
import {
  AMOUNT_FROM_QUEUE_SCALE,
  ANKR_ESTIMATE_GAS_MULTIPLIER,
  ANKR_PROVIDER_READ_ID,
  ANKR_STAKING_MAX_DECIMALS_LENGTH,
  GAS_LIMIT_MULTIPLIER,
  GAS_LIMIT_PER_EPOCH,
  ONE_DAY_MS,
  ONE_DAY_SEC,
  UNSTAKE_GAS_LIMIT,
} from './const';
import {
  IActiveStakingByValidator,
  IApproveResponse,
  IClaimableUnstake,
  IDelegation,
  IDelegationQueueItem,
  IGetDaysLeft,
  IHistoryData,
  IQueueHistoryItem,
  IStakingReward,
  IUnstakingData,
} from './types';
import { getIsNonZeroAmount } from './utils';

const ONE_EPOCH = 1;

const { contractConfig } = configFromEnv();

const ankrToken: Address = isMainnet
  ? contractConfig.ankrToken
  : contractConfig.testAnkrToken;

interface IAnkrStakingSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  provider: string;
  destinationAddress?: string;
  latestBlockNumber: number;
}

interface IReward {
  validator: string;
  amount: BigNumber;
}

export class AnkrStakingSDK extends AnkrStakingReadSDK {
  private static instance?: AnkrStakingSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private currentAccount: string;

  private constructor({
    readProvider,
    writeProvider,
  }: IAnkrStakingSDKProviders) {
    super({ readProvider });

    AnkrStakingSDK.instance = this;

    this.writeProvider = writeProvider;

    this.currentAccount = this.writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<AnkrStakingSDK> {
    const providerManager = getProviderManager();
    const [writeProvider, readProvider] = await Promise.all([
      providerManager.getETHWriteProvider(),
      providerManager.getETHReadProvider(ANKR_PROVIDER_READ_ID),
    ]);

    const isActualAddress =
      AnkrStakingSDK.instance?.currentAccount === writeProvider.currentAccount;
    const isActualProvider =
      AnkrStakingSDK.instance?.writeProvider === writeProvider;

    if (AnkrStakingSDK.instance && isActualAddress && isActualProvider) {
      return AnkrStakingSDK.instance;
    }

    const instance = new AnkrStakingSDK({ readProvider, writeProvider });
    const isEthNetwork = await instance.isEthNetwork(writeProvider);

    if (isEthNetwork && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  public async getProvider(): Promise<
    Web3KeyWriteProvider | Web3KeyReadProvider
  > {
    const isEthChain = await this.isEthNetwork(this.writeProvider);

    if (isEthChain && !this.writeProvider.isConnected()) {
      await this.writeProvider.connect();
    }

    if (isEthChain) {
      return this.writeProvider;
    }

    return this.readProvider;
  }

  public async getAnkrBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ankrContract = this.getAnkrTokenContract();

    return (
      await provider.getErc20Balance(ankrContract, this.currentAccount)
    ).decimalPlaces(ANKR_STAKING_MAX_DECIMALS_LENGTH, BigNumber.ROUND_DOWN);
  }

  /**
   * Also known as stake
   */
  public async delegate(
    validator: Web3Address,
    amount: BigNumber,
  ): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const hexAmount = convertNumberToHex(
      amount.decimalPlaces(ANKR_STAKING_MAX_DECIMALS_LENGTH),
      ETH_SCALE_FACTOR,
    );

    const delegateTxn = stakingContract.methods.delegate(validator, hexAmount);

    const gasLimit: number = await delegateTxn.estimateGas({
      from: this.currentAccount,
    });

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      {
        data: delegateTxn.encodeABI(),
        gasLimit: this.getIncreasedGasLimit(gasLimit).toString(),
      },
    );

    return transactionHash;
  }

  /**
   * Internal function to return increased gas limit.
   *
   * @private
   * @param {number} gasLimit - initial gas limit
   * @returns {number}
   */
  private getIncreasedGasLimit(gasLimit: number): number {
    return Math.round(gasLimit * ANKR_ESTIMATE_GAS_MULTIPLIER);
  }

  /**
   * Also known as unstake
   */
  public async undelegate(
    validator: Web3Address,
    amount: BigNumber,
  ): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    const data = stakingContract.methods
      .undelegate(validator, hexAmount)
      .encodeABI();

    const { epoch: currentEpoch } = await this.getChainParams();

    const extendedGasLimit = await this.getExtendedGasLimit(
      validator,
      currentEpoch,
    );

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  /**
   * Also known as restake
   */
  public async redelegate(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const { epoch: currentEpoch } = await this.getChainParams();

    const extendedGasLimit = await this.getExtendedGasLimit(
      validator,
      currentEpoch,
    );

    const data = stakingContract.methods
      .redelegateDelegatorFee(validator)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  /**
   * Calculate gas limit based on epoch diff or queue length
   *
   * @private
   * @param {Web3Address} validator - validator address
   * @param {number} currentEpoch - current epoch
   * @return {Promise<number>} gas limit
   */
  private async getExtendedGasLimit(
    validator: Web3Address,
    currentEpoch: number,
  ): Promise<number> {
    const queue = await this.getDelegationQueue(validator);

    const gasLimitBasedOnQueueLength = queue.length * GAS_LIMIT_MULTIPLIER;

    const gasLimitBasedOnEpochDiff = queue.reduce((acc, item) => {
      const { epoch } = item;
      const epochDiff = currentEpoch - +epoch;
      const additionalGasLimit = epochDiff * GAS_LIMIT_PER_EPOCH;

      return acc + additionalGasLimit;
    }, 0);

    return gasLimitBasedOnEpochDiff < gasLimitBasedOnQueueLength
      ? gasLimitBasedOnQueueLength
      : gasLimitBasedOnEpochDiff;
  }

  /**
   * Returns queue of delegations for specified validator.
   *
   * @private
   * @param validator - validator address
   */
  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (validator: Web3Address) => validator,
  })
  private async getDelegationQueue(
    validator: Web3Address,
  ): Promise<IDelegationQueueItem[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    return stakingContract.methods
      .getDelegateQueue(validator, this.currentAccount)
      .call();
  }

  public async getMyClaimableStakingRewards(
    latestBlockNumber: number,
  ): Promise<IStakingReward[]> {
    return this.getAllClaimableStakingRewards(
      this.currentAccount,
      latestBlockNumber,
    );
  }

  public async getAllClaimableStakingRewards(
    delegator: Web3Address,
    latestBlockNumber: number,
  ): Promise<IStakingReward[]> {
    const delegationHistory = await this.getDelegationHistory(
      {
        staker: delegator,
      },
      latestBlockNumber,
    );
    const result: Record<Web3Address, IStakingReward> = {};

    const rewards: IReward[] = await Promise.all(
      delegationHistory.map(async delegation => ({
        validator: delegation.validator,
        amount: new BigNumber(
          await this.getStakingRewards(delegation.validator, delegator),
        ).dividedBy(ETH_SCALE_FACTOR),
      })),
    );

    if (!rewards.length) return Object.values(result);

    await Promise.all(
      rewards.map(async reward => {
        const validator = await this.loadValidatorInfo(reward.validator ?? '');
        if (!reward.amount.isZero()) {
          result[reward.validator] = {
            validator,
            amount: reward.amount.decimalPlaces(DEFAULT_ROUNDING),
          };
        }
      }),
    );

    return Object.values(result);
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
  })
  public async getAllClaimableUnstakes(): Promise<IClaimableUnstake[]> {
    const allValidatorsAddresses = await this.getActiveValidatorsAddresses();

    const claimableUnstakes = await Promise.all(
      allValidatorsAddresses.map(async validator => ({
        validator,
        amount: await this.getClaimableUnstakes(validator),
      })),
    );

    return claimableUnstakes;
  }

  public async getClaimableUnstakes(
    validator: Web3Address,
  ): Promise<BigNumber> {
    const delegatorFee = this.convertFromWei(
      await this.getDelegatorFee(validator),
    );
    const stakingRewards = this.convertFromWei(
      await this.getStakingRewards(validator, this.currentAccount),
    );

    return delegatorFee
      .minus(stakingRewards)
      .decimalPlaces(ANKR_STAKING_MAX_DECIMALS_LENGTH);
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
  })
  public async claimAllUnstakes(): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const unstakes = await this.getAllClaimableUnstakes();

    const inputs = unstakes.reduce<string[]>((acc, unstake) => {
      if (unstake.amount.isZero()) return acc;

      const data = stakingContract.methods
        .claimPendingUndelegates(unstake.validator)
        .encodeABI();

      acc.push(data);

      return acc;
    }, []);

    const data = stakingContract.methods.multicall(inputs).encodeABI();

    const extendedGasLimit = UNSTAKE_GAS_LIMIT * inputs.length;

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  private async getDelegatorFee(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    return stakingContract.methods
      .getDelegatorFee(validator, this.currentAccount)
      .call();
  }

  /**
   * Get unstaking data
   *
   * @public
   * @param latestBlockNumber - latest block number
   * @return {Promise<IUnstakingData[]>} unstaking data
   */
  public async getUnstakingNew(
    latestBlockNumber: number,
  ): Promise<IUnstakingData[]> {
    const [activeValidators, fullUndelegationHistory] = await Promise.all([
      this.getActiveValidators(),
      this.getUndelegationHistory(
        { staker: this.currentAccount },
        latestBlockNumber,
      ),
    ]);

    const undelegatingValidators = new Set(
      fullUndelegationHistory.map(undelegation => undelegation.validator),
    );

    const usingValidators = activeValidators.filter(validator =>
      undelegatingValidators.has(validator.validator),
    );

    const result = await Promise.all(
      usingValidators.map(async ({ validator }) =>
        this.getUnstakingForValidator(validator, latestBlockNumber),
      ),
    );

    return flatten(result);
  }

  /**
   * Get unstaking data for validator.
   *
   * @public
   * @param validator - validator address
   * @param latestBlockNumber - latest block number
   * @return  {Promise<IUnstakingData[]>}  unstaking data
   */
  public async getUnstakingForValidator(
    validator: Web3Address,
    latestBlockNumber: number,
  ): Promise<IUnstakingData[]> {
    const { epoch: currentEpoch, nextEpochIn } = await this.getChainParams();

    const isMigrated = await this.getIsContractsMigrated();

    const result: IUnstakingData[] = [];

    let totalLockedAmount = ZERO;

    // todo: STAKAN-2571 remove after migration
    if (isMigrated) {
      const stakingContract = await this.getAnkrTokenStakingContract();

      const pendingDelegatorFee = await stakingContract.methods
        .getPendingDelegatorFee(validator, this.currentAccount)
        .call();

      totalLockedAmount = new BigNumber(pendingDelegatorFee);
    } else {
      const undelegationHistory = await this.getUndelegationHistory(
        { staker: this.currentAccount, validator },
        latestBlockNumber,
      );

      totalLockedAmount = undelegationHistory.reduce((acc, item) => {
        if (item.epoch > currentEpoch) {
          return acc.plus(item.amount);
        }
        return acc;
      }, ZERO);
    }

    if (!totalLockedAmount.isZero()) {
      const pendingUndelegates: IUnstakingData = {
        provider: validator,
        unstakeAmount: this.convertFromWei(totalLockedAmount.toFixed()),
        daysLeft: nextEpochIn / ONE_DAY_SEC,
      };

      result.push(pendingUndelegates);
    }

    const [delegatorFee, stakingRewards] = await Promise.all([
      this.getDelegatorFee(validator),
      this.getStakingRewards(validator, this.currentAccount),
    ]);

    const unlockedAmount = new BigNumber(delegatorFee).minus(stakingRewards);

    if (!unlockedAmount.isZero()) {
      const unlockedUndelegates: IUnstakingData = {
        provider: validator,
        unstakeAmount: this.convertFromWei(unlockedAmount.toFixed()),
        daysLeft: 0,
      };

      result.push(unlockedUndelegates);
    }

    return result;
  }

  private calcLeftDays(startDate: Date, lockPeriod: Days): Days {
    const now = new Date();
    const diffTime = Math.abs(startDate.getTime() - now.getTime());
    const pastDays = Math.floor(diffTime / ONE_DAY_MS);
    return lockPeriod - pastDays;
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

  private async getDelegatorsFee(addresses: string[]): Promise<string[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const requests: Promise<string>[] = addresses.map(validatorAddress => {
      return stakingContract.methods
        .getDelegatorFee(validatorAddress, this.currentAccount)
        .call();
    });

    return Promise.all(requests);
  }

  /**
   * Returns all active delegations for current user for all validators
   *
   * @public
   * @param latestBlockNumber - latest block number
   */
  public async getActiveStaking(
    latestBlockNumber: number,
  ): Promise<IActiveStakingByValidator[]> {
    const { currentAccount } = this;

    const activeValidators = await this.getActiveValidators();

    const delegationHistory = await this.getDelegationHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    // geting the list of validators from delegations history without doubles
    const delegatingValidators = new Set(
      delegationHistory.map(delegation => delegation.validator),
    );

    // filtering delegating and active validators
    const usingValidators = activeValidators.filter(validator =>
      delegatingValidators.has(validator.validator),
    );

    return Promise.all(
      usingValidators.map(async ({ validator }) =>
        this.getActiveStakingByValidator(validator, latestBlockNumber),
      ),
    );
  }

  /**
   * @public
   * @param validator - validator address
   * @param latestBlockNumber - latest block number
   */
  public async getActiveStakingByValidator(
    validator: string,
    latestBlockNumber: number,
  ): Promise<IActiveStakingByValidator> {
    // ⬇️ download all data
    const [
      delegatedAmount,
      unlockedDelegatedByValidator,
      formattedDelegations,
    ] = await Promise.all([
      this.getDelegatedAmountByProvider(validator),
      this.getUnlockedDelegatedByValidator(validator),
      this.getFormattedDelegations(validator, latestBlockNumber),
    ]);

    return {
      activeDelegations: formattedDelegations,
      delegatedAmount,
      unlockedDelegatedByValidator,
      validator,
    };
  }

  /**
   * Getting a list of delegations with the addition of data about the locking period.
   *
   * @private
   * @param validator - validator address
   * @param latestBlockNumber - latest block number
   * @returns Array of delegations
   */
  private async getFormattedDelegations(
    validator: Address,
    latestBlockNumber: number,
  ): Promise<IDelegation[]> {
    const delegationsHistoryFromQueue =
      await this.getDelegationsHistoryFromQueue(validator);

    const mapQueueHistoryItem = async ({
      amount,
      fromEpoch,
    }: IQueueHistoryItem): Promise<IDelegation> => {
      const { daysLeft, totalDays } = await this.getDaysLeft(
        fromEpoch,
        latestBlockNumber,
      );

      const isActive = daysLeft > 0;

      return {
        amount: new BigNumber(amount).dividedBy(AMOUNT_FROM_QUEUE_SCALE),
        isActive,
        isUnknownPeriod: isActive && daysLeft < 1,
        lockingPeriod: Math.floor(daysLeft),
        totalLockPeriod: Math.floor(totalDays),
      };
    };

    return Promise.all(delegationsHistoryFromQueue.map(mapQueueHistoryItem));
  }

  /**
   * @public
   * @note STAKAN-2571 should be refactored after contracts migration
   * @return the filtered delegations history based on the delegations queue.
   */
  public async getDelegationsHistoryFromQueue(
    validator: string,
  ): Promise<IQueueHistoryItem[]> {
    const isMigrated = await this.getIsContractsMigrated();

    return isMigrated
      ? this.getDelegationsHistoryFromQueueV2(validator)
      : this.getDelegationsHistoryFromQueueV1(validator);
  }

  public async getDelegationsHistoryFromQueueV1(
    validator: string,
  ): Promise<IQueueHistoryItem[]> {
    let queue = await this.getDelegationQueue(validator);

    queue = queue.filter(getIsNonZeroAmount);

    const history: IQueueHistoryItem[] = [];

    if (queue.length === 0) {
      return history;
    }

    history.push({
      amount: queue[0].amount,
      fromEpoch: +queue[0].epoch,
    });

    for (let i = 1; i < queue.length; i += 1) {
      const cur = queue[i];
      const prev = queue[i - 1];

      const delegation = {
        amount: queue[i].amount,
        fromEpoch: +queue[i].epoch,
      };

      const curAm = new BigNumber(cur.amount);
      const prevAm = new BigNumber(prev.amount);

      const diff = prevAm.minus(curAm);

      if (diff.isNegative()) {
        delegation.amount = diff.abs().toString();
        history.push(delegation);
      } else if (diff.isPositive()) {
        for (let j = 0; j < i; j += 1) {
          const newAm = new BigNumber(history[j].amount).minus(diff);
          history[j].amount = newAm.isPositive() ? newAm.toString() : '0';
        }
      } else {
        delete history[history.length - 1];
        history.push(delegation);
      }
    }

    return history.filter(getIsNonZeroAmount);
  }

  public async getDelegationsHistoryFromQueueV2(
    validator: string,
  ): Promise<IQueueHistoryItem[]> {
    const queue = await this.getDelegationQueue(validator);

    const filteredQueue = queue.filter(getIsNonZeroAmount);

    const history = filteredQueue.map<IQueueHistoryItem>(item => ({
      amount: item.amount,
      fromEpoch: +item.epoch,
    }));

    return history;
  }

  /**
   * 🧮 calculating lock period in days
   *
   * @private
   * @param delegationEpoch - the number of the epoch in which the delegation was made
   * @param latestBlockNumber - latest block number
   * @return `daysLeft` - number of days of the locking period;
   *         `totalDays` - total number of the days of locking period;
   */
  private async getDaysLeft(
    delegationEpoch: number,
    latestBlockNumber: number,
  ): Promise<IGetDaysLeft> {
    const [
      { epoch: currentEpoch, nextEpochIn },
      { lockPeriod },
      epochDurationDays,
    ] = await Promise.all([
      this.getChainParams(),
      this.getChainConfig(),
      this.getEpochDurationDays(latestBlockNumber),
    ]);

    const nextEpochInDays = new BigNumber(nextEpochIn)
      .dividedBy(ONE_DAY_SEC)
      .decimalPlaces(DEFAULT_ROUNDING);

    const lockPeriodDays = lockPeriod * epochDurationDays;
    const willStartFromNextEpoch = currentEpoch < delegationEpoch;

    if (willStartFromNextEpoch) {
      const totalDays = +nextEpochInDays.plus(lockPeriodDays);

      return {
        daysLeft: totalDays,
        totalDays,
      };
    }

    const unlockEpoch = delegationEpoch + lockPeriod;
    const isUnlocked = unlockEpoch <= currentEpoch;

    if (isUnlocked) {
      return {
        daysLeft: 0,
        totalDays: lockPeriodDays,
      };
    }

    return {
      daysLeft:
        // as we add the number of days until the next epoch in,
        // we have to reduce the total locking period by ONE_EPOCH
        (unlockEpoch - currentEpoch - ONE_EPOCH) * epochDurationDays +
        +nextEpochInDays,
      totalDays: lockPeriodDays,
    };
  }

  /**
   * ℹ️ Currently is not used.
   *
   * @return  {Promise<string>} transaction hash
   */
  public async claimAll(): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const allValidatorsAddresses = await this.getActiveValidatorsAddresses();

    const delegatorsFee = await this.getDelegatorsFee(allValidatorsAddresses);

    const { epoch: currentEpoch } = await this.getChainParams();

    const gasLimitsPromise = allValidatorsAddresses.map(address =>
      this.getExtendedGasLimit(address, currentEpoch),
    );

    const gasLimits = await Promise.all(gasLimitsPromise);

    const extendedGasLimit = gasLimits.reduce((totalGasLimit, gasLimit) => {
      return totalGasLimit + gasLimit;
    }, 0);

    const inputs = delegatorsFee.reduce<string[]>((acc, delegatorFee, i) => {
      if (delegatorFee === '0') return acc;

      const validatorAddress = allValidatorsAddresses[i];

      const data = stakingContract.methods
        .claimDelegatorFee(validatorAddress)
        .encodeABI();

      acc.push(data);

      return acc;
    }, []);

    const data = stakingContract.methods.multicall(inputs).encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  public async claimAllForValidator(validator: string): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const data = stakingContract.methods
      .claimDelegatorFee(validator)
      .encodeABI();

    const { epoch: currentEpoch } = await this.getChainParams();

    const extendedGasLimit = await this.getExtendedGasLimit(
      validator,
      currentEpoch,
    );

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  public async claimRewards(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const data = stakingContract.methods
      .claimStakingRewards(validator)
      .encodeABI();

    const { epoch: currentEpoch } = await this.getChainParams();

    const extendedGasLimit = await this.getExtendedGasLimit(
      validator,
      currentEpoch,
    );

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  public async claimAllRewards(latestBlockNumber: number): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const rewards = await this.getMyClaimableStakingRewards(latestBlockNumber);

    const inputs = rewards.reduce<string[]>((acc, reward) => {
      if (reward.amount.isZero()) return acc;

      const data = stakingContract.methods
        .claimStakingRewards(reward.validator.validator)
        .encodeABI();

      acc.push(data);

      return acc;
    }, []);

    const { epoch: currentEpoch } = await this.getChainParams();

    const gasLimitsPromise = rewards.map(reward =>
      this.getExtendedGasLimit(reward.validator.validator, currentEpoch),
    );

    const gasLimits = await Promise.all(gasLimitsPromise);

    const extendedGasLimit = gasLimits.reduce((totalGasLimit, gasLimit) => {
      return totalGasLimit + gasLimit;
    }, 0);

    const data = stakingContract.methods.multicall(inputs).encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit, estimate: true },
    );

    return transactionHash;
  }

  public async claimUnstakes(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const data = stakingContract.methods
      .claimPendingUndelegates(validator)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, extendedGasLimit: UNSTAKE_GAS_LIMIT, estimate: true },
    );

    return transactionHash;
  }

  public async getRestakableAmount(validator: Web3Address): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const data = await stakingContract.methods
      .calcAvailableForRedelegateAmount(validator, this.currentAccount)
      .call();

    return (
      this.convertFromWei(data?.amountToStake).decimalPlaces(
        DEFAULT_ROUNDING,
      ) ?? ZERO
    );
  }

  public async getClaimableAmount(validator: Web3Address): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const claimbleRewards = await stakingContract.methods
      .getStakingRewards(validator, this.currentAccount)
      .call();

    return (
      this.convertFromWei(claimbleRewards).decimalPlaces(DEFAULT_ROUNDING) ??
      ZERO
    );
  }

  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (blockNumber: number) => `${blockNumber}`,
  })
  public async getAllEventsHistory(
    latestBlockNumber: number,
  ): Promise<IHistoryData[]> {
    const { currentAccount } = this;

    const delegationHistory = await this.getDelegationHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    const undelegationHistory = await this.getUndelegationHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    const claimHistory = await this.getClaimHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    const result = [
      ...delegationHistory,
      ...undelegationHistory,
      ...claimHistory,
    ]
      .map<IHistoryData>(delegation => ({
        date: delegation.txDate,
        hash: delegation.event?.transactionHash ?? '',
        event: delegation.event?.event,
        amount: this.convertFromWei(delegation.amount),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return result;
  }

  public async approve(amount: BigNumber): Promise<IApproveResponse> {
    const ankrTokenContract = this.getAnkrTokenContract();

    const hexAmount = convertNumberToHex(
      amount,
      MAX_UINT256.isEqualTo(amount) ? MAX_UINT256_SCALE : ETH_SCALE_FACTOR,
    );

    const approveTxn = ankrTokenContract.methods.approve(
      contractConfig.ankrTokenStaking,
      hexAmount,
    );

    const gasLimit: number = await approveTxn.estimateGas({
      from: this.currentAccount,
    });

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      ankrToken,
      {
        data: approveTxn.encodeABI(),
        gasLimit: this.getIncreasedGasLimit(gasLimit).toString(),
      },
    );

    return {
      amount,
      isApproved: false,
      txHash: transactionHash,
    };
  }

  public async getAllowance(): Promise<BigNumber> {
    const ankrTokenContract = await this.getAnkrTokenWriteContract();

    const allowance = await ankrTokenContract.methods
      .allowance(this.currentAccount, contractConfig.ankrTokenStaking)
      .call();

    return new BigNumber(allowance);
  }

  protected getAnkrTokenWriteContract(): Contract {
    return this.writeProvider.createContract(ANKR_ABI, ankrToken);
  }

  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    const allowance = await this.getAllowance();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    return new BigNumber(allowance).isGreaterThanOrEqualTo(hexAmount);
  }

  /**
   * Issuance of test tokens, aka test Ankr faucet
   */
  public getTestAnkrTokens(): Promise<IWeb3SendResult> {
    const fromAddr = this.currentAccount;

    // remove 0x from address
    const preparedFromAddr = fromAddr.substring(2);

    // data to request ankr tokens
    const data = `0x40c10f19000000000000000000000000${preparedFromAddr}00000000000000000000000000000000000000000033b2e3c9fd0803ce80000000`;

    return this.writeProvider.sendTransactionAsync(
      fromAddr,
      contractConfig.testAnkrToken,
      { data, estimate: true },
    );
  }

  /**
   * Fetch transaction data.
   *
   * @public
   * @note Parses first uint256 param from transaction input.
   * @param {string} txHash - transaction hash
   * @param latestBlockNumber - For cache purposes only
   * @returns {Promise<IFetchTxData>}
   */
  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (txHash: string, latestBlockNumber: number) => {
      return `${txHash}${latestBlockNumber}`;
    },
  })
  public async fetchTxData(
    txHash: string,
    latestBlockNumber: number,
  ): Promise<IFetchTxData> {
    const { writeProvider } = this;

    const web3 = writeProvider.getWeb3();

    const tx = await web3.eth.getTransaction(txHash);
    const providerHash = tx.input.slice(10, 74);

    const isStakeTx = tx.input.length > 100;
    let amountHash;
    let lockShares;
    if (isStakeTx) {
      amountHash = tx.input.slice(74, 138);
      const { 0: initLockShares } = web3.eth.abi.decodeParameters(
        ['uint256'],
        amountHash,
      );
      lockShares = initLockShares;
    }

    return {
      amount: isStakeTx
        ? new BigNumber(web3.utils.fromWei(lockShares))
        : undefined,
      destinationAddress: tx.to as string | undefined,
      isPending: tx.transactionIndex === null,
      provider: `0x${providerHash.slice(24)}`,
      latestBlockNumber,
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
  public async getMyTotalDelegatedAmount(): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators();

    const delegationsSet = await Promise.all(
      validators.map(validator =>
        stakingContract.methods
          .getValidatorDelegation(validator.validator, this.currentAccount)
          .call(),
      ),
    );

    const result = delegationsSet.reduce((acc, delegation) => {
      acc = acc.plus(new BigNumber(delegation.delegatedAmount));
      return acc;
    }, ZERO);

    return result.dividedBy(ETH_SCALE_FACTOR);
  }

  /**
   * Get delegated ANKR amount for validator.
   *
   * @public
   * @param {string} validator - validator address
   * @returns {BigNumber}
   */
  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (validator: string) => {
      return `${validator}`;
    },
  })
  public async getDelegatedAmountByProvider(
    validator: string,
  ): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators();

    if (!validators.some(val => val.validator === validator)) return ZERO;

    const delegation = await stakingContract.methods
      .getValidatorDelegation(validator, this.currentAccount)
      .call();

    return this.convertFromWei(delegation.delegatedAmount);
  }

  /**
   * Get unlocked ANKR amount for validator.
   *
   * @public
   * @param {string} validator - validator address
   * @returns {BigNumber}
   */
  @Memoize({
    expiring: SHORT_CACHE_TIME,
    hashFunction: (validator: string, latestBlockNumber: number) => {
      return `${validator}${latestBlockNumber}`;
    },
  })
  public async getUnlockedDelegatedByValidator(
    validator: string,
  ): Promise<BigNumber> {
    const validators = await this.getAllValidators();

    const isValidatorExists = validators.some(
      val => val.validator === validator,
    );

    if (!isValidatorExists) {
      return ZERO;
    }

    const stakingContract = await this.getAnkrTokenStakingContract();

    const delegation = await stakingContract.methods
      .calcUnlockedDelegatedAmount(validator, this.currentAccount)
      .call();

    return this.convertFromWei(delegation);
  }

  public async migrateDelegator(): Promise<IWeb3SendResult> {
    const contract = await this.getAnkrTokenStakingContract();
    const txn = contract.methods.migrateDelegator(this.currentAccount);

    return this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      {
        data: txn.encodeABI(),
        estimate: true,
      },
    );
  }
}

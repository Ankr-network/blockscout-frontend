import BigNumber from 'bignumber.js';
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
  ANKR_PROVIDER_READ_ID,
  ANKR_STAKING_MAX_DECIMALS_LENGTH,
  GAS_LIMIT_MULTIPLIER,
  GAS_LIMIT_PER_EPOCH,
  ONE_DAY,
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
    const ankrContract = await this.getAnkrTokenContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();

    const hexAmount = convertNumberToHex(
      amount.decimalPlaces(ANKR_STAKING_MAX_DECIMALS_LENGTH),
      ETH_SCALE_FACTOR,
    );

    const data = stakingContract.methods
      .delegate(validator, hexAmount)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, estimate: true },
    );

    return transactionHash;
  }

  /**
   * Also known as unstake
   */
  public async undelegate(
    validator: Web3Address,
    amount: BigNumber,
  ): Promise<string> {
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();
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
    const stakingContract = this.getAnkrTokenStakingContract();

    return stakingContract.methods
      .getDelegatorFee(validator, this.currentAccount)
      .call();
  }

  public async getUnstaking(
    usdPrice: BigNumber,
    latestBlockNumber: number,
  ): Promise<IUnstakingData[]> {
    const [
      { undelegatePeriod, epochBlockInterval },
      epochDuration,
      activeValidators,
      fullUndelegationHistory,
    ] = await Promise.all([
      this.getChainConfig(),
      this.getEpochDurationDays(latestBlockNumber),
      this.getActiveValidators(),
      this.getUndelegationHistory(
        { staker: this.currentAccount },
        latestBlockNumber,
      ),
    ]);

    const lockPeriodDays = undelegatePeriod * epochDuration;

    const undelegatingValidators = new Set(
      fullUndelegationHistory.map(undelegation => undelegation.validator),
    );

    const usingValidators = activeValidators.filter(validator =>
      undelegatingValidators.has(validator.validator),
    );

    const unlockedUndelegationsArr = await Promise.all(
      activeValidators.map(validator =>
        this.getClaimableUnstakes(validator.validator),
      ),
    );

    const unlockedUndelegationsMap = new Map(
      unlockedUndelegationsArr.map((delegation, index) => {
        return [activeValidators[index].validator, delegation];
      }),
    );

    return usingValidators.reduce<IUnstakingData[]>((result, validator) => {
      const existingUndelegations = fullUndelegationHistory
        .filter(undelegation => undelegation.validator === validator.validator)
        .sort((a, b) => b.txDate.getTime() - a.txDate.getTime());

      const totalUnlocked =
        unlockedUndelegationsMap.get(validator.validator) ?? ZERO;

      const unlockedRow: IUnstakingData = {
        provider: validator.validator,
        unstakeAmount: totalUnlocked,
        usdUnstakeAmount: totalUnlocked.multipliedBy(usdPrice),
        daysLeft: 0,
      };
      const lockedArr: IUnstakingData[] = [];

      if (existingUndelegations.length > 0) {
        const lastUndelegation = existingUndelegations[0];

        const blockNumber = lastUndelegation.event?.blockNumber ?? 0;
        const secondsToStartFirstEpoch =
          this.getEpochEndSecondsForBlockInterval(
            blockNumber,
            epochBlockInterval,
          );
        const daysToStartFirstEpoch = Math.trunc(
          secondsToStartFirstEpoch / (60 * 60 * 24),
        );

        const totalLockingDays = daysToStartFirstEpoch + lockPeriodDays;
        const lastUndelegationDaysLeft = this.calcLeftDays(
          lastUndelegation.txDate,
          totalLockingDays,
        );

        if (lastUndelegationDaysLeft > 0) {
          for (let i = 0; i < existingUndelegations.length; i += 1) {
            const undelegation = existingUndelegations[i];

            const existedBlockNumber = lastUndelegation.event?.blockNumber ?? 0;
            const existedSecondsToStartFirstEpoch =
              this.getEpochEndSecondsForBlockInterval(
                existedBlockNumber,
                epochBlockInterval,
              );
            const existedDaysToStartFirstEpoch = Math.trunc(
              existedSecondsToStartFirstEpoch / (60 * 60 * 24),
            );
            const existedTotalLockingDays =
              existedDaysToStartFirstEpoch + lockPeriodDays;
            const daysLeft = this.calcLeftDays(
              undelegation.txDate,
              existedTotalLockingDays,
            );

            if (daysLeft > 0) {
              const amount = this.convertFromWei(undelegation.amount);

              lockedArr.push({
                provider: undelegation.validator,
                unstakeAmount: amount,
                usdUnstakeAmount: amount.multipliedBy(usdPrice),
                daysLeft,
              });
            }
          }
        }
      }

      result.push(...lockedArr);

      if (!unlockedRow.unstakeAmount.isZero()) {
        result.unshift(unlockedRow);
      }
      return result;
    }, []);
  }

  private calcLeftDays(startDate: Date, lockPeriod: Days): Days {
    const now = new Date();
    const diffTime = Math.abs(startDate.getTime() - now.getTime());
    const pastDays = Math.floor(diffTime / ONE_DAY);
    return lockPeriod - pastDays;
  }

  public async getStakingRewards(
    validator: Web3Address,
    delegator: Web3Address,
  ): Promise<string> {
    const stakingContract = this.getAnkrTokenStakingContract();

    return stakingContract.methods
      .getStakingRewards(validator, delegator)
      .call();
  }

  private async getDelegatorsFee(addresses: string[]): Promise<string[]> {
    const stakingContract = this.getAnkrTokenStakingContract();

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
   * @return the filtered delegations history based on the delegations queue.
   */
  public async getDelegationsHistoryFromQueue(
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

    const lockPeriodDays = lockPeriod * epochDurationDays;
    const willStartFromNextEpoch = currentEpoch < delegationEpoch;

    if (willStartFromNextEpoch) {
      const totalDays = lockPeriodDays + nextEpochIn;

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
        nextEpochIn,
      totalDays: lockPeriodDays,
    };
  }

  /**
   * ℹ️ Currently is not used.
   *
   * @return  {Promise<string>} transaction hash
   */
  public async claimAll(): Promise<string> {
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();
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
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingContract = this.getAnkrTokenStakingContract();
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
    const stakingContract = this.getAnkrTokenStakingContract();
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

    const delegation = await this.getDelegationHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    const undelegation = await this.getUndelegationHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    const claim = await this.getClaimHistory(
      { staker: currentAccount },
      latestBlockNumber,
    );

    const result = [
      ...delegation.map<IHistoryData>(delegItem => ({
        date: delegItem.txDate,
        hash: delegItem.event?.transactionHash ?? '',
        event: delegItem.event?.event,
        amount: this.convertFromWei(delegItem.amount),
      })),
      ...undelegation.map<IHistoryData>(undelegItem => ({
        date: undelegItem.txDate,
        hash: undelegItem.event?.transactionHash ?? '',
        event: undelegItem.event?.event,
        amount: this.convertFromWei(undelegItem.amount),
      })),
      ...claim.map<IHistoryData>(claimItem => ({
        date: claimItem.txDate,
        hash: claimItem.event?.transactionHash ?? '',
        event: claimItem.event?.event,
        amount: this.convertFromWei(claimItem.amount),
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    return result;
  }

  public async approve(amount: BigNumber): Promise<IApproveResponse> {
    const ankrTokenContract = await this.getAnkrTokenContract();

    const data = ankrTokenContract.methods
      .approve(
        contractConfig.ankrTokenStaking,
        convertNumberToHex(
          amount,
          MAX_UINT256.isEqualTo(amount) ? MAX_UINT256_SCALE : ETH_SCALE_FACTOR,
        ),
      )
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      ankrToken,
      { data, estimate: true },
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
    const stakingContract = this.getAnkrTokenStakingContract();
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
    const stakingContract = this.getAnkrTokenStakingContract();
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

    const stakingContract = this.getAnkrTokenStakingContract();

    const delegation = await stakingContract.methods
      .calcUnlockedDelegatedAmount(validator, this.currentAccount)
      .call();

    return this.convertFromWei(delegation);
  }
}

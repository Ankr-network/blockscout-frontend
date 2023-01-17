/* eslint-disable no-debugger */
import BigNumber from 'bignumber.js';
import { Memoize } from 'typescript-memoize';
import { TransactionReceipt } from 'web3-core';

import {
  Address,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import { getProviderManager } from 'modules/api/getProviderManager';
import {
  DEFAULT_ROUNDING,
  ETH_SCALE_FACTOR,
  isMainnet,
  ZERO,
} from 'modules/common/const';
import { Days, Milliseconds, Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { SHORT_CACHE_TIME } from 'modules/stake-ankr/const';

import { AnkrStakingReadSDK } from './AnkrStakingReadSDK';
import {
  ANKR_PROVIDER_READ_ID,
  ANKR_STAKING_BLOCK_WITH_FIX,
  ANKR_STAKING_MAX_DECIMALS_LENGTH,
} from './const';
import {
  IActiveStakingByValidator,
  IApproveResponse,
  IClaimableUnstake,
  IDelegation,
  IDelegatorDelegation,
  IHistoryData,
  ILockingPeriod,
  IStakingReward,
  IUnstakingData,
} from './types';

const { contractConfig } = configFromEnv();

const ankrToken: Address = isMainnet
  ? contractConfig.ankrToken
  : contractConfig.testAnkrToken;

const ONE_DAY: Milliseconds = 1000 * 60 * 60 * 24;

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
    const stakingContract = await this.getAnkrTokenStakingContract();

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
      { data },
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
    const stakingContract = await this.getAnkrTokenStakingContract();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    const data = stakingContract.methods
      .undelegate(validator, hexAmount)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data, estimate: true },
    );

    return transactionHash;
  }

  /**
   * Also known as restake
   */
  public async redelegate(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const data = stakingContract.methods
      .redelegateDelegatorFee(validator)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data },
    );

    return transactionHash;
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
  public async getAllClaimableUnstakes(
    latestBlockNumber: number,
  ): Promise<IClaimableUnstake[]> {
    const allValidatorsAddresses = await this.getAllValidatorsAddresses(
      latestBlockNumber,
    );

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
    hashFunction: (latestBlockNumber: number) => {
      return `${latestBlockNumber}`;
    },
  })
  public async claimAllUnstakes(latestBlockNumber: number): Promise<string> {
    const [stakingContract, unstakes] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getAllClaimableUnstakes(latestBlockNumber),
    ]);

    const inputs = unstakes.reduce<string[]>((acc, unstake) => {
      if (unstake.amount.isZero()) return acc;

      const data = stakingContract.methods
        .claimPendingUndelegates(unstake.validator)
        .encodeABI();

      acc.push(data);

      return acc;
    }, []);

    const data = stakingContract.methods.multicall(inputs).encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data },
    );

    return transactionHash;
  }

  private async getDelegatorFee(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

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

    // ⬇️ download all data
    const [activeValidators, delegationHistory] = await Promise.all([
      this.getActiveValidators(),
      this.getDelegationHistory({ staker: currentAccount }, latestBlockNumber),
    ]);

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
      this.getDelegatedAmountByProvider(validator, latestBlockNumber),
      this.getUnlockedDelegatedByValidator(validator, latestBlockNumber),
      this.getFormattedDelegations(validator, latestBlockNumber),
    ]);

    const reverseDelegations = formattedDelegations.reverse();

    let totalActiveStaking = ZERO;
    const activeDelegations: IDelegation[] = [];

    for (let i = 0; i < reverseDelegations.length; i += 1) {
      const delegation = reverseDelegations[i];

      const isActive =
        delegation.isActive &&
        delegatedAmount
          .minus(unlockedDelegatedByValidator)
          .minus(totalActiveStaking)
          .isGreaterThan(ZERO);

      if (isActive) {
        totalActiveStaking = totalActiveStaking.plus(delegation.amount);
        activeDelegations.push(delegation);
      }
    }

    const expectedTotalActiveStaking = delegatedAmount.minus(
      unlockedDelegatedByValidator,
    );

    const isException =
      !expectedTotalActiveStaking.isEqualTo(totalActiveStaking);

    if (isException) {
      const exceptedDelegation: IDelegation = {
        txDate: new Date(),
        amount: expectedTotalActiveStaking.minus(totalActiveStaking),
        lockingPeriod: 0,
        totalLockPeriod: 0,
        isActive: true,
        isUnknownPeriod: true,
      };
      activeDelegations.unshift(exceptedDelegation);
    }

    return {
      activeDelegations,
      delegatedAmount,
      unlockedDelegatedByValidator,
      validator,
    };
  }

  /**
   * Getting a list of delegations with the addition of data about the locking period.
   * Also, this method takes into account transactions that were affected by the bug
   * in the contract before the `16182044` block.
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
    const { currentAccount } = this;

    // ⬇️ download all data
    const [rawDelegationHistory, lastClaimOrUndelegateDate] = await Promise.all(
      [
        this.getDelegationHistory(
          { staker: currentAccount },
          latestBlockNumber,
        ),
        this.getLastClaimOrUndelegateDate(validator),
      ],
    );

    const delegationsByValidator = rawDelegationHistory.filter(
      delegation => delegation.validator === validator,
    );

    const mapDelegationHistory = async ({
      txDate,
      amount: weiAmount,
      event,
    }: IDelegatorDelegation): Promise<IDelegation> => {
      const lockingPeriodData = await this.getLockingPeriod(
        txDate,
        latestBlockNumber,
      );

      const { totalLockPeriod } = lockingPeriodData;
      let { daysLeft: lockingPeriod } = lockingPeriodData;

      const isDelegationWasBeforeFix = event
        ? event.blockNumber < ANKR_STAKING_BLOCK_WITH_FIX
        : false;

      const isDelegationCorrupted =
        isDelegationWasBeforeFix && !!lastClaimOrUndelegateDate;

      if (isDelegationCorrupted) {
        const { daysLeft: lockingPeriodForCorrupted } =
          await this.getLockingPeriod(
            lastClaimOrUndelegateDate,
            latestBlockNumber,
          );

        lockingPeriod = lockingPeriodForCorrupted;
      }

      return {
        lockingPeriod,
        totalLockPeriod,
        txDate,
        amount: this.convertFromWei(weiAmount),
        isActive: lockingPeriod > 0,
      };
    };

    return Promise.all(delegationsByValidator.map(mapDelegationHistory));
  }

  /**
   * Get last claim or undelegate date.
   *
   * @private
   * @param validator - validator address
   * @returns the date of the user last claim or undelegate action
   */
  private async getLastClaimOrUndelegateDate(
    validator: string,
  ): Promise<Date | null> {
    const { currentAccount } = this;

    // ⬇️ download all data
    const [claimHistory, undelegateHistory] = await Promise.all([
      this.getClaimHistory(
        { staker: currentAccount },
        ANKR_STAKING_BLOCK_WITH_FIX,
      ),
      this.getUndelegationHistory(
        { staker: currentAccount },
        ANKR_STAKING_BLOCK_WITH_FIX,
      ),
    ]);

    const claimAndUndelegateHistory = [
      ...claimHistory,
      ...undelegateHistory,
    ].filter(delegation => delegation.validator === validator);

    const lastClaimOrUndelegateDate = claimAndUndelegateHistory.length
      ? claimAndUndelegateHistory.reduce((a, b) => {
          return a.txDate > b.txDate ? a : b;
        }).txDate
      : null;

    return lastClaimOrUndelegateDate;
  }

  // todo: need to check the correctness
  /**
   * 🧮 calculating lock period in days
   *
   * @private
   * @param txDate - transaction date
   * @param latestBlockNumber - latest block number
   * @return `lockPeriod` - number of days of the locking period;
   *         `totalLockPeriod` - total number of the days of locking period;
   */
  private async getLockingPeriod(
    txDate: Date,
    latestBlockNumber: number,
  ): Promise<ILockingPeriod> {
    const [{ lockPeriod }, epochDurationDays, nextEpochDate] =
      await Promise.all([
        this.getChainConfig(),
        this.getEpochDurationDays(latestBlockNumber),
        this.getEpochNextDate(latestBlockNumber),
      ]);

    const lockPeriodDays = lockPeriod * epochDurationDays;
    const daysToNextEpoch = this.calcEpochDaysLeft(nextEpochDate, txDate);
    const totalLockPeriod = lockPeriodDays + daysToNextEpoch;
    const daysLeft = this.calcLeftDays(txDate, totalLockPeriod);

    return {
      totalLockPeriod,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
    };
  }

  private calcLeftDays(startDate: Date, lockPeriod: number): Days {
    const now = new Date();
    const diffTime = Math.abs(startDate.getTime() - now.getTime());
    const pastDays = Math.floor(diffTime / ONE_DAY);
    return lockPeriod - pastDays;
  }

  private calcEpochDaysLeft(nextEpochDate: Date, startDate: Date): Days {
    return Math.ceil(
      ((nextEpochDate.getTime() - startDate.getTime()) / ONE_DAY) % 7,
    );
  }

  public async claimAll(): Promise<string> {
    const allValidatorsAddresses = await this.getAllValidatorsAddresses(
      await this.getBlockNumber(),
    );
    const [stakingContract, delegatorsFee] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getDelegatorsFee(allValidatorsAddresses),
    ]);

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
      { data },
    );

    return transactionHash;
  }

  public async claimAllForValidator(validator: string): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const data = stakingContract.methods
      .claimDelegatorFee(validator)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data },
    );

    return transactionHash;
  }

  public async claimRewards(validator: Web3Address): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const data = stakingContract.methods
      .claimStakingRewards(validator)
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data },
    );

    return transactionHash;
  }

  public async claimAllRewards(latestBlockNumber: number): Promise<string> {
    const [stakingContract, rewards] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getMyClaimableStakingRewards(latestBlockNumber),
    ]);

    const inputs = rewards.reduce<string[]>((acc, reward) => {
      if (reward.amount.isZero()) return acc;

      const data = stakingContract.methods
        .claimStakingRewards(reward.validator.validator)
        .encodeABI();

      acc.push(data);

      return acc;
    }, []);

    const data = stakingContract.methods.multicall(inputs).encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      contractConfig.ankrTokenStaking,
      { data },
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
      { data },
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

    const [delegation, undelegation, claim] = await Promise.all([
      this.getDelegationHistory({ staker: currentAccount }, latestBlockNumber),
      this.getUndelegationHistory(
        { staker: currentAccount },
        latestBlockNumber,
      ),
      this.getClaimHistory({ staker: currentAccount }, latestBlockNumber),
    ]);

    return [
      ...delegation.map(delegItem => ({
        date: delegItem.txDate,
        hash: delegItem.event?.transactionHash ?? '',
        event: delegItem.event?.event,
        amount: this.convertFromWei(delegItem.amount),
      })),
      ...undelegation.map(undelegItem => ({
        date: undelegItem.txDate,
        hash: undelegItem.event?.transactionHash ?? '',
        event: undelegItem.event?.event,
        amount: this.convertFromWei(undelegItem.amount),
      })),
      ...claim.map(claimItem => ({
        date: claimItem.txDate,
        hash: claimItem.event?.transactionHash ?? '',
        event: claimItem.event?.event,
        amount: this.convertFromWei(claimItem.amount),
      })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  public async approve(amount: BigNumber): Promise<IApproveResponse> {
    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return {
        isApproved: true,
      };
    }

    const ankrTokenContract = await this.getAnkrTokenContract();

    const data = ankrTokenContract.methods
      .approve(
        contractConfig.ankrTokenStaking,
        convertNumberToHex(amount, ETH_SCALE_FACTOR),
      )
      .encodeABI();

    const { transactionHash } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      ankrToken,
      { data },
    );

    return {
      isApproved: false,
      txHash: transactionHash,
    };
  }

  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    const ankrTokenContract = await this.getAnkrTokenContract();

    const allowance = await ankrTokenContract.methods
      .allowance(this.currentAccount, contractConfig.ankrTokenStaking)
      .call();

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
      { data },
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
  public async getMyTotalDelegatedAmount(
    latestBlockNumber: number,
  ): Promise<BigNumber> {
    const [stakingContract, validators] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getAllValidators(latestBlockNumber),
    ]);

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
    latestBlockNumber: number,
  ): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators(latestBlockNumber);

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
    latestBlockNumber: number,
  ): Promise<BigNumber> {
    const validators = await this.getAllValidators(latestBlockNumber);

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
}

import BigNumber from 'bignumber.js';
import { Memoize } from 'typescript-memoize';
import { TransactionReceipt } from 'web3-core';

import {
  Address,
  IWeb3SendResult,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import {
  DEFAULT_ROUNDING,
  ETH_SCALE_FACTOR,
  isMainnet,
  ZERO,
} from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { CACHE_TIME, EProviderStatus } from 'modules/stake-ankr/const';

import { AnkrStakingReadSDK } from './AnkrStakingReadSDK';
import {
  ANKR_PROVIDER_READ_ID,
  ANKR_STAKING_MAX_DECIMALS_LENGTH,
} from './const';
import {
  IActiveStakingData,
  IAdditionalActiveStakingData,
  IApproveResponse,
  IClaimableUnstake,
  IDelegatorDelegation,
  IHistoryData,
  ILockPeriod,
  IStakingReward,
  IUnstakingData,
} from './types';

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
    const providerManager = ProviderManagerSingleton.getInstance();
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

  public async calcLockPeriodForDelegations(
    delegations: IDelegatorDelegation[],
  ): Promise<ILockPeriod[]> {
    const { epochBlockInterval, lockPeriod } = await this.getChainConfig();

    const { blockNumber, blockTime } = await this.getChainParams();

    return delegations.reduce<ILockPeriod[]>((acc, delegation) => {
      const availableAfterBlock =
        delegation.epoch * epochBlockInterval + lockPeriod * epochBlockInterval;

      acc.push({
        isAvailable: availableAfterBlock > blockNumber,
        availableAfterBlock,
        estimationTime: (availableAfterBlock - blockNumber) * blockTime,
      });

      return acc;
    }, []);
  }

  public async getMyClaimableStakingRewards(): Promise<IStakingReward[]> {
    return this.getAllClaimableStakingRewards(this.currentAccount);
  }

  public async getAllClaimableStakingRewards(
    delegator: Web3Address,
  ): Promise<IStakingReward[]> {
    const provider = await this.getProvider();

    const delegationHistory = await this.getDelegationHistory(
      {
        staker: delegator,
      },
      await provider.getBlockNumber(),
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
    expiring: CACHE_TIME,
    hashFunction: (latestBlockNumber: number) => {
      return `${latestBlockNumber}`;
    },
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
    expiring: CACHE_TIME,
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

  public async getUnstaking(usdPrice: BigNumber): Promise<IUnstakingData[]> {
    const provider = await this.getProvider();

    const [{ undelegatePeriod }, epochDuration, activeValidators] =
      await Promise.all([
        this.getChainConfig(),
        this.getEpochDurationDays(),
        this.getActiveValidators(),
      ]);

    const lockPeriodDays = undelegatePeriod * epochDuration;

    const fullUndelegationHistory = await this.getUndelegationHistory(
      {
        staker: this.currentAccount,
      },
      await provider.getBlockNumber(),
    );
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

    const prevEpochDate = await this.getEpochPrevDate();

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

        const diff = Math.abs(
          prevEpochDate.getTime() - lastUndelegation.txDate.getTime(),
        );
        const daysToStartFirstEpoch = Math.ceil(
          (diff / (1000 * 60 * 60 * 24)) % epochDuration,
        );
        const totalLockingDays = daysToStartFirstEpoch + lockPeriodDays;
        const minDaysLeft = this.calcLeftDays(
          lastUndelegation.txDate,
          totalLockingDays,
        );

        if (minDaysLeft > 0) {
          for (let i = 0; i < existingUndelegations.length; i += 1) {
            const undelegation = existingUndelegations[i];

            const existedDiff = Math.abs(
              prevEpochDate.getTime() - undelegation.txDate.getTime(),
            );
            const existedDaysToStartFirstEpoch = Math.ceil(
              (existedDiff / (1000 * 60 * 60 * 24)) % epochDuration,
            );
            const existedTotalLockingDays =
              existedDaysToStartFirstEpoch + lockPeriodDays;
            const daysLeft =
              lockPeriodDays > 0
                ? this.calcLeftDays(
                    undelegation.txDate,
                    existedTotalLockingDays,
                  )
                : this.calcLeftDaysByPrevEpoch(
                    undelegation.txDate,
                    prevEpochDate,
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

  public async getMyActiveStaking(
    usdPrice: BigNumber,
  ): Promise<IActiveStakingData[]> {
    const provider = await this.getProvider();
    const latestBlockNumber = await provider.getBlockNumber();

    const [
      stakingContract,
      { lockPeriod },
      epochDuration,
      prevEpochDate,
      nextEpochDate,
      activeValidators,
      delegationHistory,
      apyData,
      stakingRewards,
    ] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getChainConfig(),
      this.getEpochDurationDays(),
      this.getEpochPrevDate(),
      this.getEpochNextDate(),
      this.getActiveValidators(),
      this.getDelegationHistory(
        {
          staker: this.currentAccount,
        },
        latestBlockNumber,
      ),
      this.getAPY(),
      this.getMyClaimableStakingRewards(),
    ]);

    const lockPeriodDays = lockPeriod * epochDuration;

    const apyMap = new Map(
      apyData.map(apyItem => [apyItem.validator, apyItem.apy]),
    );

    const rewardMap = new Map<string, BigNumber>(
      stakingRewards.map(reward => {
        return [reward.validator.validator, reward.amount];
      }),
    );

    const delegatingValidators = new Set(
      delegationHistory.map(delegation => delegation.validator),
    );
    const usingValidators = activeValidators.filter(validator =>
      delegatingValidators.has(validator.validator),
    );

    const delegationsArr = await Promise.all(
      activeValidators.map(validator =>
        stakingContract.methods
          .getValidatorDelegation(validator.validator, this.currentAccount)
          .call(),
      ),
    );
    const delegationsMap = new Map(
      delegationsArr.map((delegation, index) => {
        return [
          activeValidators[index].validator,
          this.convertFromWei(delegation.delegatedAmount),
        ];
      }),
    );

    const unlockedDelegationsArr = await Promise.all(
      activeValidators.map(validator =>
        this.getUnlockedDelegatedByValidator(
          validator.validator,
          latestBlockNumber,
        ),
      ),
    );
    const unlockedDelegationsMap = new Map(
      unlockedDelegationsArr.map((delegation, index) => {
        return [activeValidators[index].validator, delegation];
      }),
    );

    return usingValidators.reduce<IActiveStakingData[]>((result, validator) => {
      const existingDelegations = delegationHistory
        .filter(delegation => delegation.validator === validator.validator)
        .sort((a, b) => b.txDate.getTime() - a.txDate.getTime());

      const totalUnlocked =
        unlockedDelegationsMap.get(validator.validator) ?? ZERO;

      const unlockedRow: IAdditionalActiveStakingData = {
        lockingPeriod: 0,
        lockingPeriodPercent: 0,
        isUnlocked: true,
        stakeAmount: totalUnlocked,
        usdStakeAmount: totalUnlocked.multipliedBy(usdPrice),
        rewards: ZERO,
        usdRewards: ZERO,
      };
      const detailedData: IAdditionalActiveStakingData[] = [];

      if (existingDelegations.length > 1) {
        for (let i = 0; i < existingDelegations.length; i += 1) {
          const delegation = existingDelegations[i];

          const daysToFirst = Math.ceil(
            ((nextEpochDate.getTime() - delegation.txDate.getTime()) /
              (1000 * 60 * 60 * 24)) %
              7,
          );
          const totalLockingDays = lockPeriodDays + daysToFirst;
          const detailedDaysLeft = this.calcLeftDays(
            delegation.txDate,
            totalLockingDays,
          );

          if (detailedDaysLeft > 0) {
            detailedData.push({
              lockingPeriod: detailedDaysLeft,
              lockingPeriodPercent: Math.ceil(
                (detailedDaysLeft / totalLockingDays) * 100,
              ),
              isUnlocked: detailedDaysLeft <= 0,
              stakeAmount: this.convertFromWei(delegation.amount),
              usdStakeAmount: this.convertFromWei(
                delegation.amount,
              ).multipliedBy(usdPrice ?? ZERO),
              rewards: ZERO,
              usdRewards: ZERO,
            });
          }
        }
      }

      const totalDelegatedAmount =
        delegationsMap.get(validator.validator) ?? ZERO;

      if (!unlockedRow.stakeAmount.isZero()) {
        detailedData?.unshift(unlockedRow);
      }

      const rewards = rewardMap.get(validator.validator) ?? ZERO;
      if (detailedData?.length === 1 && detailedData[0].isUnlocked) {
        const activeStaking = {
          provider: validator.validator,
          apy: apyMap.get(validator.validator) ?? ZERO,
          isUnlocked: true,
          stakeAmount: totalDelegatedAmount,
          usdStakeAmount: totalDelegatedAmount.multipliedBy(usdPrice ?? ZERO),
          rewards,
          usdRewards: rewards.multipliedBy(usdPrice),
          status: EProviderStatus.active,
        } as IActiveStakingData;

        result.push(activeStaking);
      } else {
        const isOneDelegation = existingDelegations.length === 1;

        let daysLeft;
        let totalLockingDays = lockPeriodDays;

        if (isOneDelegation) {
          const delegateDate = existingDelegations[0].txDate;
          const diff = Math.abs(
            prevEpochDate.getTime() - delegateDate.getTime(),
          );
          const daysToStartFirstEpoch = Math.ceil(
            (diff / (1000 * 60 * 60 * 24)) % epochDuration,
          );
          totalLockingDays += daysToStartFirstEpoch;
          daysLeft = this.calcLeftDays(delegateDate, totalLockingDays);
        }

        const activeStaking = {
          provider: validator.validator,
          apy: apyMap.get(validator.validator) ?? ZERO,
          isUnlocked: daysLeft ? daysLeft <= 0 : false,
          isPartiallyUnlocked:
            detailedData?.length > 1 &&
            unlockedRow.stakeAmount.isGreaterThan(ZERO),
          lockingPeriod: daysLeft,
          lockingPeriodPercent: daysLeft
            ? Math.ceil((daysLeft / totalLockingDays) * 100)
            : undefined,
          stakeAmount: totalDelegatedAmount,
          usdStakeAmount: totalDelegatedAmount.multipliedBy(usdPrice ?? ZERO),
          rewards,
          usdRewards: rewards.multipliedBy(usdPrice),
          status: EProviderStatus.active,
          detailedData,
        } as IActiveStakingData;

        result.push(activeStaking);
      }

      return result;
    }, []);
  }

  private calcLeftDays(startDate: Date, lockPeriod: number): number {
    const now = new Date();
    const diffTime = Math.abs(startDate.getTime() - now.getTime());
    const pastDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return lockPeriod - pastDays;
  }

  private calcLeftDaysByPrevEpoch(
    startDate: Date,
    prevEpochDate: Date,
  ): number {
    const diffTime = startDate.getTime() - prevEpochDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  public async claimAll(): Promise<string> {
    const provider = await this.getProvider();

    const allValidatorsAddresses = await this.getAllValidatorsAddresses(
      await provider.getBlockNumber(),
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

  public async claimAllRewards(): Promise<string> {
    const [stakingContract, rewards] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getMyClaimableStakingRewards(),
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
    expiring: CACHE_TIME,
    hashFunction: (account: Web3Address, latestBlockNumber: number) => {
      return `${account}${latestBlockNumber}`;
    },
  })
  public async getAllEventsHistory(
    account: Web3Address,
    latestBlockNumber: number,
  ): Promise<IHistoryData[]> {
    const [delegation, undelegation, claim] = await Promise.all([
      this.getDelegationHistory({ staker: account }, latestBlockNumber),
      this.getUndelegationHistory({ staker: account }, latestBlockNumber),
      this.getClaimHistory({ staker: this.currentAccount }),
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
    expiring: CACHE_TIME,
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
    expiring: CACHE_TIME,
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
    expiring: CACHE_TIME,
    hashFunction: (validator: string, latestBlockNumber: number) => {
      return `${validator}${latestBlockNumber}`;
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
    expiring: CACHE_TIME,
    hashFunction: (validator: string, latestBlockNumber: number) => {
      return `${validator}${latestBlockNumber}`;
    },
  })
  public async getUnlockedDelegatedByValidator(
    validator: string,
    latestBlockNumber: number,
  ): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators(latestBlockNumber);

    if (!validators.some(val => val.validator === validator)) return ZERO;

    const delegation = await stakingContract.methods
      .calcUnlockedDelegatedAmount(validator, this.currentAccount)
      .call();

    return this.convertFromWei(delegation);
  }
}

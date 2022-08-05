import BigNumber from 'bignumber.js';
import prettyTime from 'pretty-time';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';

import {
  Address,
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ANKR_ABI, ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import {
  DEFAULT_ROUNDING,
  ETH_SCALE_FACTOR,
  isMainnet,
  ZERO,
} from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { EProviderStatus } from 'modules/stake-ankr/const';

import ANKR_TOKEN_STAKING_ABI from '../contracts/AnkrTokenStaking.json';
import STAKING_CONFIG_ABI from '../contracts/StakingConfig.json';

import { ANKR_PROVIDER_READ_ID, VALIDATOR_STATUS_MAPPING } from './const';
import {
  EAnkrEvents,
  IActiveStakingData,
  IAdditionalActiveStakingData,
  IChainConfig,
  IChainParams,
  IClaimableUnstake,
  IDelegatorDelegation,
  IDelegatorEventData,
  IHistoryData,
  ILockPeriod,
  IStakingReward,
  IUnstakingData,
  IValidator,
} from './types';
import { sortEventData } from './utils';

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
}

interface IReward {
  validator: string;
  amount: BigNumber;
}

interface IDelegationHistoryFilter {
  validator?: Web3Address;
  staker?: Web3Address;
}

export class AnkrStakingSDK {
  private static instance?: AnkrStakingSDK;

  private readonly writeProvider: Web3KeyWriteProvider;

  private currentAccount: string;

  private readonly readProvider: Web3KeyReadProvider;

  private constructor({
    readProvider,
    writeProvider,
  }: IAnkrStakingSDKProviders) {
    AnkrStakingSDK.instance = this;

    this.writeProvider = writeProvider;
    this.readProvider = readProvider;
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

  private async getProvider(): Promise<
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

  private async isEthNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      chainId,
    );
  }

  public async getAnkrBalance(): Promise<BigNumber> {
    const provider = await this.getProvider();
    const ankrContract = await this.getAnkrTokenContract();

    return provider.getErc20Balance(ankrContract, this.currentAccount);
  }

  private async getAnkrTokenContract() {
    const provider = await this.getProvider();
    return provider.createContract(ANKR_ABI, ankrToken);
  }

  public async getAllValidators(epoch?: number): Promise<IValidator[]> {
    const validators = await this.getAllValidatorsAddresses();

    return this.loadValidatorsInfo(validators, epoch);
  }

  public async getAllValidatorsAddresses(): Promise<Web3Address[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const validatorAddedEvents = await stakingContract.getPastEvents(
      EAnkrEvents.ValidatorAdded,
      {
        fromBlock: 'earliest',
        toBlock: 'latest',
      },
    );

    const validatorRemovedEvents = await stakingContract.getPastEvents(
      EAnkrEvents.ValidatorRemoved,
      {
        fromBlock: 'earliest',
        toBlock: 'latest',
      },
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

  private async getAnkrTokenStakingContract() {
    const provider = await this.getProvider();
    return provider.createContract(
      ANKR_TOKEN_STAKING_ABI,
      contractConfig.ankrTokenStaking,
    );
  }

  private async loadValidatorsInfo(
    validators: Web3Address[],
    epoch?: number,
  ): Promise<IValidator[]> {
    if (!epoch) {
      epoch = (await this.getChainParams()).epoch;
    }

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

  private async getStakingConfigContract() {
    const provider = await this.getProvider();
    return provider.createContract(
      STAKING_CONFIG_ABI,
      contractConfig.ankrStakingChainConfig,
    );
  }

  public async getActiveValidators(epoch?: number): Promise<IValidator[]> {
    const activeValidators = await this.getActiveValidatorsAddresses();
    return this.loadValidatorsInfo(activeValidators, epoch);
  }

  public async getActiveValidatorsAddresses(): Promise<Web3Address[]> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    return stakingContract.methods.getValidators().call();
  }

  private async loadValidatorInfo(
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

  /**
   * Also known as stake
   */
  public async delegate(
    validator: Web3Address,
    amount: BigNumber,
  ): Promise<string> {
    const stakingContract = await this.getAnkrTokenStakingContract();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

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

  private cachedChainConfig?: IChainConfig;

  public async getChainConfig(): Promise<IChainConfig> {
    if (this.cachedChainConfig) return this.cachedChainConfig;
    const stakingConfig = await this.getStakingConfigContract();
    // TODO: "i'll add method for fetching all these params"
    const [
      activeValidatorsLength,
      epochBlockInterval,
      misdemeanorThreshold,
      felonyThreshold,
      validatorJailEpochLength,
      undelegatePeriod,
      minValidatorStakeAmount,
      minStakingAmount,
      lockPeriod,
    ] = await Promise.all([
      stakingConfig.methods.getActiveValidatorsLength().call(),
      stakingConfig.methods.getEpochBlockInterval().call(),
      stakingConfig.methods.getMisdemeanorThreshold().call(),
      stakingConfig.methods.getFelonyThreshold().call(),
      stakingConfig.methods.getValidatorJailEpochLength().call(),
      stakingConfig.methods.getUndelegatePeriod().call(),
      stakingConfig.methods.getMinValidatorStakeAmount().call(),
      stakingConfig.methods.getMinStakingAmount().call(),
      stakingConfig.methods.getLockPeriod().call(),
    ]);
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

  public async getChainParams(): Promise<IChainParams> {
    const provider = await this.getProvider();
    const [blockNumber, contract] = await Promise.all([
      provider.getWeb3().eth.getBlockNumber(),
      this.getStakingConfigContract(),
    ]);

    const epochBlockInterval = await contract.methods
      .getEpochBlockInterval()
      .call();

    const epoch = epochBlockInterval
      ? Math.round(blockNumber / +epochBlockInterval)
      : 0;

    const endBlock = blockNumber + +epochBlockInterval;
    const blockTime = 15;

    return {
      blockNumber,
      epoch,
      nextEpochIn: prettyTime(
        (endBlock - blockNumber) * blockTime * 1000 * 1000 * 1000,
        's',
      ),
      nextEpochBlock: endBlock,
      blockTime,
    };
  }

  public async getMyClaimableStakingRewards(): Promise<IStakingReward[]> {
    return this.getAllClaimableStakingRewards(this.currentAccount);
  }

  public async getAllClaimableStakingRewards(
    delegator: Web3Address,
  ): Promise<IStakingReward[]> {
    const delegationHistory = await this.getDelegationHistory({
      staker: delegator,
    });
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

  public async getAllClaimableUnstakes(): Promise<IClaimableUnstake[]> {
    const allValidatorsAddresses = await this.getAllValidatorsAddresses();

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

    return delegatorFee.minus(stakingRewards);
  }

  public async claimAllUnstakes(): Promise<string> {
    const [stakingContract, unstakes] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getAllClaimableUnstakes(),
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

  public async getDelegationHistory(
    filter: Partial<IDelegationHistoryFilter> = {},
  ): Promise<IDelegatorDelegation[]> {
    const [stakingContract, provider] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getProvider(),
    ]);
    const web3 = provider.getWeb3();

    const events = await stakingContract.getPastEvents(EAnkrEvents.Delegated, {
      fromBlock: 'earliest',
      toBlock: 'latest',
      filter,
    });

    const calls = events.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks = await provider.executeBatchCalls<BlockTransactionObject>(
      calls,
    );

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

  public async getUnstaking(usdPrice: BigNumber): Promise<IUnstakingData[]> {
    const allClaimableUnstakes = await this.getAllClaimableUnstakes();
    let totalUnstakes = allClaimableUnstakes.reduce((acc, unstake) => {
      acc = acc.plus(unstake.amount);

      return acc;
    }, ZERO);

    const fullUndelegationHistory = await this.getUndelegationHistory({
      staker: this.currentAccount,
    });

    const unstakingPeriod = await this.getUnstakingPeriodDays();
    const prevEpochDate = await this.getEpochPrevDate();
    const nextEpochSeconds = await this.getEpochEndSeconds();

    const preparedData = fullUndelegationHistory.reduce<{
      list: IUnstakingData[];
      unlockedMap: Map<string, BigNumber>;
    }>(
      (result, undelegation) => {
        const daysLeft = this.calcDayLeft(undelegation.txDate, unstakingPeriod);

        const endDate = this.addDays(undelegation.txDate, unstakingPeriod);

        const isLockedByEpoch = endDate.getTime() >= prevEpochDate.getTime();
        if (daysLeft > 0 || isLockedByEpoch) {
          result.list.push({
            provider: undelegation.validator,
            unstakeAmount: this.convertFromWei(undelegation.amount),
            usdUnstakeAmount: this.convertFromWei(
              undelegation.amount,
            ).multipliedBy(usdPrice),
            daysLeft: isLockedByEpoch
              ? daysLeft + Math.ceil(nextEpochSeconds / 86_400)
              : daysLeft,
          });
        } else if (totalUnstakes.isGreaterThan(ZERO)) {
          const amount = result.unlockedMap.get(undelegation.validator) ?? ZERO;
          result.unlockedMap.set(
            undelegation.validator,
            amount.plus(this.convertFromWei(undelegation.amount)),
          );

          totalUnstakes = totalUnstakes.minus(amount);
        }

        return result;
      },
      { list: [], unlockedMap: new Map<string, BigNumber>() },
    );

    return [
      ...Array.from(preparedData.unlockedMap, ([name, value]) => ({
        provider: name,
        unstakeAmount: value,
        usdUnstakeAmount: value.multipliedBy(usdPrice),
        daysLeft: 0,
      })),
      ...preparedData.list,
    ];
  }

  public async getUndelegationHistory(
    filter: Partial<IDelegationHistoryFilter> = {},
  ): Promise<IDelegatorDelegation[]> {
    const [stakingContract, provider] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getProvider(),
    ]);
    const web3 = provider.getWeb3();

    const events = await stakingContract.getPastEvents(
      EAnkrEvents.Undelegated,
      {
        fromBlock: 'earliest',
        toBlock: 'latest',
        filter,
      },
    );

    const calls = events.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks =
      await this.writeProvider.executeBatchCalls<BlockTransactionObject>(calls);

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

  public async getClaimHistory(
    filter: { validator?: Web3Address; staker?: Web3Address } = {},
  ): Promise<IDelegatorDelegation[]> {
    const [stakingContract, provider] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getProvider(),
    ]);
    const web3 = provider.getWeb3();

    const events = await stakingContract.getPastEvents(EAnkrEvents.Claimed, {
      fromBlock: 'earliest',
      toBlock: 'latest',
      filter,
    });

    const calls = events.map(
      event => (callback: TWeb3BatchCallback<BlockTransactionObject>) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/ChainSafe/web3.js/issues/4655
        web3.eth.getBlock.request(event.blockHash, false, callback),
    );

    const blocks =
      await this.writeProvider.executeBatchCalls<BlockTransactionObject>(calls);

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
    apy: BigNumber,
  ): Promise<IActiveStakingData[]> {
    const [
      stakingContract,
      lockPeriod,
      nextEpochSeconds,
      prevEpochDate,
      activeValidators,
      delegationHistory,
      stakingRewards,
    ] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getLockingPeriodDays(),
      this.getEpochEndSeconds(),
      this.getEpochPrevDate(),
      this.getActiveValidators(),
      this.getDelegationHistory({
        staker: this.currentAccount,
      }),
      this.getMyClaimableStakingRewards(),
    ]);

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
        this.getUnlockedDelegatedByValidator(validator.validator),
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

      const delegatingDayLeft =
        existingDelegations.length > 1
          ? 0
          : this.calcDayLeft(existingDelegations[0].txDate, lockPeriod);

      const endDate =
        existingDelegations.length > 1
          ? undefined
          : this.addDays(existingDelegations[0].txDate, lockPeriod);

      const isLockedByEpoch = endDate
        ? endDate.getTime() >= prevEpochDate.getTime()
        : false;

      const daysLeft = isLockedByEpoch
        ? delegatingDayLeft + Math.ceil(nextEpochSeconds / 86_400)
        : delegatingDayLeft;

      const totalUnlocked =
        unlockedDelegationsMap.get(validator.validator) ?? ZERO;

      const unlockedRow: IAdditionalActiveStakingData = {
        lockingPeriod: 0,
        lockingPeriodPercent: 100,
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
          const detailedDelegatingDayLeft = this.calcDayLeft(
            delegation.txDate,
            lockPeriod,
          );
          const detailedEndDate = this.addDays(delegation.txDate, lockPeriod);

          const isDetailedLockedByEpoch =
            detailedEndDate.getTime() >= prevEpochDate.getTime();

          if (detailedDelegatingDayLeft > 0 || isDetailedLockedByEpoch) {
            const detailDaysLeft = isDetailedLockedByEpoch
              ? detailedDelegatingDayLeft + Math.ceil(nextEpochSeconds / 86_400)
              : detailedDelegatingDayLeft;

            detailedData.push({
              lockingPeriod: detailDaysLeft,
              lockingPeriodPercent: Math.ceil(
                ((lockPeriod - detailDaysLeft) / lockPeriod) * 100,
              ),
              isUnlocked: detailDaysLeft <= 0,
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
          apy,
          isUnlocked: true,
          stakeAmount: totalDelegatedAmount,
          usdStakeAmount: totalDelegatedAmount.multipliedBy(usdPrice ?? ZERO),
          rewards,
          usdRewards: rewards.multipliedBy(usdPrice),
          status: EProviderStatus.active,
        } as IActiveStakingData;

        result.push(activeStaking);
      } else {
        const activeStaking = {
          provider: validator.validator,
          apy,
          isUnlocked: daysLeft ? daysLeft <= 0 : false,
          isPartiallyUnlocked:
            detailedData?.length > 1 &&
            unlockedRow.stakeAmount.isGreaterThan(ZERO),
          lockingPeriod: daysLeft,
          lockingPeriodPercent: daysLeft
            ? Math.ceil(((lockPeriod - daysLeft) / lockPeriod) * 100)
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

  private calcDayLeft(startDate: Date, lockPeriod: number): number {
    const now = new Date();
    const diffTime = Math.abs(startDate.getTime() - now.getTime());
    const pastDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return lockPeriod - pastDays;
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  public async claimAll(): Promise<string> {
    const allValidatorsAddresses = await this.getAllValidatorsAddresses();
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

    const input = rewards.reduce<string[]>((acc, reward) => {
      if (reward.amount.isZero()) return acc;

      const data = stakingContract.methods
        .claimStakingRewards(reward.validator.validator)
        .encodeABI();

      acc.push(data);

      return [];
    }, []);

    const data = stakingContract.methods.multicall(input).encodeABI();

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

  public async getAllEventsHistory(): Promise<IHistoryData[]> {
    const [delegation, undelegation, claim] = await Promise.all([
      this.getDelegationHistory({ staker: this.currentAccount }),
      this.getUndelegationHistory({ staker: this.currentAccount }),
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

  public async approve(amount: BigNumber): Promise<boolean> {
    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return true;
    }

    const ankrTokenContract = await this.getAnkrTokenContract();

    const data = ankrTokenContract.methods
      .approve(
        contractConfig.ankrTokenStaking,
        convertNumberToHex(amount, ETH_SCALE_FACTOR),
      )
      .encodeABI();

    const { receiptPromise } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      ankrToken,
      { data },
    );

    const { status } = await receiptPromise;

    return status;
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
   * Get minimum stake amount.
   *
   * @public
   * @returns {Promise<BigNumber>}
   */
  public async getMinimumStake(): Promise<BigNumber> {
    const stakingConfig = await this.getStakingConfigContract();

    const minStake = await stakingConfig.methods.getMinStakingAmount().call();

    return this.convertFromWei(minStake);
  }

  /**
   * Fetch transaction data.
   *
   * @public
   * @note Parses first uint256 param from transaction input.
   * @param {string} txHash - transaction hash
   * @returns {Promise<IFetchTxData>}
   */
  public async fetchTxData(txHash: string): Promise<IFetchTxData> {
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
  public async getMyTotalDelegatedAmount(): Promise<BigNumber> {
    const [stakingContract, validators] = await Promise.all([
      this.getAnkrTokenStakingContract(),
      this.getAllValidators(),
    ]);

    const delegationsSet = await Promise.all(
      validators.map(validator =>
        stakingContract.methods
          .getValidatorDelegation(validator.validator, this.currentAccount)
          .call(),
      ),
    );

    let result = ZERO;
    delegationsSet.forEach(validatorDelegation => {
      result = result.plus(new BigNumber(validatorDelegation.delegatedAmount));
    });

    return result.dividedBy(ETH_SCALE_FACTOR);
  }

  /**
   * Get total delegated ANKR amount.
   *
   * @public
   * @returns {BigNumber}
   */
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
   * Get delegated ANKR amount for validator.
   *
   * @public
   * @param {string} validator - validator address
   * @returns {BigNumber}
   */
  public async getDelegatedAmountByValidator(
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
  public async getUnlockedDelegatedByValidator(
    validator: string,
  ): Promise<BigNumber> {
    const stakingContract = await this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators();

    if (!validators.some(val => val.validator === validator)) return ZERO;

    const delegation = await stakingContract.methods
      .calcUnlockedDelegatedAmount(validator, this.currentAccount)
      .call();

    return this.convertFromWei(delegation);
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

  public async getLockingPeriodDays(): Promise<number> {
    const { epochBlockInterval, lockPeriod } = await this.getChainConfig();
    const { blockTime } = await this.getChainParams();
    const lockingPeriodSec = lockPeriod * epochBlockInterval * blockTime;
    const lockingPeriodDays = lockingPeriodSec / (3600 * 24);
    return lockingPeriodDays;
  }

  public async getUnstakingPeriodDays(): Promise<number> {
    const { epochBlockInterval, undelegatePeriod } =
      await this.getChainConfig();
    const { blockTime } = await this.getChainParams();
    const unstakingPeriodSec =
      undelegatePeriod * epochBlockInterval * blockTime;
    const unstakingPeriodDays = unstakingPeriodSec / (3600 * 24);

    return unstakingPeriodDays;
  }

  public async getEpochEndSeconds(): Promise<number> {
    const { epochBlockInterval } = await this.getChainConfig();
    const { blockNumber, blockTime } = await this.getChainParams();

    const nextEpochBlock =
      (Math.trunc(blockNumber / epochBlockInterval || 0) + 1) *
      epochBlockInterval;

    return (nextEpochBlock - blockNumber) * blockTime;
  }

  private async getEpochPrevDate(): Promise<Date> {
    const { epochBlockInterval } = await this.getChainConfig();
    const { blockNumber, blockTime } = await this.getChainParams();

    const prevEpochBlock =
      (Math.trunc(blockNumber / epochBlockInterval || 0) + 1) *
        epochBlockInterval -
      epochBlockInterval;

    const now = new Date();

    return new Date(
      now.getTime() - (blockNumber - prevEpochBlock) * blockTime * 1_000,
    );
  }
}

import BigNumber from 'bignumber.js';
import prettyTime from 'pretty-time';
import { TransactionReceipt } from 'web3-core';
import { BlockTransactionObject } from 'web3-eth';

import {
  Address,
  EEthereumNetworkId,
  IWeb3SendResult,
  TWeb3BatchCallback,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ANKR_ABI, ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { ETH_SCALE_FACTOR, isMainnet, ZERO } from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';
import { EProviderStatus } from 'modules/stake-ankr/const';

import ANKR_TOKEN_STAKING_ABI from '../contracts/AnkrTokenStaking.json';
import STAKING_CONFIG_ABI from '../contracts/StakingConfig.json';

import { VALIDATOR_STATUS_MAPPING } from './const';
import {
  EAnkrEvents,
  IActiveStakingData,
  IChainConfig,
  IChainParams,
  IDelegatorDelegation,
  IDelegatorEventData,
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

  private constructor({ writeProvider }: IAnkrStakingSDKProviders) {
    AnkrStakingSDK.instance = this;

    this.writeProvider = writeProvider;
    this.currentAccount = this.writeProvider.currentAccount;
  }

  public static async getInstance(): Promise<AnkrStakingSDK> {
    const providerManager = ProviderManagerSingleton.getInstance();
    const writeProvider = await providerManager.getETHWriteProvider();

    const isActualAddress =
      AnkrStakingSDK.instance?.currentAccount === writeProvider.currentAccount;
    const isActualProvider =
      AnkrStakingSDK.instance?.writeProvider === writeProvider;

    if (AnkrStakingSDK.instance && isActualAddress && isActualProvider) {
      return AnkrStakingSDK.instance;
    }

    const instance = new AnkrStakingSDK({ writeProvider });
    const isEthNetwork = await instance.isEthNetwork(writeProvider);

    if (isEthNetwork && !writeProvider.isConnected()) {
      await writeProvider.connect();
    }

    return instance;
  }

  private async isEthNetwork(provider: Web3KeyWriteProvider): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [EEthereumNetworkId.mainnet, EEthereumNetworkId.goerli].includes(
      chainId,
    );
  }

  public async getAnkrBalance(): Promise<BigNumber> {
    const { writeProvider, currentAccount } = this;
    const ankrContract = this.getAnkrTokenContract();

    return writeProvider.getErc20Balance(ankrContract, currentAccount);
  }

  private getAnkrTokenContract() {
    return this.writeProvider.createContract(ANKR_ABI, ankrToken);
  }

  public async getAllValidators(epoch?: number): Promise<IValidator[]> {
    const validators = await this.getAllValidatorsAddresses();

    return this.loadValidatorsInfo(validators, epoch);
  }

  public async getAllValidatorsAddresses(): Promise<Web3Address[]> {
    const stakingContract = this.getAnkrTokenStakingContract();

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

  private getAnkrTokenStakingContract() {
    return this.writeProvider.createContract(
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

  private getStakingConfigContract() {
    return this.writeProvider.createContract(
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

  private async loadValidatorInfo(
    validator: Web3Address,
    epoch?: number,
  ): Promise<IValidator> {
    const stakingContract = this.getAnkrTokenStakingContract();

    const status = epoch
      ? await stakingContract.methods
          .getValidatorStatusAtEpoch(validator, epoch)
          .call()
      : await stakingContract.methods.getValidatorStatus(validator).call();

    return {
      validator,
      changedAt: status.changedAt,
      claimedAt: status.claimedAt,
      totalDelegated: status.totalDelegated,
      votingPower: 0,
      jailedBefore: status.jailedBefore,
      owner: status.ownerAddress,
      slashesCount: status.slashesCount,
      status: status.status,
      prettyStatus: VALIDATOR_STATUS_MAPPING[status.status] || 'UNKNOWN',
      commissionRate: status.commissionRate,
      totalRewards: status.totalRewards,
    };
  }

  /**
   * Also known as stake
   */
  public async delegate(
    validator: Web3Address,
    amount: BigNumber,
  ): Promise<string> {
    const stakingContract = this.getAnkrTokenStakingContract();

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
    const stakingConfig = this.getStakingConfigContract();
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
    const blockNumber = await this.writeProvider.getWeb3().eth.getBlockNumber();

    const epochBlockInterval = await this.getStakingConfigContract()
      .methods.getEpochBlockInterval()
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

  public async totalClaimableRewards(): Promise<BigNumber> {
    const allValidatorsAddresses = await this.getAllValidatorsAddresses();
    const delegatorsFee = await this.getDelegatorsFee(allValidatorsAddresses);

    return delegatorsFee.reduce((acc, delegatorFee) => {
      if (delegatorFee === '0') return acc;

      acc.plus(new BigNumber(delegatorFee).dividedBy(ETH_SCALE_FACTOR));

      return acc;
    }, ZERO);
  }

  public async getMyClaimableStakingRewards(): Promise<IStakingReward[]> {
    return this.getClaimableStakingRewards(this.currentAccount);
  }

  public async getClaimableStakingRewards(
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
            amount: reward.amount,
          };
        }
      }),
    );

    return Object.values(result);
  }

  public async getDelegationHistory(
    filter: Partial<IDelegationHistoryFilter> = {},
  ): Promise<IDelegatorDelegation[]> {
    const stakingContract = this.getAnkrTokenStakingContract();
    const web3 = this.writeProvider.getWeb3();

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

  public async getUnstaking(): Promise<IUnstakingData[]> {
    const undelegationHistory = await this.getUndelegationHistory();

    const unstakingPeriod = await this.getUnstakingPeriod();

    return undelegationHistory.map(undelegation => {
      const daysLeft = this.calcDayLeft(undelegation.txDate, unstakingPeriod);

      return {
        provider: undelegation.validator,
        unstakeAmount: this.convertFromWei(undelegation.amount),
        usdUnstakeAmount: ZERO,
        daysLeft,
      };
    });
  }

  public async getUndelegationHistory(
    filter: Partial<IDelegationHistoryFilter> = {},
  ): Promise<IDelegatorDelegation[]> {
    const stakingContract = this.getAnkrTokenStakingContract();
    const web3 = this.writeProvider.getWeb3();

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
    const stakingContract = this.getAnkrTokenStakingContract();

    return stakingContract.methods.getDelegatorFee(validator, delegator).call();
  }

  private getDelegatorsFee(addresses: string[]): Promise<string[]> {
    const stakingContract = this.getAnkrTokenStakingContract();

    const requests: Promise<string>[] = addresses.map(validatorAddress => {
      return stakingContract.methods
        .getDelegatorFee(validatorAddress, this.currentAccount)
        .call();
    });

    return Promise.all(requests);
  }

  public async getMyActiveStaking(): Promise<IActiveStakingData[]> {
    const lockPeriod = await this.getLockingPeriod();

    const activeValidators = await this.getActiveValidators();

    const delegationHistory = await this.getDelegationHistory({
      staker: this.currentAccount,
    });
    const delegatingValidators = new Set(
      delegationHistory.map(delegation => delegation.validator),
    );

    const usingValidators = activeValidators.filter(validator =>
      delegatingValidators.has(validator.validator),
    );

    return usingValidators.reduce<IActiveStakingData[]>((result, valitador) => {
      const existingDelegations = delegationHistory
        .filter(delegation => delegation.validator === valitador.validator)
        .sort((a, b) => b.txDate.getTime() - a.txDate.getTime());

      const delegatingDayLeft =
        existingDelegations.length > 1
          ? undefined
          : this.calcDayLeft(existingDelegations[0].txDate, lockPeriod);

      const detailedData =
        existingDelegations.length > 1
          ? existingDelegations.map(delegation => {
              const detailedDelegatingDayLeft = this.calcDayLeft(
                delegation.txDate,
                lockPeriod,
              );

              return {
                date: delegation.txDate,
                lockingPeriod: detailedDelegatingDayLeft,
                lockingPeriodPercent: Math.ceil(
                  ((lockPeriod - detailedDelegatingDayLeft) / lockPeriod) * 100,
                ),
                isUnlocked: detailedDelegatingDayLeft <= 0,
                stakeAmount: this.convertFromWei(delegation.amount),
                usdStakeAmount: ZERO,
                rewards: ZERO,
                usdRewards: ZERO,
              };
            })
          : undefined;

      const activeStaking = {
        provider: valitador.validator,
        apy: ZERO,
        isUnlocked: delegatingDayLeft ? delegatingDayLeft <= 0 : false,
        lockingPeriod: delegatingDayLeft,
        lockingPeriodPercent: delegatingDayLeft
          ? Math.ceil(((lockPeriod - delegatingDayLeft) / lockPeriod) * 100)
          : undefined,
        stakeAmount: ZERO,
        usdStakeAmount: ZERO,
        rewards: ZERO,
        usdRewards: ZERO,
        status: EProviderStatus.active,
        detailedData,
      };

      result.push(activeStaking);

      return result;
    }, []);
  }

  private calcDayLeft(startDate: Date, lockPeriod: number): number {
    const now = new Date();
    const diffTime = Math.abs(startDate.getTime() - now.getTime());
    const pastDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return lockPeriod - pastDays;
  }

  public async claimAllRewards(): Promise<string> {
    const stakingContract = this.getAnkrTokenStakingContract();
    const allValidatorsAddresses = await this.getAllValidatorsAddresses();
    const delegatorsFee = await this.getDelegatorsFee(allValidatorsAddresses);

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

  public async approve(amount: BigNumber): Promise<boolean> {
    const isAllowed = await this.checkAllowance(amount);

    if (isAllowed) {
      return true;
    }

    const ankrTokenContract = this.getAnkrTokenContract();

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
    const ankrTokenContract = this.getAnkrTokenContract();

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
    const stakingConfig = this.getStakingConfigContract();

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
    const amountHash = tx.input.slice(74, 138);

    const { 0: lockShares } = web3.eth.abi.decodeParameters(
      ['uint256'],
      amountHash,
    );

    return {
      amount: new BigNumber(web3.utils.fromWei(lockShares)),
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
  public async getTotalDelegatedAmount(): Promise<BigNumber> {
    const stakingContract = this.getAnkrTokenStakingContract();
    const validators = await this.getAllValidators();
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
   * Internal function to convert wei value to human readable format.
   *
   * @private
   * @param {string} amount - value in wei
   * @returns {BigNumber}
   */
  private convertFromWei(amount: string): BigNumber {
    return new BigNumber(this.writeProvider.getWeb3().utils.fromWei(amount));
  }

  // todo: need to verify
  public async getLockingPeriod(): Promise<number> {
    const { epochBlockInterval, lockPeriod } = await this.getChainConfig();
    const { blockTime } = await this.getChainParams();
    const lockingPeriodSec = lockPeriod * epochBlockInterval * blockTime;
    const lockingPeriodDays = lockingPeriodSec / (3600 * 24);

    return lockingPeriodDays;
  }

  public async getUnstakingPeriod(): Promise<number> {
    const { epochBlockInterval, undelegatePeriod } =
      await this.getChainConfig();
    const { blockTime } = await this.getChainParams();
    const unstakingPeriodSec =
      undelegatePeriod * epochBlockInterval * blockTime;
    const unstakingPeriodDays = unstakingPeriodSec / (3600 * 24);

    return unstakingPeriodDays;
  }
}

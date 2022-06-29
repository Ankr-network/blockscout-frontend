import BigNumber from 'bignumber.js';
import prettyTime from 'pretty-time';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { EEthereumNetworkId, Web3KeyWriteProvider } from 'provider';

import { configFromEnv } from 'modules/api/config';
import ABI_ANKR from 'modules/api/contract/ANKR.json';
import { ETH_SCALE_FACTOR, ZERO } from 'modules/common/const';
import { Web3Address } from 'modules/common/types';
import { convertNumberToHex } from 'modules/common/utils/numbers/converters';

import ANKR_TOKEN_STAKING_ABI from '../contracts/AnkrTokenStaking.json';
import STAKING_CONFIG_ABI from '../contracts/StakingConfig.json';

import { VALIDATOR_STATUS_MAPPING } from './const';
import {
  IChainConfig,
  IChainParams,
  IDelegatorDelegation,
  ILockPeriod,
  IValidator,
} from './types';
import { sortEventData } from './utils';

const config = configFromEnv();

interface IAnkrStakingSDKProviders {
  writeProvider: Web3KeyWriteProvider;
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
    return this.writeProvider.createContract(
      ABI_ANKR,
      config.contractConfig.ankrContract,
    );
  }

  public async getAllValidators(epoch?: number): Promise<IValidator[]> {
    const validators = await this.getAllValidatorsAddresses();

    return this.loadValidatorsInfo(validators, epoch);
  }

  public async getAllValidatorsAddresses(): Promise<Web3Address[]> {
    const stakingContract = this.getAnkrTokenStakingContract();

    const validatorAddedEvents = await stakingContract.getPastEvents(
      'ValidatorAdded',
      {
        fromBlock: 'earliest',
        toBlock: 'latest',
      },
    );

    const validatorRemovedEvents = await stakingContract.getPastEvents(
      'ValidatorRemoved',
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
      if (log.event === 'ValidatorAdded') {
        validators.add(validator);
      } else if (log.event === 'ValidatorRemoved') {
        validators.delete(validator);
      }
    });

    return Array.from(validators);
  }

  private getAnkrTokenStakingContract() {
    return this.writeProvider.createContract(
      ANKR_TOKEN_STAKING_ABI,
      config.contractConfig.ankrTokenStaking,
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
      config.contractConfig.ankrStakingChainConfig,
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
      config.contractConfig.ankrTokenStaking,
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
      minValidatorStakeAmount: new BigNumber(minValidatorStakeAmount).dividedBy(
        ETH_SCALE_FACTOR,
      ),
      minStakingAmount: new BigNumber(minStakingAmount).dividedBy(
        ETH_SCALE_FACTOR,
      ),
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

  private getDelegatorsFee(addresses: string[]): Promise<string[]> {
    const stakingContract = this.getAnkrTokenStakingContract();

    const requests: Promise<string>[] = addresses.map(validatorAddress => {
      return stakingContract.methods
        .getDelegatorFee(validatorAddress, this.currentAccount)
        .call();
    });

    return Promise.all(requests);
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
      config.contractConfig.ankrTokenStaking,
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
        config.contractConfig.ankrTokenStaking,
        convertNumberToHex(amount, ETH_SCALE_FACTOR),
      )
      .encodeABI();

    const { receiptPromise } = await this.writeProvider.sendTransactionAsync(
      this.currentAccount,
      config.contractConfig.ankrContract,
      { data },
    );

    const { status } = await receiptPromise;

    return status;
  }

  public async checkAllowance(amount: BigNumber): Promise<boolean> {
    const ankrTokenContract = this.getAnkrTokenContract();

    const allowance = await ankrTokenContract.methods
      .allowance(this.currentAccount, config.contractConfig.ankrTokenStaking)
      .call();

    const hexAmount = convertNumberToHex(amount, ETH_SCALE_FACTOR);

    return new BigNumber(allowance).isGreaterThanOrEqualTo(hexAmount);
  }
}

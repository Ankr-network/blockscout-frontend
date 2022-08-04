import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';

import { Seconds, Web3Address, Web3Uint256 } from 'modules/common/types';
import { EProviderStatus } from 'modules/stake-ankr/const';

export interface IChainConfig {
  activeValidatorsLength: number;
  epochBlockInterval: number;
  misdemeanorThreshold: number;
  felonyThreshold: number;
  validatorJailEpochLength: number;
  undelegatePeriod: number;
  minValidatorStakeAmount: BigNumber;
  minStakingAmount: BigNumber;
  lockPeriod: number;
}

export interface IChainParams {
  blockNumber: number;
  epoch: number;
  nextEpochBlock: number;
  nextEpochIn: string;
  blockTime: number;
}

export type TValidatorPrettyStatus =
  | 'NOT_FOUND'
  | 'ACTIVE'
  | 'PENDING'
  | 'JAILED'
  | 'UNKNOWN';

export interface IValidator {
  validator: Web3Address;
  owner: Web3Address;
  prettyStatus: TValidatorPrettyStatus;
  status: Web3Uint256;
  slashesCount: number;
  totalDelegated: BigNumber;
  votingPower: number;
  changedAt: number;
  jailedBefore: number;
  claimedAt: number;
  commissionRate: Web3Uint256;
  totalRewards: BigNumber;
}

export type IEventData = EventData;

export interface IDelegatorEventData extends EventData {
  timestamp: number;
}

export interface IDelegatorDelegation {
  event?: IEventData;
  validator: Web3Address;
  staker: Web3Address;
  amount: Web3Uint256;
  epoch: number;
  txDate: Date;
}

export interface IDelegatorUnDelegation {
  event?: IEventData;
  validator: Web3Address;
  staker: Web3Address;
  amount: Web3Uint256;
  epoch: number;
}

export interface IDelegatorClaim {
  event?: IEventData;
  validator: Web3Address;
  staker: Web3Address;
  amount: Web3Uint256;
  epoch: number;
}

export interface IDelegatorOneOfEvent {
  delegation?: IDelegatorDelegation;
  undelegation?: IDelegatorUnDelegation;
  claim?: IDelegatorClaim;
}

export interface ILockPeriod {
  isAvailable: boolean;
  availableAfterBlock: number;
  estimationTime: Seconds;
}

export interface IStakingReward {
  validator: IValidator;
  amount: BigNumber;
}

/**
 * Ankr contract events
 */
export enum EAnkrEvents {
  ValidatorAdded = 'ValidatorAdded',
  ValidatorRemoved = 'ValidatorRemoved',
  Delegated = 'Delegated',
  Undelegated = 'Undelegated',
  Claimed = 'Claimed',
  ValidatorDeposited = 'ValidatorDeposited',
}

export interface IAdditionalActiveStakingData {
  lockingPeriod: number;
  lockingPeriodPercent?: number;
  isUnlocked: boolean;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
}

export interface IActiveStakingData {
  provider: string;
  apy: BigNumber;
  isUnlocked: boolean;
  isPartiallyUnlocked: boolean;
  lockingPeriod?: number;
  lockingPeriodPercent?: number;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  detailedData?: IAdditionalActiveStakingData[];
  status: EProviderStatus;
}

export interface IUnstakingData {
  provider: string;
  unstakeAmount: BigNumber;
  usdUnstakeAmount: BigNumber;
  daysLeft: number;
}

export interface IHistoryData {
  date: Date;
  hash: string;
  link?: string;
  event?: string;
  amount: BigNumber;
}

export interface IClaimableUnstake {
  validator: string;
  amount: BigNumber;
}

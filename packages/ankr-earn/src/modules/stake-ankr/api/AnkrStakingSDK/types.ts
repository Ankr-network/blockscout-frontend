import BigNumber from 'bignumber.js';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import { Days, Web3Address, Web3Uint256 } from 'modules/common/types';

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
  epoch: number;
  nextEpochBlock: number;
  nextEpochIn: Days;
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

export interface IDelegatorEventData extends EventData {
  timestamp: number;
}

export interface IDelegatorDelegation {
  event?: EventData;
  validator: Web3Address;
  staker: Web3Address;
  amount: Web3Uint256;
  epoch: number;
  txDate: Date;
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

export interface IApyData {
  validator: string;
  apy: BigNumber;
}

/**
 * Internal params for getting past events
 */
export interface IGetPastEvents {
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep: number;
  filter?: Filter;
}

export interface IApproveResponse {
  isApproved: boolean;
  txHash?: string;
}

export interface IDelegation {
  amount: BigNumber;
  lockingPeriod: number;
  totalLockPeriod: number;
  isActive: boolean;
  isUnknownPeriod?: boolean;
}

export interface IActiveStakingByValidator {
  delegatedAmount: BigNumber;
  unlockedDelegatedByValidator: BigNumber;
  activeDelegations: IDelegation[];
  validator: Web3Address;
}

export interface IGetDaysLeft {
  totalDays: number;
  daysLeft: number;
}

export interface IDelegationQueueItem {
  amount: string;
  claimEpoch: string;
  epoch: string;
}

export interface IQueueHistoryItem {
  amount: string;
  fromEpoch: number;
}

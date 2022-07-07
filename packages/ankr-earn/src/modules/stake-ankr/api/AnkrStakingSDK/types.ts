import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';

import { Seconds, Web3Address, Web3Uint256 } from 'modules/common/types';

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
  totalDelegated: Web3Uint256;
  votingPower: number;
  changedAt: number;
  jailedBefore: number;
  claimedAt: number;
  commissionRate: Web3Uint256;
  totalRewards: Web3Uint256;
}

export type IEventData = EventData;

export interface IDelegatorDelegation {
  event?: IEventData;
  validator: Web3Address;
  staker: Web3Address;
  amount: Web3Uint256;
  epoch: number;
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

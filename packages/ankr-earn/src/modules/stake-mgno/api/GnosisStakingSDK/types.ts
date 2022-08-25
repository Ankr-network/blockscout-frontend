import BigNumber from 'bignumber.js';

import { Web3Address, Web3Uint256 } from 'modules/common/types';

import { EProviderStatus } from '../../const';

export interface IActiveStakingData {
  provider: string;
  apr: BigNumber;
  isUnlocked: boolean;
  slashingProtection: number;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  status: EProviderStatus;
}

export interface IHistoryData {
  date: Date;
  hash: string;
  link?: string;
  event?: string;
  provider: string;
  amount: BigNumber;
}

export interface IValidator {
  validator: Web3Address;
  owner: Web3Address;
  prettyStatus: string;
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

export interface IStakingReward {
  validator: IValidator;
  amount: BigNumber;
}

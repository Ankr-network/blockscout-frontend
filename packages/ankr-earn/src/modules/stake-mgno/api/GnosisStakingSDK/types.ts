import BigNumber from 'bignumber.js';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import { Web3Address, Web3Uint256 } from 'modules/common/types';

import { EProviderStatus } from '../../const';

export enum EGnosisEvents {
  StakePending = 'StakePending',
  StakedPool = 'StakedPool',
  StakePushed = 'StakePushed',
}

export enum EGnosisEventsMap {
  Stake = 'Stake',
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

export interface IDelegationHistoryFilter {
  validator?: Web3Address;
  staker?: Web3Address;
}

export interface IActiveStakingData {
  provider: string;
  providerName: string;
  apr: BigNumber;
  slashingProtection: BigNumber;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  tips: BigNumber;
  usdTips: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  status?: EProviderStatus;
}

export interface IHistoryData {
  date: Date;
  hash: string;
  link?: string;
  event?: string;
  provider: string;
  amount: BigNumber;
}

export interface IProvider {
  provider: Web3Address;
  providerName: string;
  nodeKeys: number;
  status: Web3Uint256;
  slashingProtection: BigNumber;
  insurancePool: BigNumber;
  staked: BigNumber;
  available: BigNumber;
  apr: BigNumber;
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

export interface IFetchTxData {
  amount?: BigNumber;
  isPending: boolean;
  provider: string;
  destinationAddress?: string;
}

interface IProviderItem {
  address: string;
  chain: string;
  commission: number;
  info: string;
  name: string;
  timestamp: number;
  totalKeys: number;
  usedKeys: number;
}

export interface IProviderStats {
  provider: IProviderItem;
  apr: string;
  stakers: number;
}

export interface IProvidersStakedData {
  totalStaked: BigNumber[];
  availableToStake: BigNumber[];
}

export interface IProviderStakedData {
  totalStaked: BigNumber;
  availableToStake: BigNumber;
}

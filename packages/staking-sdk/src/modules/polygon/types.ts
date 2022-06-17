import BigNumber from 'bignumber.js';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import { Web3KeyReadProvider, Web3KeyWriteProvider } from 'provider';

export type TMaticSyntToken = 'aMATICc' | 'aMATICb';

export enum EPolygonPoolEvents {
  MaticClaimPending = 'MaticClaimPending',
  StakePendingV2 = 'StakePendingV2',
  StakeAndClaimBonds = 'stakeAndClaimBonds',
  StakeAndClaimCerts = 'stakeAndClaimCerts',
  IsRebasing = 'IsRebasing',
  TokensBurned = 'TokensBurned',
}

export enum EPolygonPoolEventsMap {
  Unstaking = 'STAKE_ACTION_UNSTAKED',
  Staking = 'STAKE_ACTION_STAKED',
}

export interface IEventsBatch {
  stakeRawEvents: EventData[];
  unstakeRawEvents: EventData[];
  ratio: BigNumber;
}

export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

export interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

export interface IPolygonSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

export interface IGetPastEvents {
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep: number;
  filter?: Filter;
}

export interface ILockSharesArgs {
  amount: BigNumber;
}

export interface IUnlockSharesArgs {
  amount: BigNumber;
}

export enum EErrorCodes {
  ZERO_AMOUNT = 'zero-amount',
}

import BigNumber from 'bignumber.js';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import { Web3KeyReadProvider, Web3KeyWriteProvider } from 'provider';

/**
 * Available tokens for PolygonSDK
 */
export type TMaticSyntToken = 'aMATICc' | 'aMATICb';

/**
 * Polygon pool contract events
 */
export enum EPolygonPoolEvents {
  MaticClaimPending = 'MaticClaimPending',
  StakePendingV2 = 'StakePendingV2',
  StakeAndClaimBonds = 'stakeAndClaimBonds',
  StakeAndClaimCerts = 'stakeAndClaimCerts',
  IsRebasing = 'IsRebasing',
  TokensBurned = 'TokensBurned',
}

/**
 * Transaction types for history
 */
export enum EPolygonPoolEventsMap {
  Unstaking = 'STAKE_ACTION_UNSTAKED',
  Staking = 'STAKE_ACTION_STAKED',
}

/**
 * Internal raw data for history events
 */
export interface IEventsBatch {
  stakeRawEvents: EventData[];
  unstakeRawEvents: EventData[];
  ratio: BigNumber;
}

/**
 * Transaction data information
 */
export interface IGetTxData {
  amount: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
}

/**
 * Event data with block timestamp
 */
export interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

/**
 * Internal providers for PolygonSDK initializator
 */
export interface IPolygonSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
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

/**
 * Lock shares args
 */
export interface ILockSharesArgs {
  amount: BigNumber;
  scale?: number;
}

/**
 * Unlock shares args
 */
export interface IUnlockSharesArgs {
  amount: BigNumber;
  scale?: number;
}

/**
 * Error codes for PolygonSDK
 */
export enum EErrorCodes {
  ZERO_AMOUNT = 'zero-amount',
}

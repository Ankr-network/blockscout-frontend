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
 * Internal providers for PolygonSDK initializator
 */
export interface IPolygonSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

/**
 * Error codes for PolygonSDK
 */
export enum EPolygonErrorCodes {
  ZERO_AMOUNT = 'zero-amount',
}

/**
 * Unstake fee data
 */
export interface IUnstakeFeeData {
  unstakeFee: string;
  useBeforeBlock: number;
  signature: string;
}

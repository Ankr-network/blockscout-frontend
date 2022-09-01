import { Web3KeyReadProvider, Web3KeyWriteProvider } from '@ankr.com/provider';

/**
 * Available tokens for MaticSDK
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
 * Internal providers for MaticSDK initializator
 */
export interface IMaticSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

/**
 * Error codes for MaticSDK
 */
export enum EMaticSDKErrorCodes {
  INSUFFICIENT_BALANCE = 'insufficient-balance',
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

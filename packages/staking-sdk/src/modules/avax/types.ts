import {
  Web3KeyReadProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';

/**
 * Avalanche pool contract events
 */
export enum EAvalanchePoolEvents {
  AvaxClaimPending = 'AvaxClaimPendingV2',
  StakePending = 'StakePendingV2',
}

/**
 * Transaction types for history
 */
export enum EAvalanchePoolEventsMap {
  AvaxClaimPending = 'STAKE_ACTION_UNSTAKED',
  StakePending = 'STAKE_ACTION_STAKED',
}

/**
 * Internal providers for AvalancheSDK initializator
 */
export interface IAvalancheSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

/**
 * Error codes for AvalancheSDK
 */
export enum EAvalancheErrorCodes {
  ZERO_AMOUNT = 'zero-amount',
}

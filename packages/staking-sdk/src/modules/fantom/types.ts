import { Web3KeyReadProvider, Web3KeyWriteProvider } from '@ankr.com/provider';

/**
 * Available tokens for FantomSDK
 */
export type TFtmSyntToken = 'aFTMb' | 'aFTMc';

/**
 * Internal providers for FantomSDK initializator
 */
export interface IFantomSDKProviders {
  writeProvider: Web3KeyWriteProvider;
  readProvider: Web3KeyReadProvider;
}

/**
 * Unstaking type from API
 */
export type TUnstakingStatsType = 'bond' | 'cert' | 'all';

/**
 * Transaction types for history
 */
export enum EFantomPoolEvents {
  TokensBurned = 'TokensBurned2',
  Withdrawn = 'Withdrawn',
  StakeReceived = 'StakeReceived2',
}

import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider, Web3KeyWriteProvider } from 'provider';

/**
 * Available tokens for BinanceSDK
 */
export type TBnbSyntToken = 'aBNBb' | 'aBNBc';

/**
 * Binance pool contract events
 */
export enum EBinancePoolEvents {
  RatioUpdated = 'RatioUpdated',
  Staked = 'Staked',
  UnstakePending = 'UnstakePending',
  IsRebasing = 'isRebasing',
}

/**
 * Transaction types for history
 */
export enum EBinancePoolEventsMap {
  Staked = 'STAKE_ACTION_STAKED',
  UnstakePending = 'STAKE_ACTION_UNSTAKED',
}

/**
 * Transaction receipt data
 */
export interface IGetTxReceipt extends TransactionReceipt {
  certAmount?: string;
}

/**
 * Internal providers for BinanceSDK initializator
 */
export interface IBinanceSDKProviders {
  readProvider: Web3KeyReadProvider;
  writeProvider: Web3KeyWriteProvider;
}

/**
 * Error codes for BinanceSDK
 */
export enum EBinanceErrorCodes {
  ZERO_AMOUNT = 'zero-amount',
}

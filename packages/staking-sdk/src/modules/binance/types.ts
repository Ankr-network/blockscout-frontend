import { TransactionReceipt } from 'web3-core';

import { Web3KeyReadProvider, Web3KeyWriteProvider } from '@ankr.com/provider';

import { AVAILABLE_BNB_SYNT_TOKENS } from './const';

/**
 * Available tokens for BinanceSDK
 */
export type TBnbSyntToken = typeof AVAILABLE_BNB_SYNT_TOKENS[number];

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
 * Binance partners contract events
 */
 export enum EBinancePartnersEvents {
  RewardsClaimed = 'RewardsClaimed',
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
  LOW_BALANCE_FOR_GAS_FEE = 'low-balance-for-gas-fee',
  UNSUPPORTED_TOKEN = 'unsupported-token',
  ZERO_AMOUNT = 'zero-amount',
}

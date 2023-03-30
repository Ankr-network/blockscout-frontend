import BigNumber from 'bignumber.js';
import { EventData } from 'web3-eth-contract';

import { Address } from '@ankr.com/provider';

import { Env } from './env';

export interface ICommonProps<T> {
  env?: Env;
  provider: T;
}

export interface IStakeProps<T> {
  address: Address;
  amount: BigNumber;
  env?: Env;
  provider: T;
  scale?: number;
}

export interface IStakeGasFeeProps<T> {
  address: Address;
  amount: BigNumber;
  env?: Env;
  provider: T;
  scale?: number;
}

export interface ITokenBalanceProps<T> {
  address: Address;
  env?: Env;
  provider: T;
}

export interface ITxEventsHistoryRangeProps<T> {
  address: Address;
  env?: Env;
  from: number;
  provider: T;
  to: number;
  isUnstakeOnly?: boolean;
}

export interface IWeb3BalanceProps<T> {
  address: Address;
  provider: T;
}

export interface IWeb3LatestBlockNumberProps<T> {
  provider: T;
}

export interface IWeb3ReadableAmountFromWeiProps<T> {
  amount: string;
  provider: T;
}

export interface IWeb3TxEventsHistoryGroupProps<T> {
  provider: T;
  rawEvents?: EventData[];
}

export interface IWeb3TxInfoProps<T> {
  provider: T;
  txHash: string;
}

export enum ESDKErrorCodes {
  INSUFFICIENT_BALANCE = 'insufficient-balance',
  INVALID_AMOUNT = 'invalid-amount',
  ZERO_AMOUNT = 'zero-amount',
}

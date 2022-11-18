import { Address } from '@ankr.com/provider-core';

import { Env } from './env';

export interface ICommonProps<T> {
  env?: Env;
  provider: T;
}

export interface IWeb3BalanceProps<T> {
  address: Address;
  provider: T;
}

export interface IWeb3ReadableAmountFromWeiProps<T> {
  amount: string;
  provider: T;
}

export enum ESDKErrorCodes {
  INSUFFICIENT_BALANCE = 'insufficient-balance',
  INVALID_AMOUNT = 'invalid-amount',
}

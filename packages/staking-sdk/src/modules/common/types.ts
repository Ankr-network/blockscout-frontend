import { Address } from '@ankr.com/provider-core';

import { Env } from './env';

export interface ICommonProps<T> {
  env?: Env;
  provider: T;
}

export interface IETHBalanceProps<T> {
  address: Address;
  provider: T;
}

export enum ESDKErrorCodes {
  INSUFFICIENT_BALANCE = 'insufficient-balance',
  INVALID_AMOUNT = 'invalid-amount',
}

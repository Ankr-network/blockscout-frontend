import { Address } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { Days } from '../types';

export const ZERO_DECIMAL_PLACES = 0;
export const DEFAULT_ROUNDING = 2;
export const DEFAULT_FIXED = 4;
export const DECIMAL_PLACES = 4;
export const ETH_DECIMALS = 18;
export const ETH_SCALE_FACTOR = 10 ** ETH_DECIMALS;

export const ACTION_CACHE_SEC = 600;

export const OPENOCEAN_MAX_SAFE_GAS_VALUE = 300; // Note: "5_000" is a maximum

export const ZERO_ADDR: Address = '0x0000000000000000000000000000000000000000';
export const ZERO = new BigNumber(0);
export const ONE = new BigNumber(1);
export const ONE_ETH = new BigNumber(ETH_SCALE_FACTOR);
export const MAX_UINT256 = new BigNumber(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);
export const ZERO_EVENT_HASH =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
export const DAYS_IN_YEAR: Days = 365;

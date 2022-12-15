import BigNumber from 'bignumber.js';

export const DEFAULT_USD_VALUE = 10;

export const DEFAULT_USD_VALUE_STRING = new BigNumber(
  DEFAULT_USD_VALUE,
).toString(10);

export const USD_CURRENCY = 'USD';

export const MAX_USD_DECIMALS = 1;

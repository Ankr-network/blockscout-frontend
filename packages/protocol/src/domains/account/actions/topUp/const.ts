import BigNumber from 'bignumber.js';

export enum TopUpStep {
  start,
  allowance,
  deposit,
  waitTransactionConfirming,
  login,
}

export const DEFAULT_ANKR_VALUE = new BigNumber(1_000);

export const DEFAULT_ANKR_VALUE_STRING = DEFAULT_ANKR_VALUE.toString(10);

export const ANKR_CURRENCY = 'ANKR';

export const PRICING_LINK =
  'https://www.ankr.com/docs/build-blockchain/pricing-plans/';

export const ETH_BLOCK_TIME = 10_000;

export const ANKR_MAX_DECIMALS = 1;

export const ANKR_MAX_DIGITS = 15;

import BigNumber from 'bignumber.js';

export enum TopUpStep {
  start,
  allowance,
  deposit,
  waitTransactionConfirming,
  login,
}

export const DEFAULT_ANKR_VALUE = new BigNumber(1_000);

export const ETH_BLOCK_TIME = 10_000;

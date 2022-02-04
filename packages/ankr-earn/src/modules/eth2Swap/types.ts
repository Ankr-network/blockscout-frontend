import BigNumber from 'bignumber.js';

export type TSwapOption = 'aETHb' | 'aETHc';

export interface ISwapFormPayload {
  amount?: string;
}

export interface IFeeAndTotal {
  fee: BigNumber;
  total: BigNumber;
}

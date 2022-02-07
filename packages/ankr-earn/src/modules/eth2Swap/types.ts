import BigNumber from 'bignumber.js';

export type TSwapOption = 'aETHb' | 'aETHc';

export interface ISwapFormPayload {
  amount?: string;
}

export interface IFeeAndTotal {
  fee: BigNumber;
  total: BigNumber;
}

export interface IFeeAndAmount {
  amount: BigNumber;
  feeBP: BigNumber;
}

export interface ISuccessPathParams {
  txHash: string;
  swapOption: TSwapOption;
}

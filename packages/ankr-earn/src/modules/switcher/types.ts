import BigNumber from 'bignumber.js';

import { TEthToken } from 'modules/api/EthSDK';

export type TSwapOption = TEthToken;

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

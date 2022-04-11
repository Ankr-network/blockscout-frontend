import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

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
  from: Token;
  to: Token;
}

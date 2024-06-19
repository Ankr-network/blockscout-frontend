import BigNumber from 'bignumber.js';

import { IFeeDetails } from 'modules/payments/types';

export interface IGetFeeDetailsParams {
  fee: number;
  price: string;
}

export const getFeeDetails = ({
  fee,
  price,
}: IGetFeeDetailsParams): IFeeDetails => ({
  feeCrypto: fee,
  feeUSD: new BigNumber(fee).multipliedBy(price).toNumber(),
});

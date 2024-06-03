import BigNumber from 'bignumber.js';

import { USD_FEE_DECIMALS } from '../const';

export interface IRoundUsdFeeParams {
  feeUSD: number;
}

export const roundUsdFee = ({ feeUSD }: IRoundUsdFeeParams) => {
  return new BigNumber(feeUSD)
    .decimalPlaces(USD_FEE_DECIMALS, BigNumber.ROUND_UP)
    .toNumber();
};

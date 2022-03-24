import BigNumber from 'bignumber.js';

import { IFeeAndTotal } from 'modules/eth2Swap/types';

export interface ICalcFeeAndTotalData {
  feeBP: BigNumber;
  amount: BigNumber;
}

export const calcFeeAndTotal = ({
  feeBP,
  amount,
}: ICalcFeeAndTotalData): IFeeAndTotal => {
  const fee = amount.multipliedBy(feeBP).div(10_000);

  return { fee, total: amount.minus(fee) };
};

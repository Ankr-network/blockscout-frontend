import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES } from '../../common/const';

interface IGetFlashUnstakeAmountWithFeeArgs {
  fee: BigNumber;
  amount: BigNumber;
  ratio: BigNumber;
}

export const getFlashUnstakeAmountWithFee = ({
  fee,
  amount,
  ratio,
}: IGetFlashUnstakeAmountWithFeeArgs): string => {
  const calculatedFee = fee.dividedBy(100);
  const bnbAmount = amount.dividedBy(ratio);
  return bnbAmount
    .minus(bnbAmount.multipliedBy(calculatedFee))
    .decimalPlaces(DECIMAL_PLACES)
    .toFormat();
};

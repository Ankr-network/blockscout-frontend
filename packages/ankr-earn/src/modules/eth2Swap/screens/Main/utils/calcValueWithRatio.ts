import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES, ETH_SCALE_FACTOR } from 'modules/common/const';
import { TSwapOption } from 'modules/eth2Swap/types';

export interface ICalcValueWithRatioData {
  total: BigNumber;
  ratio: BigNumber;
  swapOption: TSwapOption;
}

export const calcValueWithRatio = ({
  total,
  ratio,
  swapOption,
}: ICalcValueWithRatioData): BigNumber => {
  const amount = total.multipliedBy(ETH_SCALE_FACTOR);

  if (!ratio.isZero() && swapOption === 'aETHc') {
    return amount.dividedBy(ratio).decimalPlaces(DECIMAL_PLACES);
  }

  return amount
    .multipliedBy(ratio)
    .dividedBy(ETH_SCALE_FACTOR)
    .dividedBy(ETH_SCALE_FACTOR)
    .decimalPlaces(DECIMAL_PLACES);
};

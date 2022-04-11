import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES, ETH_SCALE_FACTOR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

export interface ICalcValueWithRatioData {
  total: BigNumber;
  ratio: BigNumber;
  from: Token;
}

export const calcValueWithRatio = ({
  total,
  ratio,
  from,
}: ICalcValueWithRatioData): BigNumber => {
  const amount = total.multipliedBy(ETH_SCALE_FACTOR);

  if (!ratio.isZero() && from === Token.aETHc) {
    return amount.dividedBy(ratio).decimalPlaces(DECIMAL_PLACES);
  }

  return amount
    .multipliedBy(ratio)
    .dividedBy(ETH_SCALE_FACTOR)
    .dividedBy(ETH_SCALE_FACTOR)
    .decimalPlaces(DECIMAL_PLACES);
};

import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { SWITCHER_TO_TOKENS } from 'modules/switcher/const';

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
  if (!ratio.isZero() && SWITCHER_TO_TOKENS.includes(from)) {
    return total.dividedBy(ratio).decimalPlaces(DECIMAL_PLACES);
  }

  return total.multipliedBy(ratio).decimalPlaces(DECIMAL_PLACES);
};

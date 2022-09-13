import BigNumber from 'bignumber.js';

import {
  DECIMAL_PLACES,
  DEFAULT_ROUNDING,
  ZERO_DECIMAL_PLACES,
} from 'modules/common/const';

import { BigNumberish } from './converters';

const BIG_NUMBER_LENGTH = 7;
const VERY_BIG_NUMBER_LENGTH = 9;

/**
 * Returns conditional decimal places according to amount argument
 *
 *  ```ts
 * getDecimalPlaces()                       // 4
 * getDecimalPlaces(999_000.984328923)      // 4
 * getDecimalPlaces(1_000_000.3465)         // 2
 * getDecimalPlaces(1_000_000_000.5435645)  // 0
 * ```
 *
 * @param [amount]  string | number | BigNumber.
 */
export const getDecimalPlaces = (amount: BigNumberish = 0): number => {
  const absNumber = Math.abs(+amount);
  const readyAmount = new BigNumber(absNumber);

  const { length } = readyAmount.decimalPlaces(ZERO_DECIMAL_PLACES).toString();

  const isRegularNumber = length < BIG_NUMBER_LENGTH;
  if (isRegularNumber) {
    return DECIMAL_PLACES;
  }

  const isVeryBigNumber = length >= VERY_BIG_NUMBER_LENGTH;
  if (isVeryBigNumber) {
    return 0;
  }

  return DEFAULT_ROUNDING;
};

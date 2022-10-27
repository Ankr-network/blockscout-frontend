import BigNumber from 'bignumber.js';

import { BIG_NUMBER_LENGTH, DECIMAL_PLACES, DEFAULT_ROUNDING, VERY_BIG_NUMBER_LENGTH, ZERO_DECIMAL_PLACES } from './const';

// eslint-disable-next-line func-names
BigNumber.prototype.round = function () {
  const value = this.valueOf();

  const absNumber = Math.abs(+value);
  const readyAmount = new BigNumber(absNumber);

  const { length } = readyAmount.decimalPlaces(ZERO_DECIMAL_PLACES).toString();

  const isRegularNumber = length < BIG_NUMBER_LENGTH;
  if (isRegularNumber) {
    return this.decimalPlaces(DECIMAL_PLACES);
  }

  const isVeryBigNumber = length >= VERY_BIG_NUMBER_LENGTH;
  if (isVeryBigNumber) {
    return this.decimalPlaces(0);
  }

  return this.decimalPlaces(DEFAULT_ROUNDING);
};

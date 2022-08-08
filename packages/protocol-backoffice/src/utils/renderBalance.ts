import BigNumber from 'bignumber.js';

const MAX_DECIMALS_LENGTH = 2;
const MIN_DISPLAY_BALANCE = 0.01;

export const renderBalance = (value = '') => {
  const amount = new BigNumber(value);

  const absBalance = amount.absoluteValue();

  return absBalance.isLessThan(MIN_DISPLAY_BALANCE)
    ? amount.precision(1).toFormat()
    : amount.toFormat(MAX_DECIMALS_LENGTH);
};

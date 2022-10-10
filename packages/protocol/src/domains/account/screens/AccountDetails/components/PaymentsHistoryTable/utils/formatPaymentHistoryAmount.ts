import BigNumber from 'bignumber.js';

import { getDecimalPlaces } from './getDecimalPlaces';

export const formatPaymentHistoryAmount = (
  amount: string,
  minDecimalPlaces: number,
  maxDecimalPlaces: number,
) => {
  if (amount === '') return '';

  const value = new BigNumber(amount);

  const decimalPlaces = getDecimalPlaces(
    value,
    minDecimalPlaces,
    maxDecimalPlaces,
  );

  return value.toFormat(decimalPlaces, 0);
};

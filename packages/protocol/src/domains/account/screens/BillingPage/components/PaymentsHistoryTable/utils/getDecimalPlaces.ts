import BigNumber from 'bignumber.js';

export const getDecimalPlaces = (
  value: BigNumber,
  minDecimalPlaces: number,
  maxDecimalPlaces: number,
): number => {
  const decimalPlaces = value.decimalPlaces();

  if (decimalPlaces <= minDecimalPlaces) {
    return minDecimalPlaces;
  }

  if (decimalPlaces >= maxDecimalPlaces) {
    return maxDecimalPlaces;
  }

  return decimalPlaces;
};

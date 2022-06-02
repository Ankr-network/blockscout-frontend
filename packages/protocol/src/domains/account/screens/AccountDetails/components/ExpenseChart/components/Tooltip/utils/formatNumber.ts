import BigNumber from 'bignumber.js';

import { ChartCurrency } from '../../../types';

const MIN_ANKR_DECIMAL_PLACES = 2;
const MAX_ANKR_DECIMAL_PLACES = 5;

const MIN_USD_DECIMAL_PLACES = 2;
const MAX_USD_DECIMAL_PLACES = 7;

const decimalPlacesMap: Record<ChartCurrency, [number, number]> = {
  [ChartCurrency.ANKR]: [MIN_ANKR_DECIMAL_PLACES, MAX_ANKR_DECIMAL_PLACES],
  [ChartCurrency.USD]: [MIN_USD_DECIMAL_PLACES, MAX_USD_DECIMAL_PLACES],
};

const getDecimalPlaces = (
  value: BigNumber,
  currency: ChartCurrency,
): number => {
  const decimalPlaces = value.decimalPlaces();

  const [min, max] = decimalPlacesMap[currency];

  if (decimalPlaces <= min) {
    return min;
  }

  if (decimalPlaces >= max) {
    return max;
  }

  return decimalPlaces;
};

export const formatNumber = (
  amount: string | number = 0,
  currency: ChartCurrency,
) => {
  const value = new BigNumber(amount);

  const decimalPlaces = getDecimalPlaces(value, currency);

  return value.toFormat(decimalPlaces, 0);
};

import { TopUpCurrency } from '../types';

export const isUSD = (currency: TopUpCurrency) =>
  currency === TopUpCurrency.USD;

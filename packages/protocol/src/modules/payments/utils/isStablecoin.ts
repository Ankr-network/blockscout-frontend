import { ECurrency, TStablecoinCurrency } from '../types';
import { stablecoinCurrencies } from '../const';

export const isStablecoin = (
  currency: ECurrency,
): currency is TStablecoinCurrency =>
  stablecoinCurrencies.includes(currency as TStablecoinCurrency);

import { ECurrency } from '../types';

export const isStableCoinCurrency = (currency?: ECurrency) => {
  return currency === ECurrency.USDT || currency === ECurrency.USDC;
};

import { ECurrency } from 'modules/payments/types';

export interface ISelectStablecoinOption {
  value: ECurrency;
  label: string;
}

export const STABLECOINS_OPTIONS: ISelectStablecoinOption[] = [
  {
    label: ECurrency.USDT,
    value: ECurrency.USDT,
  },
  {
    label: ECurrency.USDC,
    value: ECurrency.USDC,
  },
];

// If users make a payment in ANKR, they get 10% more requests
export const ANKR_PROMO_EXTRA_REQUESTS_RATE = 1.1;

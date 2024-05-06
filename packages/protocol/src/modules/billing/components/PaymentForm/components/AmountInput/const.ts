import { ECurrency } from 'modules/billing/types';

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

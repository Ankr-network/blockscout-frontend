import { ECurrency, IAmount } from 'modules/billing/types';

export const AMOUNTS_COLUMNS = 6;

export const DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT = 50;

export const DEFAULT_SELECTED_ONE_TIME_ANKR_AMOUNT = 2_000;

export const ONE_TIME_PAYMENT_USD_AMOUNTS: IAmount[] = [
  {
    id: '10',
    currency: ECurrency.USD,
    value: 10,
  },
  {
    id: '50',
    currency: ECurrency.USD,
    value: 50,
  },
  {
    id: '100',
    currency: ECurrency.USD,
    value: 100,
  },
  {
    id: '250',
    currency: ECurrency.USD,
    value: 250,
  },
  {
    id: '500',
    currency: ECurrency.USD,
    value: 500,
  },
  {
    id: '1_000',
    currency: ECurrency.USD,
    value: 1_000,
  },
];

export const ONE_TIME_PAYMENT_ANKR_AMOUNTS: IAmount[] = [
  {
    id: '200',
    currency: ECurrency.ANKR,
    value: 200,
  },
  {
    id: '2_000',
    currency: ECurrency.ANKR,
    value: 2_000,
  },
  {
    id: '4_000',
    currency: ECurrency.ANKR,
    value: 4_000,
  },
  {
    id: '10_000',
    currency: ECurrency.ANKR,
    value: 10_000,
  },
  {
    id: '20_000',
    currency: ECurrency.ANKR,
    value: 20_000,
  },
  {
    id: '40_000',
    currency: ECurrency.ANKR,
    value: 40_000,
  },
];

export const ONE_TIME_PAYMENT_USDT_AMOUNTS: IAmount[] = [
  {
    id: '10',
    currency: ECurrency.USDT,
    value: 10,
  },
  {
    id: '50',
    currency: ECurrency.USDT,
    value: 50,
  },
  {
    id: '100',
    currency: ECurrency.USDT,
    value: 100,
  },
  {
    id: '250',
    currency: ECurrency.USDT,
    value: 250,
  },
  {
    id: '500',
    currency: ECurrency.USDT,
    value: 500,
  },
  {
    id: '1_000',
    currency: ECurrency.USDT,
    value: 1_000,
  },
];

export const ONE_TIME_PAYMENT_USDC_AMOUNTS: IAmount[] = [
  {
    id: '10',
    currency: ECurrency.USDC,
    value: 10,
  },
  {
    id: '50',
    currency: ECurrency.USDC,
    value: 50,
  },
  {
    id: '100',
    currency: ECurrency.USDC,
    value: 100,
  },
  {
    id: '250',
    currency: ECurrency.USDC,
    value: 250,
  },
  {
    id: '500',
    currency: ECurrency.USDC,
    value: 500,
  },
  {
    id: '1_000',
    currency: ECurrency.USDC,
    value: 1_000,
  },
];

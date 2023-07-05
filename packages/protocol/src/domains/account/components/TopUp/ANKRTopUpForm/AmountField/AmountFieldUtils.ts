import BigNumber from 'bignumber.js';
import { CurrencyRateSymbol } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { CreditsRate } from 'domains/account/actions/rate/fetchCreditRates';
import { Currency } from '../../types';
import { USD_CURRENCY } from 'domains/account/actions/usdTopUp/const';

const MIN_AMOUNT = 0;

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThanOrEqualTo(MIN_AMOUNT)) {
    return t('validation.min-greater', {
      value: MIN_AMOUNT,
    });
  }

  return undefined;
};

export const MAX_DECIMALS = 8;

const cutDecimals = (value: string, maxDecimals: number) => {
  const [, decimals] = value.split('.');

  if (decimals && decimals.length > maxDecimals) {
    return value.slice(0, -1);
  }

  return value;
};

export const normalizeAmount = (value: string, maxDecimals: number): string => {
  // only numbers and dot
  const normilized = value.replace(',', '.').replace(/[^0-9.]/g, '');

  return cutDecimals(normilized, maxDecimals);
};

export const MAX_LENGTH = 15;

const root = 'account.account-details.top-up';

const BASE_NUMBER = 10;

const getCreditsByRate = (rate?: BigNumber, value?: string, decimals = 0) => {
  if (!rate) return '';

  const power = BASE_NUMBER * decimals || 1;

  const key = `${root}.credits`;

  if (!value || !Number(value)) {
    return t(key, { credits: rate.dividedBy(power).toNumber() });
  }

  return t(key, {
    credits: rate
      .multipliedBy(new BigNumber(value))
      .dividedBy(power)
      .toNumber(),
  });
};

const getCurrencyRate = (
  rates: CreditsRate[],
  currencyRate: CurrencyRateSymbol,
) => {
  return rates?.find(rate => rate.symbol === currencyRate);
};

export const getCredits = (
  currency: Currency,
  rates: CreditsRate[],
  value?: string,
) => {
  const rate =
    currency === USD_CURRENCY
      ? getCurrencyRate(rates, CurrencyRateSymbol['CREDIT/USD'])
      : getCurrencyRate(rates, CurrencyRateSymbol['CREDIT/ANKR']);

  return getCreditsByRate(rate?.rate, value, rate?.decimals);
};

import BigNumber from 'bignumber.js';
import { CurrencyRate, CurrencyRateSymbol } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { USD_CURRENCY } from 'domains/account/actions/usdTopUp/const';

import { Currency } from '../../types';

const MIN_AMOUNT = 0;

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(MIN_AMOUNT)) {
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

export const cutLetters = (value: string) => {
  return value.replace(/[a-zA-Z]/g, '');
};

export const normalizeAmount = (value: string, maxDecimals: number): string => {
  // only numbers and dot
  const normalized = value.replace(',', '.').replace(/[^0-9.]/g, '');

  return cutLetters(cutDecimals(normalized, maxDecimals));
};

export const MAX_LENGTH = 15;

const root = 'account.account-details.top-up';

const BASE_NUMBER = 10;

const getCreditsByRate = (rate?: string, value?: string, decimals = 0) => {
  if (!rate) return '';

  const rateNumber = new BigNumber(rate);

  const power = BASE_NUMBER * decimals || 1;

  const key = `${root}.credits`;

  if (!value || !Number(value)) {
    return t(key, { credits: rateNumber.dividedBy(power).toNumber() });
  }

  return t(key, {
    credits: rateNumber
      .multipliedBy(new BigNumber(value))
      .dividedBy(power)
      .toNumber(),
  });
};

const getCurrencyRate = (
  rates: CurrencyRate[],
  currencyRate: CurrencyRateSymbol,
) => {
  return rates?.find(rate => rate.symbol === currencyRate);
};

export const getCredits = (
  currency: Currency,
  rates: CurrencyRate[],
  value?: string,
) => {
  const rate =
    currency === USD_CURRENCY
      ? getCurrencyRate(rates, CurrencyRateSymbol['CREDIT/USD'])
      : getCurrencyRate(rates, CurrencyRateSymbol['CREDIT/ANKR']);

  return getCreditsByRate(rate?.rate, value, rate?.decimals);
};

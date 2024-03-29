import BigNumber from 'bignumber.js';
import { CurrencyRate, CurrencyRateSymbol } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { Currency } from 'domains/account/components/TopUp/types';
import { USD_CURRENCY } from 'domains/account/actions/usdTopUp/const';

const root = 'account.account-details.top-up';

const BASE_NUMBER = 10;

const getCreditsByRate = (rate?: string, value?: string, decimals = 0) => {
  if (!rate) return '';

  const rateNumber = new BigNumber(rate);
  const power = BASE_NUMBER * decimals || 1;

  const key = `${root}.credits`;

  if (!value || !Number(value)) {
    const credits = rateNumber.dividedBy(power).toNumber();

    return t(key, { credits });
  }

  const credits = rateNumber
    .multipliedBy(new BigNumber(value))
    .dividedBy(power)
    .toNumber();

  return t(key, { credits });
};

const getCurrencyRate = (
  rates: CurrencyRate[],
  currencyRate: CurrencyRateSymbol,
) => rates?.find(rate => rate.symbol === currencyRate);

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

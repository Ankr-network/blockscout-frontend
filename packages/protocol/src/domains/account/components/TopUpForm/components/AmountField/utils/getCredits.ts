import BigNumber from 'bignumber.js';
import { CurrencyRateSymbol } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { CreditsRate } from 'domains/account/actions/rate/fetchCreditRates';
import { Currency } from 'domains/account/components/TopUp/types';
import { USD_CURRENCY } from 'domains/account/actions/usdTopUp/const';

const root = 'account.account-details.top-up';

const BASE_NUMBER = 10;

const getCreditsByRate = (rate?: BigNumber, value?: string, decimals = 0) => {
  if (!rate) return '';

  const power = BASE_NUMBER * decimals || 1;

  const key = `${root}.credits`;

  if (!value || !Number(value)) {
    const credits = rate.dividedBy(power).toNumber();

    return t(key, { credits });
  }

  const credits = rate
    .multipliedBy(new BigNumber(value))
    .dividedBy(power)
    .toNumber();

  return t(key, { credits });
};

const getCurrencyRate = (
  rates: CreditsRate[],
  currencyRate: CurrencyRateSymbol,
) => rates?.find(rate => rate.symbol === currencyRate);

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

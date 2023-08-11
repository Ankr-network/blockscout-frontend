import BigNumber from 'bignumber.js';
import { CurrencyRateSymbol } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { CreditsRate } from 'domains/account/actions/rate/fetchCreditRates';

const BASE_NUMBER = 10;

const getCreditsByRate = (rate?: BigNumber, value?: string, decimals = 0) => {
  if (!rate) return '';

  const power = BASE_NUMBER * decimals || 1;

  const key = 'account.account-details.top-up.credits';

  if (!value || !Number(value)) {
    return t(key, { credits: rate.dividedBy(power).toNumber() });
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

export const getCredits = (rates: CreditsRate[], value?: string) => {
  const rate = getCurrencyRate(rates, CurrencyRateSymbol['CREDIT/ANKR']);

  return getCreditsByRate(rate?.rate, value, rate?.decimals);
};

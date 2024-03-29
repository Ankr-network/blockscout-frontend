import BigNumber from 'bignumber.js';
import { CurrencyRate, CurrencyRateSymbol } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

const BASE_NUMBER = 10;

const getCreditsByRate = (rate?: string, value?: string, decimals = 0) => {
  if (!rate) return '';

  const rateNumber = new BigNumber(rate);

  const power = BASE_NUMBER * decimals || 1;

  const key = 'account.account-details.top-up.credits';

  if (!value || !Number(value)) {
    return t(key, { credits: rateNumber.dividedBy(power).toNumber() });
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

export const getCredits = (rates: CurrencyRate[], value?: string) => {
  const rate = getCurrencyRate(rates, CurrencyRateSymbol['CREDIT/ANKR']);

  return getCreditsByRate(rate?.rate, value, rate?.decimals);
};

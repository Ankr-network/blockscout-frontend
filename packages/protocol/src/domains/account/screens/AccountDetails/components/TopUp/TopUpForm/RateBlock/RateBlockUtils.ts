import BigNumber from 'bignumber.js';

import { CreditsRate } from 'domains/account/actions/rate/fetchCreditRates';
import { CurrencyRateSymbol } from 'multirpc-sdk';
import { CurrencyType, USD_CURRENCY } from '../../../const';
import { t } from 'modules/i18n/utils/intl';

const root = 'account.account-details.top-up';

const getAnkrRate = (rate?: BigNumber, value?: string, decimals = 0) => {
  if (!rate) return '';

  const key = `${root}.ankr-credits-rate`;

  const power = 10 * decimals || 1;

  if (!value || !Number(value)) {
    return t(key, {
      ankrValue: 1,
      creditsValue: rate.dividedBy(power).toNumber(),
    });
  }

  return t(key, {
    ankrValue: value,
    creditsValue: rate
      .multipliedBy(new BigNumber(value))
      .dividedBy(power)
      .toNumber(),
  });
};

const getUsdRate = (rate?: BigNumber, value?: string, decimals = 0) => {
  if (!rate) return '';

  const power = 10 * decimals || 1;

  const key = `${root}.usd-credits-rate`;

  if (!value || !Number(value)) {
    return t(key, {
      usdValue: 1,
      creditsValue: rate.dividedBy(power).toNumber(),
    });
  }

  return t(key, {
    usdValue: value,
    creditsValue: rate
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

export const getRate = (
  currency: CurrencyType,
  rates: CreditsRate[],
  value?: string,
) => {
  if (currency === USD_CURRENCY) {
    const usdToCreditsRate = getCurrencyRate(
      rates,
      CurrencyRateSymbol['CREDIT/USD'],
    );

    return getUsdRate(
      usdToCreditsRate?.rate,
      value,
      usdToCreditsRate?.decimals,
    );
  }

  const ankrToCreditsRate = getCurrencyRate(
    rates,
    CurrencyRateSymbol['CREDIT/ANKR'],
  );

  return getAnkrRate(
    ankrToCreditsRate?.rate,
    value,
    ankrToCreditsRate?.decimals,
  );
};

import { CurrencyRateSymbol } from 'multirpc-sdk';
import {
  CreditsRate,
  useFetchRateQuery,
} from 'modules/clients/actions/fetchRate';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';

const getCurrencyRate = (
  currencyRate: CurrencyRateSymbol,
  rates?: CreditsRate[],
) => {
  if (!rates) {
    return undefined;
  }
  return rates?.find(rate => rate.symbol === currencyRate);
};

export const useRates = () => {
  const { data: ratesData } = useFetchRateQuery();
  const equivalentInAnkr = getCurrencyRate(
    CurrencyRateSymbol['CREDIT/ANKR'],
    ratesData,
  )?.rate.toNumber();
  const equivalentInUsd = getCurrencyRate(
    CurrencyRateSymbol['CREDIT/USD'],
    ratesData,
  )?.rate.toNumber();

  const renderEquivalent = (type: CurrencyRateSymbol, value: number) => {
    if (type === CurrencyRateSymbol['CREDIT/ANKR']) {
      return equivalentInAnkr
        ? renderBalance(value / equivalentInAnkr, 'ANKR')
        : 'unknown';
    }
    if (type === CurrencyRateSymbol['CREDIT/USD']) {
      return equivalentInUsd ? renderUSD(value / equivalentInUsd) : 'unknown';
    }
    return 'unknown';
  };

  const renderAmountEquivalent = (value = 1) => {
    return `${renderBalance(value, 'Credits')} = ${renderEquivalent(
      CurrencyRateSymbol['CREDIT/ANKR'],
      value,
    )} = ${renderEquivalent(CurrencyRateSymbol['CREDIT/USD'], value)}`;
  };

  return {
    renderAmountEquivalent,
  };
};

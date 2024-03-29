import BigNumber from 'bignumber.js';
import { CurrencyRate, CurrencyRateSymbol } from 'multirpc-sdk';

import { TopUpCurrency } from '../../../types';

const symbolsMap: Record<TopUpCurrency, CurrencyRateSymbol> = {
  [TopUpCurrency.ANKR]: CurrencyRateSymbol['CREDIT/ANKR'],
  [TopUpCurrency.USD]: CurrencyRateSymbol['CREDIT/USD'],
};

export interface AmountInCreditsParams {
  amount: string;
  currency: TopUpCurrency;
  rates?: CurrencyRate[];
}

const DEFAULT_RATE = '1';

export const getAmountInCredits = ({
  amount,
  currency,
  rates = [],
}: AmountInCreditsParams) => {
  const rateSymbol = symbolsMap[currency];

  const { rate = DEFAULT_RATE } =
    rates.find(({ symbol }) => symbol === rateSymbol) ?? {};

  return new BigNumber(amount).multipliedBy(rate).toNumber();
};

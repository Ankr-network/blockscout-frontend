import BigNumber from 'bignumber.js';
import { CurrencyRateSymbol } from 'multirpc-sdk';

import { CreditsRate } from 'domains/account/actions/rate/fetchCreditRates';
import { TopUpCurrnecy } from 'modules/analytics/mixpanel/const';

export interface AmountInCreditsParams {
  amount: string;
  currency: TopUpCurrnecy;
  rates?: CreditsRate[];
}

const symbolsMap: Record<TopUpCurrnecy, CurrencyRateSymbol> = {
  [TopUpCurrnecy.ANKR]: CurrencyRateSymbol['CREDIT/ANKR'],
  [TopUpCurrnecy.USD]: CurrencyRateSymbol['CREDIT/USD'],
};

export const getAmountInCredits = ({
  amount,
  currency,
  rates = [],
}: AmountInCreditsParams) => {
  const rateSymbol = symbolsMap[currency];

  const { rate = new BigNumber(1) } =
    rates.find(({ symbol }) => symbol === rateSymbol) ?? {};

  return new BigNumber(Number(amount) || 0).multipliedBy(rate).toNumber();
};

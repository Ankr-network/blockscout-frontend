import BigNumber from 'bignumber.js';
import { CurrencyRate, CurrencyRateSymbol } from 'multirpc-sdk';

import { ECurrency } from 'modules/payments/types';

export interface IGetUsdAmountByCryptoAmountParams {
  amount: number;
  currency: ECurrency;
  rates: CurrencyRate[];
}

export const getUsdAmountByCryptoAmount = ({
  amount,
  currency,
  rates,
}: IGetUsdAmountByCryptoAmountParams) => {
  const isANKR = currency === ECurrency.ANKR;

  if (isANKR) {
    const rate = rates.find(
      ({ symbol }) => symbol === CurrencyRateSymbol['USD/ANKR'],
    );

    if (rate) {
      return new BigNumber(rate.rate)
        .dividedBy(10 ** rate.decimals)
        .multipliedBy(amount)
        .toNumber();
    }

    return 0;
  }

  return amount;
};

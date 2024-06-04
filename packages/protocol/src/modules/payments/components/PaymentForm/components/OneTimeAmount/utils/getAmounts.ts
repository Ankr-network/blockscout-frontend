import { ECurrency, IAmount } from 'modules/payments/types';

import {
  DEFAULT_SELECTED_ONE_TIME_ANKR_AMOUNT,
  DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT,
  ONE_TIME_PAYMENT_USDC_AMOUNTS,
  ONE_TIME_PAYMENT_USDT_AMOUNTS,
  ONE_TIME_PAYMENT_ANKR_AMOUNTS,
  ONE_TIME_PAYMENT_USD_AMOUNTS,
} from '../const';
import { getAmountIDByAmountValue } from './getAmountIDByAmountValue';

const amountsMap: Record<ECurrency, [IAmount[], number]> = {
  [ECurrency.ANKR]: [
    ONE_TIME_PAYMENT_ANKR_AMOUNTS,
    DEFAULT_SELECTED_ONE_TIME_ANKR_AMOUNT,
  ],
  [ECurrency.USD]: [
    ONE_TIME_PAYMENT_USD_AMOUNTS,
    DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT,
  ],
  [ECurrency.USDC]: [
    ONE_TIME_PAYMENT_USDC_AMOUNTS,
    DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT,
  ],
  [ECurrency.USDT]: [
    ONE_TIME_PAYMENT_USDT_AMOUNTS,
    DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT,
  ],
};

export const getAmounts = (currency: ECurrency) => {
  const [amounts, initialAmount] = amountsMap[currency];

  const initialSelectedAmountID = getAmountIDByAmountValue({
    amount: initialAmount,
    amounts,
  });

  return { amounts, initialAmount, initialSelectedAmountID };
};

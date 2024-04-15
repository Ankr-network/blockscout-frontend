import { ECurrency } from 'modules/billing/types';

import {
  DEFAULT_SELECTED_ONE_TIME_ANKR_AMOUNT,
  DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT,
  ONE_TIME_PAYMENT_ANKR_AMOUNTS,
  ONE_TIME_PAYMENT_USD_AMOUNTS,
} from '../const';
import { getAmountIDByAmountValue } from './getAmountIDByAmountValue';

export const getAmounts = (currency: ECurrency) => {
  const isUSD = currency === ECurrency.USD;

  const [amounts, initialAmount] = isUSD
    ? [ONE_TIME_PAYMENT_USD_AMOUNTS, DEFAULT_SELECTED_ONE_TIME_USD_AMOUNT]
    : [ONE_TIME_PAYMENT_ANKR_AMOUNTS, DEFAULT_SELECTED_ONE_TIME_ANKR_AMOUNT];

  const initialSelectedAmountID = getAmountIDByAmountValue({
    amount: initialAmount,
    amounts,
  });

  return { amounts, initialAmount, initialSelectedAmountID };
};

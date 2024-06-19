import { tHTML } from '@ankr.com/common';

import { ECurrency } from 'modules/payments/types';

export interface IRenderPaymentSummaryAmountParams {
  amount: number;
  currency: ECurrency;
}

export const renderPaymentSummaryAmount = ({
  amount,
  currency,
}: IRenderPaymentSummaryAmountParams) => {
  const isUSD = currency === ECurrency.USD;

  const formattedAmount = isUSD
    ? tHTML('account.amounts.usd', { amount, isApproximate: false })
    : tHTML('account.amounts.crypto', { amount, currency });

  return formattedAmount;
};

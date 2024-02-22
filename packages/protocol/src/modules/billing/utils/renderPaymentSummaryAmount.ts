import { tHTML } from '@ankr.com/common';

import { ECurrency } from 'modules/billing/types';

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
    ? tHTML('account.payment-summary-dialog.usd.amount', { amount })
    : tHTML('account.payment-summary-dialog.crypto.amount', {
        amount,
        currency,
      });

  return formattedAmount;
};

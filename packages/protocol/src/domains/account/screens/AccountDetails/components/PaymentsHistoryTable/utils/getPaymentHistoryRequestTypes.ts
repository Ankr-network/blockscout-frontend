import { IPaymentHistoryEntityType } from 'multirpc-sdk';

import { PaymentType } from 'domains/account/types';

export const getPaymentHistoryRequestTypes = (
  paymentType: PaymentType,
): IPaymentHistoryEntityType[] | undefined => {
  if (paymentType === 'ALL') {
    return undefined;
  }

  if (paymentType === 'TRANSACTION_TYPE_WITHDRAW') {
    return [
      paymentType,
      'TRANSACTION_TYPE_WITHDRAW_INIT',
      'TRANSACTION_TYPE_WITHDRAW_ADJUST',
    ];
  }

  if (paymentType === 'TRANSACTION_TYPE_VOUCHER_TOPUP') {
    return [
      paymentType,
      'TRANSACTION_TYPE_VOUCHER_TOPUP',
      'TRANSACTION_TYPE_VOUCHER_ADJUST',
    ];
  }

  return [paymentType];
};

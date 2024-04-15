import { PaymentType } from 'domains/account/types';

export const CREDIT_TYPE = [
  'TRANSACTION_TYPE_UNKNOWN',
  'TRANSACTION_TYPE_VOUCHER_TOPUP',
  'TRANSACTION_TYPE_VOUCHER_ADJUST',
  'TRANSACTION_TYPE_DEDUCTION',
];

export const getPaymentHistoryItemDirection = (
  type: PaymentType,
): boolean | undefined => {
  if (['TRANSACTION_TYPE_UNKNOWN'].includes(type)) {
    return undefined;
  }

  return [
    'TRANSACTION_TYPE_DEPOSIT',
    'TRANSACTION_TYPE_DEAL_DEPOSIT',
    'TRANSACTION_TYPE_PACKAGE_DEPOSIT',
    'TRANSACTION_TYPE_BONUS',
    'TRANSACTION_TYPE_COMPENSATION',
    'TRANSACTION_TYPE_VOUCHER_TOPUP',
  ].includes(type);
};

import { IPaymentHistoryEntityType } from 'multirpc-sdk';

export const getPaymentHistoryItemDirection = (
  type: IPaymentHistoryEntityType,
): boolean | undefined => {
  if (['TRANSACTION_TYPE_UNKNOWN'].includes(type)) {
    return undefined;
  }

  return [
    'TRANSACTION_TYPE_DEPOSIT',
    'TRANSACTION_TYPE_BONUS',
    'TRANSACTION_TYPE_COMPENSATION',
    'TRANSACTION_TYPE_VOUCHER_TOPUP',
  ].includes(type);
};

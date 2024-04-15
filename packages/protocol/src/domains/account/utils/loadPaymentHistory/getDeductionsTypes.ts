import { TPaymentHistoryEntityType as Type } from 'multirpc-sdk';

import { PaymentType } from 'domains/account/types';

const typesWithoutDeductions: Type[] = [
  'TRANSACTION_TYPE_UNKNOWN',
  'TRANSACTION_TYPE_DEPOSIT',
  'TRANSACTION_TYPE_WITHDRAW',
  'TRANSACTION_TYPE_BONUS',
  'TRANSACTION_TYPE_COMPENSATION',
  'TRANSACTION_TYPE_VOUCHER_TOPUP',
  'TRANSACTION_TYPE_VOUCHER_ADJUST',
  'TRANSACTION_TYPE_WITHDRAW_INIT',
  'TRANSACTION_TYPE_WITHDRAW_ADJUST',
];

export const getDeductionsTypes = (types: PaymentType[]) =>
  types.length === 0
    ? typesWithoutDeductions
    : (types.filter(type => type !== 'TRANSACTION_TYPE_DEDUCTION') as Type[]);

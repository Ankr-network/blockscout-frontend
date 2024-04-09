import { IPaymentHistoryTableEntity } from 'domains/account/types';

export interface Decomposition {
  deductions: IPaymentHistoryTableEntity[];
  transactions: IPaymentHistoryTableEntity[];
  bundlesPayments: IPaymentHistoryTableEntity[];
}

export const decomposePaymentHistory = (
  paymentHistory: IPaymentHistoryTableEntity[] = [],
) =>
  paymentHistory.reduce<Decomposition>(
    (decomposition, entity) => {
      let key: keyof Decomposition;

      switch (entity.type) {
        case 'TRANSACTION_TYPE_DEDUCTION':
          key = 'deductions';
          break;
        case 'TRANSACTION_TYPE_DEAL_DEPOSIT':
        case 'TRANSACTION_TYPE_PACKAGE_DEPOSIT':
          key = 'bundlesPayments';
          break;
        default:
          key = 'transactions';
          break;
      }

      decomposition[key].push(entity);

      return decomposition;
    },
    { deductions: [], transactions: [], bundlesPayments: [] },
  );

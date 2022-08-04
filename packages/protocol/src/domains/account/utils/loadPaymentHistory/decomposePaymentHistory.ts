import { IPaymentHistoryEntity } from 'multirpc-sdk';

export interface Decomposition {
  deductions: IPaymentHistoryEntity[];
  transactions: IPaymentHistoryEntity[];
}

export const decomposePaymentHistory = (
  paymentHistory: IPaymentHistoryEntity[] = [],
) =>
  paymentHistory.reduce<Decomposition>(
    (decomposition, entity) => {
      const key: keyof Decomposition =
        entity.type === 'TRANSACTION_TYPE_DEDUCTION'
          ? 'deductions'
          : 'transactions';

      decomposition[key].push(entity);

      return decomposition;
    },
    { deductions: [], transactions: [] },
  );

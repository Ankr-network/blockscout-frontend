import { IPaymentHistoryEntity } from 'multirpc-sdk';

import { decomposePaymentHistory } from './decomposePaymentHistory';
import { getLastEntity } from './getLastEntity';

export interface TakenPaymentHistory {
  lastDeduction?: IPaymentHistoryEntity;
  lastTransaction: IPaymentHistoryEntity;
  paymentHistory: IPaymentHistoryEntity[];
}

export const takePaymentHistory = (
  paymentHistory: IPaymentHistoryEntity[],
  limit: number,
): TakenPaymentHistory => {
  const takenPaymentHistory = [...paymentHistory]
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .slice(0, limit);

  const { transactions, deductions } =
    decomposePaymentHistory(takenPaymentHistory);

  const lastTransaction = getLastEntity(transactions);
  const lastDeduction = getLastEntity(deductions);

  return {
    lastDeduction,
    lastTransaction,
    paymentHistory: takenPaymentHistory,
  };
};

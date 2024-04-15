import { IPaymentHistoryTableEntity } from 'domains/account/types';

import { decomposePaymentHistory } from './decomposePaymentHistory';
import { getLastEntity } from './getLastEntity';

export interface TakenPaymentHistory {
  lastDeduction?: IPaymentHistoryTableEntity;
  lastTransaction: IPaymentHistoryTableEntity;
  lastMyBundlesPayment: IPaymentHistoryTableEntity;
  paymentHistory: IPaymentHistoryTableEntity[];
}

export const takePaymentHistory = (
  paymentHistory: IPaymentHistoryTableEntity[],
  limit: number,
): TakenPaymentHistory => {
  const takenPaymentHistory = [...paymentHistory]
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    .slice(0, limit);

  const { transactions, deductions, bundlesPayments } =
    decomposePaymentHistory(takenPaymentHistory);

  const lastTransaction = getLastEntity(
    transactions,
  ) as IPaymentHistoryTableEntity;
  const lastDeduction = getLastEntity(deductions) as IPaymentHistoryTableEntity;
  const lastMyBundlesPayment = getLastEntity(
    bundlesPayments,
  ) as IPaymentHistoryTableEntity;

  return {
    lastDeduction,
    lastTransaction,
    lastMyBundlesPayment,
    paymentHistory: takenPaymentHistory,
  };
};

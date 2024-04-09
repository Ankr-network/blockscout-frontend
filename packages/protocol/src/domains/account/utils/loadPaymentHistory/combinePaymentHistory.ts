import { IPaymentHistoryTableEntity } from 'domains/account/types';

import { filterTransactions } from './filterTransactions';

export interface CombinePaymentHistoryParams {
  loadedDeductions: IPaymentHistoryTableEntity[];
  loadedTransactions: IPaymentHistoryTableEntity[];
  loadedMyBundlesPayments: IPaymentHistoryTableEntity[];
  loadingDeductions: IPaymentHistoryTableEntity[];
  loadingTransactions: IPaymentHistoryTableEntity[];
  loadingMyBundlesPayments: IPaymentHistoryTableEntity[];
}

export interface CombinedPaymentHistory {
  deductions: IPaymentHistoryTableEntity[];
  paymentHistory: IPaymentHistoryTableEntity[];
  transactions: IPaymentHistoryTableEntity[];
  myBundlesPayments: IPaymentHistoryTableEntity[];
}

export const combinePaymentHistory = ({
  loadedDeductions,
  loadedTransactions,
  loadedMyBundlesPayments,
  loadingDeductions,
  loadingTransactions,
  loadingMyBundlesPayments,
}: CombinePaymentHistoryParams): CombinedPaymentHistory => {
  const transactions = [...loadedTransactions, ...loadingTransactions];
  const deductions = [...loadedDeductions, ...loadingDeductions];
  const myBundlesPayments = [
    ...loadedMyBundlesPayments,
    ...loadingMyBundlesPayments,
  ];

  const filteredTransactions = filterTransactions(transactions);

  const paymentHistory = [
    ...filteredTransactions,
    ...deductions,
    ...myBundlesPayments,
  ];

  return {
    deductions,
    paymentHistory,
    transactions,
    myBundlesPayments,
  };
};

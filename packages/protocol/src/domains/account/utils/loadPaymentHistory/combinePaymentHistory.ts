import { IPaymentHistoryTableEntity } from 'domains/account/types';

import { filterTransactions } from './filterTransactions';

export interface CombinePaymentHistoryParams {
  limit: number;
  loadedDeductions: IPaymentHistoryTableEntity[];
  loadedTransactions: IPaymentHistoryTableEntity[];
  loadedMyBundlesPayments: IPaymentHistoryTableEntity[];
  loadingDeductions: IPaymentHistoryTableEntity[];
  loadingDeductionsCursor: number;
  loadingTransactions: IPaymentHistoryTableEntity[];
  loadingTransactionsCursor: number;
  loadingMyBundlesPayments: IPaymentHistoryTableEntity[];
  loadingMyBundlesPaymentsCursor: number;
}

export interface CombinedPaymentHistory {
  deductions: IPaymentHistoryTableEntity[];
  loadMore: boolean;
  paymentHistory: IPaymentHistoryTableEntity[];
  transactions: IPaymentHistoryTableEntity[];
  myBundlesPayments: IPaymentHistoryTableEntity[];
}

export const combinePaymentHistory = ({
  limit,
  loadedDeductions,
  loadedTransactions,
  loadedMyBundlesPayments,
  loadingDeductions,
  loadingDeductionsCursor,
  loadingTransactions,
  loadingTransactionsCursor,
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
  const loadMore =
    paymentHistory.length <= 2 * limit &&
    (loadingDeductionsCursor !== -1 || loadingTransactionsCursor !== -1);

  return {
    deductions,
    loadMore,
    paymentHistory,
    transactions,
    myBundlesPayments,
  };
};

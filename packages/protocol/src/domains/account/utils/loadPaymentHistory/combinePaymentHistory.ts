import { IPaymentHistoryEntity } from 'multirpc-sdk';

import { filterTransactions } from './filterTransactions';

export interface CombinePaymentHistoryParams {
  limit: number;
  loadedDeductions: IPaymentHistoryEntity[];
  loadedTransactions: IPaymentHistoryEntity[];
  loadingDeductions: IPaymentHistoryEntity[];
  loadingDeductionsCursor: number;
  loadingTransactions: IPaymentHistoryEntity[];
  loadingTransactionsCursor: number;
}

export interface CombinedPaymentHistory {
  deductions: IPaymentHistoryEntity[];
  loadMore: boolean;
  paymentHistory: IPaymentHistoryEntity[];
  transactions: IPaymentHistoryEntity[];
}

export const combinePaymentHistory = ({
  limit,
  loadedDeductions,
  loadedTransactions,
  loadingDeductions,
  loadingDeductionsCursor,
  loadingTransactions,
  loadingTransactionsCursor,
}: CombinePaymentHistoryParams): CombinedPaymentHistory => {
  const transactions = [...loadedTransactions, ...loadingTransactions];
  const deductions = [...loadedDeductions, ...loadingDeductions];

  const filteredTransactions = filterTransactions(transactions);

  const paymentHistory = [...filteredTransactions, ...deductions];
  const loadMore =
    paymentHistory.length <= 2 * limit &&
    (loadingDeductionsCursor !== -1 || loadingTransactionsCursor !== -1);

  return {
    deductions,
    loadMore,
    paymentHistory,
    transactions,
  };
};

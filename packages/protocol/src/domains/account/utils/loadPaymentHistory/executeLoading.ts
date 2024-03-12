import {
  IPaymentHistoryTableEntity,
  PaymentHistory,
  PaymentHistoryParams,
} from 'domains/account/types';

import { combinePaymentHistory } from './combinePaymentHistory';
import { fetchPaymentHistory } from './fetchPaymentHistory';
import { getCursors } from './getCursors';
import { takePaymentHistory } from './takePaymentHistory';

export interface ExecuteLoadingParams extends PaymentHistoryParams {
  loadedDeductions?: IPaymentHistoryTableEntity[];
  loadedTransactions?: IPaymentHistoryTableEntity[];
  loadedMyBundlesPayments?: IPaymentHistoryTableEntity[];
}

export const executeLoading = async ({
  deductionsCursor: loadedDeductionsCursor = 0,
  from,
  limit,
  loadedDeductions = [],
  loadedTransactions = [],
  loadedMyBundlesPayments = [],
  myBundlesPaymentsCursor: loadedMyBundlesPaymentsCursor = 0,
  to,
  transactionsCursor: loadedTransactionsCursor = 0,
  types = [],
  group,
}: ExecuteLoadingParams): Promise<PaymentHistory> => {
  const {
    deductions: loadingDeductions,
    deductionsCursor: loadingDeductionsCursor,
    transactions: loadingTransactions,
    transactionsCursor: loadingTransactionsCursor,
    myBundlesPayments: loadingMyBundlesPayments,
    myBundlesPaymentsCursor: loadingMyBundlesPaymentsCursor,
  } = await fetchPaymentHistory({
    from,
    to,
    deductionsCursor: loadedDeductionsCursor,
    transactionsCursor: loadedTransactionsCursor,
    myBundlesPaymentsCursor: loadedMyBundlesPaymentsCursor,
    types,
    group,
  });

  const {
    deductions,
    loadMore,
    paymentHistory,
    transactions,
    myBundlesPayments,
  } = combinePaymentHistory({
    limit,
    loadedDeductions,
    loadedTransactions,
    loadedMyBundlesPayments,
    loadingDeductions,
    loadingDeductionsCursor,
    loadingTransactions,
    loadingTransactionsCursor,
    loadingMyBundlesPayments,
    loadingMyBundlesPaymentsCursor,
  });

  if (loadMore) {
    return executeLoading({
      deductionsCursor: loadingDeductionsCursor,
      from,
      limit,
      loadedDeductions: deductions,
      loadedTransactions: transactions,
      to,
      transactionsCursor: loadingTransactionsCursor,
      types,
      group,
    });
  }

  const {
    lastDeduction,
    lastTransaction,
    lastMyBundlesPayment,
    paymentHistory: list,
  } = takePaymentHistory(paymentHistory, limit);

  const { deductionsCursor, transactionsCursor, myBundlesPaymentsCursor } =
    getCursors({
      paymentHistory,
      transactions,
      deductions,
      myBundlesPayments,
      lastDeduction,
      lastTransaction,
      lastMyBundlesPayment,
      limit,
      loadingDeductionsCursor,
      loadingTransactionsCursor,
      loadingMyBundlesPaymentsCursor,
    });

  return {
    deductionsCursor,
    list,
    transactionsCursor,
    myBundlesPaymentsCursor,
  };
};

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
  group,
  limit,
  loadedDeductions = [],
  loadedMyBundlesPayments = [],
  loadedTransactions = [],
  myBundlesPaymentsCursor: loadedMyBundlesPaymentsCursor = 0,
  to,
  transactionsCursor: loadedTransactionsCursor = 0,
  types = [],
}: ExecuteLoadingParams): Promise<PaymentHistory> => {
  const {
    deductions: loadingDeductions,
    deductionsCursor: loadingDeductionsCursor,
    myBundlesPayments: loadingMyBundlesPayments,
    myBundlesPaymentsCursor: loadingMyBundlesPaymentsCursor,
    transactions: loadingTransactions,
    transactionsCursor: loadingTransactionsCursor,
  } = await fetchPaymentHistory({
    from,
    to,
    deductionsCursor: loadedDeductionsCursor,
    transactionsCursor: loadedTransactionsCursor,
    myBundlesPaymentsCursor: loadedMyBundlesPaymentsCursor,
    types,
    group,
  });

  const { deductions, myBundlesPayments, paymentHistory, transactions } =
    combinePaymentHistory({
      loadedDeductions,
      loadingDeductions,
      loadedTransactions,
      loadingTransactions,
      loadedMyBundlesPayments,
      loadingMyBundlesPayments,
    });

  const {
    lastDeduction,
    lastMyBundlesPayment,
    lastTransaction,
    paymentHistory: list,
  } = takePaymentHistory(paymentHistory, limit);

  const { deductionsCursor, myBundlesPaymentsCursor, transactionsCursor } =
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

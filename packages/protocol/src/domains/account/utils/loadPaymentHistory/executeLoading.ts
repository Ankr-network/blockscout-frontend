import { PaymentHistory, PaymentHistoryParams } from 'domains/account/types';
import { IPaymentHistoryEntity } from 'multirpc-sdk';
import { combinePaymentHistory } from './combinePaymentHistory';
import { fetchPaymentHistory } from './fetchPaymentHistory';
import { getCursors } from './getCursors';
import { takePaymentHistory } from './takePaymentHistory';

export interface ExecuteLoadingParams extends PaymentHistoryParams {
  loadedDeductions?: IPaymentHistoryEntity[];
  loadedTransactions?: IPaymentHistoryEntity[];
}

export const executeLoading = async ({
  deductionsCursor: loadedDeductionsCursor = 0,
  from,
  limit,
  loadedDeductions = [],
  loadedTransactions = [],
  to,
  transactionsCursor: loadedTransactionsCursor = 0,
  types = [],
}: ExecuteLoadingParams): Promise<PaymentHistory> => {
  const {
    deductions: loadingDeductions,
    deductionsCursor: loadingDeductionsCursor,
    transactions: loadingTransactions,
    transactionsCursor: loadingTransactionsCursor,
  } = await fetchPaymentHistory({
    from,
    to,
    deductionsCursor: loadedDeductionsCursor,
    transactionsCursor: loadedTransactionsCursor,
    types,
  });

  const { deductions, loadMore, paymentHistory, transactions } =
    combinePaymentHistory({
      limit,
      loadedDeductions,
      loadedTransactions,
      loadingDeductions,
      loadingDeductionsCursor,
      loadingTransactions,
      loadingTransactionsCursor,
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
    });
  }

  const {
    lastDeduction,
    lastTransaction,
    paymentHistory: list,
  } = takePaymentHistory(paymentHistory, limit);

  const { deductionsCursor, transactionsCursor } = getCursors({
    deductions,
    lastDeduction,
    lastTransaction,
    limit,
    loadingDeductionsCursor,
    loadingTransactionsCursor,
    paymentHistory,
    transactions,
  });

  return { deductionsCursor, list, transactionsCursor };
};

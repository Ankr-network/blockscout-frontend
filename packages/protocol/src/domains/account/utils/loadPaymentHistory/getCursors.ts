import { IPaymentHistoryTableEntity } from 'domains/account/types';

export interface Cursors {
  deductionsCursor: number;
  transactionsCursor: number;
  myBundlesPaymentsCursor: number;
}

export interface CursorsParams {
  paymentHistory: IPaymentHistoryTableEntity[];
  transactions: IPaymentHistoryTableEntity[];
  deductions: IPaymentHistoryTableEntity[];
  myBundlesPayments: IPaymentHistoryTableEntity[];
  lastDeduction?: IPaymentHistoryTableEntity;
  lastTransaction?: IPaymentHistoryTableEntity;
  lastMyBundlesPayment?: IPaymentHistoryTableEntity;
  limit: number;
  loadingDeductionsCursor: number;
  loadingTransactionsCursor: number;
  loadingMyBundlesPaymentsCursor: number;
}

export const getCursors = ({
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
}: CursorsParams): Cursors => {
  const transactionsCursor =
    transactions.findIndex(
      tx => JSON.stringify(tx) === JSON.stringify(lastTransaction),
    ) + 1;

  const deductionsCursor =
    deductions.findIndex(
      deduction => JSON.stringify(deduction) === JSON.stringify(lastDeduction),
    ) + 1;

  const myBundlesPaymentsCursor =
    myBundlesPayments.findIndex(
      payment =>
        JSON.stringify(payment) === JSON.stringify(lastMyBundlesPayment),
    ) + 1;

  return paymentHistory.length <= limit
    ? {
        deductionsCursor: loadingDeductionsCursor,
        transactionsCursor: loadingTransactionsCursor,
        myBundlesPaymentsCursor: loadingMyBundlesPaymentsCursor,
      }
    : {
        deductionsCursor,
        transactionsCursor,
        myBundlesPaymentsCursor,
      };
};

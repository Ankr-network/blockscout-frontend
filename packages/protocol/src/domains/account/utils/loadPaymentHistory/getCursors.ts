import { IPaymentHistoryEntity } from 'multirpc-sdk';

export interface Cursors {
  deductionsCursor: number;
  transactionsCursor: number;
}

export interface CursorsParams {
  deductions: IPaymentHistoryEntity[];
  lastDeduction?: IPaymentHistoryEntity;
  lastTransaction?: IPaymentHistoryEntity;
  limit: number;
  loadingDeductionsCursor: number;
  loadingTransactionsCursor: number;
  paymentHistory: IPaymentHistoryEntity[];
  transactions: IPaymentHistoryEntity[];
}

export const getCursors = ({
  deductions,
  lastDeduction,
  lastTransaction,
  limit,
  loadingDeductionsCursor,
  loadingTransactionsCursor,
  paymentHistory,
  transactions,
}: CursorsParams): Cursors => {
  const transactionsCursor =
    transactions.findIndex(
      tx => JSON.stringify(tx) === JSON.stringify(lastTransaction),
    ) + 1;

  const deductionsCursor =
    deductions.findIndex(
      deduction => JSON.stringify(deduction) === JSON.stringify(lastDeduction),
    ) + 1;

  return paymentHistory.length <= limit
    ? {
        deductionsCursor: loadingDeductionsCursor,
        transactionsCursor: loadingTransactionsCursor,
      }
    : {
        deductionsCursor,
        transactionsCursor,
      };
};

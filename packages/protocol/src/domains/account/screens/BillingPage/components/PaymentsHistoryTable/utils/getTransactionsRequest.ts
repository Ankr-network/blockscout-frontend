import {
  PaymentHistoryParams,
  PaymentHistoryTableTimeframe,
  PaymentType,
} from 'domains/account/types';

import { getPaymentHistoryRequestTypes } from './getPaymentHistoryRequestTypes';
import { getTimeframeBorders } from './getTimeframeBorders';

export interface TransactionsRequestParams {
  deductionsCursor?: number;
  paymentType: PaymentType;
  timeframe: PaymentHistoryTableTimeframe;
  transactionsCursor?: number;
  myBundlesPaymentsCursor?: number;
}

export const getTransactionsRequest = ({
  deductionsCursor = 0,
  myBundlesPaymentsCursor = 0,
  paymentType,
  timeframe,
  transactionsCursor = 0,
}: TransactionsRequestParams): PaymentHistoryParams => ({
  ...getTimeframeBorders(timeframe),
  deductionsCursor,
  limit: 15,
  transactionsCursor,
  myBundlesPaymentsCursor,
  types: getPaymentHistoryRequestTypes(paymentType),
});

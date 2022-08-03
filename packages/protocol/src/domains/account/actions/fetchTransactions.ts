import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { PaymentHistory, PaymentHistoryParams } from 'domains/account/types';

import { loadPaymentHistory } from '../utils/loadPaymentHistory';

export const fetchTransactions = createSmartAction<
  RequestAction<PaymentHistory>
>('account/fetchPaymentHistory', (params: PaymentHistoryParams) => ({
  request: {
    promise: loadPaymentHistory(params),
  },
  meta: {
    getData: ({ deductionsCursor, list, transactionsCursor }, loadedData) => {
      const loadedTransactions = loadedData?.list || [];

      return {
        deductionsCursor,
        list: [...loadedTransactions, ...(list || [])],
        transactionsCursor,
      };
    },
  },
}));

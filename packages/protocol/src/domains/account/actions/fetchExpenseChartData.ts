import {
  IAggregatedPaymentHistoryRequest as Request,
  IAggregatedPaymentHistoryResponse as Response,
} from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { fetchAllPaymentHistory } from '../utils/fetchAllPaymentHistory';

export const fetchExpenseChartData = createSmartAction<RequestAction<Response>>(
  'account/fetchExpenseChartData',
  (params: Request) => ({
    request: {
      promise: fetchAllPaymentHistory(params),
    },
  }),
);

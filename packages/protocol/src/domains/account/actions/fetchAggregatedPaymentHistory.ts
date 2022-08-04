import {
  IAggregatedPaymentHistoryResponse as Response,
  IAggregatedPaymentHistoryRequest as Request,
} from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchAggregatedPaymentHistory = createSmartAction<
  RequestAction<Response>
>(
  'account/fetchAggregatedPaymentHistory',
  (params: Request, requestKey?: string) => ({
    request: {
      promise: (async (): Promise<Response> => {
        const service = await MultiService.getInstance();

        return service.getAggregatedPaymentHistory(params);
      })(),
    },
    meta: {
      requestKey,
    },
  }),
);

import {
  IPaymentHistoryEntity,
  IPaymentHistoryRequest,
  IPaymentHistoryReponse,
} from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchPaymentHistory = createSmartAction<
  RequestAction<IPaymentHistoryEntity[], IPaymentHistoryReponse>
>('account/fetchPaymentHistory', (params: IPaymentHistoryRequest) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.getPaymentHistory(params);
    })(),
  },
  meta: {
    cache: false,
    asMutation: false,
  },
}));

export const fetchPaymentHistoryMore = createSmartAction<
  RequestAction<IPaymentHistoryEntity[], IPaymentHistoryReponse>
>('account/fetchPaymentHistoryMore', (params: IPaymentHistoryRequest) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.getPaymentHistory(params);
    })(),
  },
  meta: {
    cache: false,
    mutations: {
      [fetchPaymentHistory.toString()]: {
        updateData: (oldData, newData) => {
          return {
            ...newData,
            data: [...oldData.data, ...newData.data],
          };
        },
      },
    },
  },
}));

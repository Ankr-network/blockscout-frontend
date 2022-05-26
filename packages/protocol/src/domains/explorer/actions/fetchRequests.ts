import { RequestAction } from '@redux-requests/core';
import { MultiService } from 'modules/api/MultiService';
import { IRequestsRequest, IRequestsResponse } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';

export const fetchRequests = createSmartAction<
  RequestAction<IRequestsResponse, IRequestsResponse>
>('explorer/fetchRequests', (params: IRequestsRequest) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    onRequest: () => {
      return {
        promise: (async (): Promise<IRequestsResponse> => {
          const { service } = MultiService.getInstance();

          const data = await service.getAccountGateway().getRequests(params);

          return data;
        })(),
      };
    },
  },
}));

export const fetchRequestsMore = createSmartAction<
  RequestAction<IRequestsResponse, IRequestsResponse>
>('explorer/fetchRequestsMore', (params: IRequestsRequest) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const data = await service.getAccountGateway().getRequests(params);

      return data;
    })(),
  },
  meta: {
    mutations: {
      [fetchRequests.toString()]: {
        updateData: (oldData, newData) => {
          return {
            ...newData,
            requests: [...oldData.requests, ...newData.requests],
          };
        },
      },
    },
  },
}));

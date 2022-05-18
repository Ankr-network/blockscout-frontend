import { RequestAction, RequestsStore } from '@redux-requests/core';
import { IWorkerGlobalStatus, Timeframe } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { fetchPublicChainsInfo } from './fetchPublicChainsInfo';
import { ResponseData } from 'modules/api/utils/ResponseData';
import {
  fetchChainTimeframeData,
  IApiChainDetails,
} from './fetchChainTimeframeData';

type IFetchChainDetailsResponseData = IWorkerGlobalStatus;

export const fetchChainDetails = createSmartAction<
  RequestAction<IFetchChainDetailsResponseData, IApiChainDetails>
>(
  'chains/fetchChainDetails',
  (chainId: string, timeframe: Timeframe, poll?: number) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      requestKey: chainId,
      takeLatest: false,
      cache: false,
      poll,
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async () => {
            const { data } = await store.dispatchRequest(
              fetchChainTimeframeData(chainId, timeframe),
            );

            return data;
          })(),
        };
      },
      asMutation: true,
      mutations: {
        [fetchPublicChainsInfo.toString()]: (
          data: ResponseData<typeof fetchPublicChainsInfo>,
          mutationData: IApiChainDetails,
        ): ResponseData<typeof fetchPublicChainsInfo> => {
          return data.map(item => {
            if (item.id === chainId) {
              return {
                ...item,
                totalRequests: mutationData.totalRequests,
              };
            }

            return item;
          });
        },
      },
    },
  }),
);

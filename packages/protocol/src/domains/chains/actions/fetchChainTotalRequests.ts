import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchChainDetails } from './fetchChainDetails';
import { fetchPublicChainsInfo } from './fetchPublicChainsInfo';

export interface IChainTotalRequests {
  chainId: string;
  totalRequests: BigNumber;
}

export const fetchChainTotalRequests = createSmartAction<
  RequestAction<any, IChainTotalRequests[]>
>('chains/fetchChainTotalRequests', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<any> => {
          const { data: chainList } = getQuery(store.getState(), {
            type: fetchPublicChainsInfo.toString(),
          });

          const data = await Promise.all(
            chainList.map((item: IApiChain) =>
              store.dispatchRequest(fetchChainDetails(item.id, '30d')),
            ),
          );

          const result: IChainTotalRequests[] = data.map(
            (item: any, index: number) => ({
              totalRequests: item.data?.totalRequests,
              chainId: chainList[index].id,
            }),
          );
          return result;
        })(),
      };
    },
  },
}));

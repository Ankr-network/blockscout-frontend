import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'store';
import { fetchChainDetails } from './fetchChainDetails';

export interface IChainTotalRequests {
  chainId: string;
  totalRequests: BigNumber;
}

export const fetchChainTotalRequests = createSmartAction<
  RequestAction<any, IChainTotalRequests[]>
>('chains/fetchChainTotalRequests', (chainList: string[]) => ({
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
          const data = await Promise.all(
            chainList.map(id =>
              store.dispatchRequest(fetchChainDetails(id, '30d')),
            ),
          );

          const result: IChainTotalRequests[] = data.map(
            (item: any, index: number) => ({
              totalRequests: item.data?.totalRequests,
              chainId: chainList[index],
            }),
          );
          return result;
        })(),
      };
    },
  },
}));

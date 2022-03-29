import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchPublicChains } from './fetchPublicChains';

export const fetchPublicChainsInfo = createSmartAction<
  RequestAction<null, IApiChain[]>
>('chains/fetchPublicChainsInfo', () => ({
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
          const [{ data: chains }, { data: nodes }] = await Promise.all([
            store.dispatchRequest(fetchPublicChains()),
            store.dispatchRequest(fetchChainNodes()),
          ]);

          if (!chains) return [];

          return chains?.map((chain: IApiChain) => ({
            ...chain,
            isArchive: nodes?.some(
              item => item.blockchain === chain.id && item.isArchive,
            ),
          }));
        })(),
      };
    },
  },
}));

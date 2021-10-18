import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchPrivateChains } from './fetchPrivateChains';

export const fetchPrivateChainDetails = createSmartAction<
  RequestAction<any, IApiChain>
>('chains/fetchPrivateChainDetails', (chainId: string) => ({
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
        promise: (async (): Promise<IApiChain> => {
          const { data: chains } = await store.dispatchRequest(
            fetchPrivateChains(),
          );

          const chain = chains?.find(item => item.id === chainId);

          if (!chain) {
            throw new Error('ChainId not found');
          }

          return chain;
        })(),
      };
    },
  },
}));

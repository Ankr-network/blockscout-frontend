import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { getQuery, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IApiChain } from '../api/queryChains';

export const fetchPrivateChainDetails = createSmartAction<
  RequestAction<null, IApiChain>
>('chains/fetchPrivateChainDetails', (chainId: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    onRequest: (_request, _action, store) => {
      return {
        promise: (async (): Promise<IApiChain> => {
          const { data: privateChains } = getQuery(store.getState(), {
            type: fetchPrivateChains.toString(),
            action: fetchPrivateChains,
          });

          const privateChainDetails = privateChains.find(
            item => item.id === chainId,
          );

          if (!privateChainDetails) {
            throw new Error('ChainId not found');
          }

          return privateChainDetails;
        })(),
      };
    },
  },
}));

import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { IApiChain } from 'domains/chains/api/queryChains';
import { Store } from 'store';
import { fetchProvider } from './fetchProvider';

export const fetchAvailableChains = createSmartAction<
  RequestAction<null, IApiChain[]>
>('infrastructure/fetchAvailableChains', () => ({
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
        promise: (async (): Promise<IApiChain[]> => {
          const { data: { chains = [] } = {} } = await store.dispatchRequest(
            fetchPublicChains(),
          );

          const { data: providerData } = getQuery(store.getState(), {
            type: fetchProvider.toString(),
            action: fetchProvider,
          });

          if (typeof providerData === 'object') {
            const { blockchains } = providerData;

            if (!blockchains || blockchains.length === 0) {
              return chains;
            }

            return blockchains
              .map(item => chains.find(el => el.id === item))
              .filter(Boolean) as IApiChain[];
          }

          return [];
        })(),
      };
    },
  },
}));

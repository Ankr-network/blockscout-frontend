import { DispatchRequest, RequestAction, getQuery } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { fetchProvider } from './fetchProvider';
import { IApiChain } from 'domains/chains/api/queryChains';

export const fetchAvailableChains = createSmartAction<
  RequestAction<null, IApiChain[]>
>('nodeProviders/fetchAvailableChains', () => ({
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
          const { data } = await store.dispatchRequest(fetchPublicChains());

          const { data: providerData } = getQuery(store.getState(), {
            type: fetchProvider.toString(),
            action: fetchProvider,
          });

          if (typeof providerData === 'object') {
            const { blockchains } = providerData;

            if (!blockchains || blockchains.length === 0) {
              return data || [];
            }

            return blockchains
              .map(item => data?.find(el => el.id === item))
              .filter(Boolean) as IApiChain[];
          }

          return [];
        })(),
      };
    },
  },
}));

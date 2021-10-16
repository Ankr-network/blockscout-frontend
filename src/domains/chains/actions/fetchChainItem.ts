import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { fetchChains, IApiChain } from './fetchChains';
import { fetchChainDetails, IApiChainDetails } from './fetchChainDetails';

interface ChainItemDetails {
  chain: IApiChain;
  chainDetails: IApiChainDetails;
}

export const fetchChainItem = createSmartAction<
  RequestAction<null, ChainItemDetails>
>('chains/fetchChainItem', (chainId: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    onRequest: (
      _request: any,
      _action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<ChainItemDetails> => {
          const [{ data: chainDetails }, { data: chains }] = await Promise.all([
            store.dispatchRequest(fetchChainDetails(chainId)),
            store.dispatchRequest(fetchChains()),
          ]);

          const chain = chains?.find(item => item.id === chainId);

          if (!chain || !chainDetails) {
            throw new Error('ChainId not found');
          }

          return { chain, chainDetails };
        })(),
      };
    },
  },
}));

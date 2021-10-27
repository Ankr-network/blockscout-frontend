import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';
import { fetchChainDetails, IApiChainDetails } from './fetchChainDetails';

interface ChainItemDetails {
  chain: IApiChain;
  chainDetails: IApiChainDetails;
}

export const fetchChain = createSmartAction<
  RequestAction<null, ChainItemDetails>
>('chains/fetchChain', (chainId: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<ChainItemDetails> => {
          const [{ data: chainDetails }, { data: chains }] = await Promise.all([
            store.dispatchRequest(fetchChainDetails(chainId)),
            store.dispatchRequest(fetchPublicChains()),
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

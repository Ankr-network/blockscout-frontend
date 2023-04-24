import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { ChainId } from '../api/chain';
import { IApiChain } from '../api/queryChains';
import { isPolygonZkEvm } from './fetchChainUtils';
import { fetchPublicChains } from './fetchPublicChains';

export interface IChainItemDetails {
  chain?: IApiChain;
}

const CHAIN_ID_FOR_BLOCKCHAINS_LIST = 'polygon_zkevm';

export const fetchChain = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchChain', (chainId: ChainId) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    poll: 30,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const { data: chains } = await store.dispatchRequest(
            fetchPublicChains(),
          );

          const currentChainId = isPolygonZkEvm(chainId)
            ? CHAIN_ID_FOR_BLOCKCHAINS_LIST
            : chainId;

          const chain = chains?.find(item => item.id === currentChainId);

          const location = window?.location.origin;
          const rpcUrl =
            chainId === ChainId.Nervos ? `${location}/nervos` : location;

          if (!chain) {
            return { chain };
          }

          return {
            chain: {
              ...chain,
              id: chainId,
              rpcUrls: [rpcUrl],
            },
          };
        })(),
      };
    },
  },
}));

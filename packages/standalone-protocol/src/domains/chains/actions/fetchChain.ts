import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { ChainId } from '../api/chain';
import { IApiChain } from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';

export interface IChainItemDetails {
  chain?: IApiChain;
}

const ERIGON_CHAIN = {
  icon: '',
  id: 'erigonbsc',
  name: 'Erigon bsc',
  rpcUrls: ['https://erigonbsc.public-rpc.com'],
  wsUrls: [],
};

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

          const chain = chains?.find(item => item.id === chainId);

          const location = window?.location.origin;
          const rpcUrl =
            chainId === ChainId.Nervos ? `${location}/nervos` : location;

          if (chainId === ChainId.Erigonbsc && !chain) {
            return {
              chain: {
                ...ERIGON_CHAIN,
                rpcUrls: [rpcUrl],
              },
            };
          }

          if (!chain) {
            return { chain };
          }

          return {
            chain: {
              ...chain,
              rpcUrls: [rpcUrl],
            },
          };
        })(),
      };
    },
  },
}));

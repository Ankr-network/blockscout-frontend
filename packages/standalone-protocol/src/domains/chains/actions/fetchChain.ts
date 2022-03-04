import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';

export interface IChainItemDetails {
  chain?: IApiChain;
}

const ERIGON_CHAIN = {
  icon: '',
  id: 'erigonbsc',
  name: 'Erigon bsc',
  rpcUrl: 'https://erigonbsc.public-rpc.com',
  wsUrl: '',
};

export const fetchChain = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchChain', (chainId: string) => ({
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
          const rpcUrl = chainId === 'nervos' ? `${location}/nervos` : location;

          if (chainId === 'erigonbsc' && !chain) {
            return {
              chain: {
                ...ERIGON_CHAIN,
                rpcUrl,
              },
            };
          }

          if (!chain) {
            return { chain };
          }

          return {
            chain: {
              ...chain,
              rpcUrl,
            },
          };
        })(),
      };
    },
  },
}));

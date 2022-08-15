import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { INodeEntity } from 'multirpc-sdk';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchPublicChains } from './fetchPublicChains';

export interface IChainItemDetails {
  chain: IApiChain;
  nodes?: INodeEntity[];
}

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
          const [{ data: chains }, { data: nodes }] = await Promise.all([
            store.dispatchRequest(fetchPublicChains()),
            store.dispatchRequest(fetchChainNodes(chainId)),
          ]);

          const chain = chains?.find(item => item.id === chainId);

          if (!chain) {
            throw new Error('ChainId not found');
          }

          return {
            chain,
            nodes,
          };
        })(),
      };
    },
  },
}));

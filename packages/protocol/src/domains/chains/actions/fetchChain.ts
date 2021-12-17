import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity, IWorkerNodesWeight } from '@ankr.com/multirpc';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchNodesWeight } from './fetchNodesWeight';

export interface IChainItemDetails {
  chain: IApiChain;
  nodes?: INodeEntity[];
  nodesWeight?: IWorkerNodesWeight;
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
          const [
            { data: chains },
            { data: nodes },
            { data: nodesWeight },
          ] = await Promise.all([
            store.dispatchRequest(fetchPublicChains()),
            store.dispatchRequest(fetchChainNodes(chainId)),
            store.dispatchRequest(fetchNodesWeight()),
          ]);

          const chain = chains?.find(item => item.id === chainId);

          if (!chain) {
            throw new Error('ChainId not found');
          }

          return {
            chain,
            nodes,
            nodesWeight,
          };
        })(),
      };
    },
  },
}));

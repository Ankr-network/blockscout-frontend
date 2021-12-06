import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity, IWorkerNodesWeight } from '@ankr.com/multirpc';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchNodesWeight } from './fetchNodesWeight';
import { fetchUserLocation } from './fetchUserLocation';

export interface IChainItemDetails {
  chain: IApiChain;
  nodes?: INodeEntity[];
  nodesWeight?: IWorkerNodesWeight;
  userCountryCode?: string;
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
            { data: userCountryCode },
          ] = await Promise.all([
            store.dispatchRequest(fetchPublicChains()),
            store.dispatchRequest(fetchChainNodes(chainId)),
            store.dispatchRequest(fetchNodesWeight()),
            store.dispatchRequest(fetchUserLocation()),
          ]);

          const chain = chains?.find(item => item.id === chainId);

          if (!chain) {
            throw new Error('chainId not found');
          }

          return {
            chain,
            nodes,
            nodesWeight,
            userCountryCode,
          };
        })(),
      };
    },
  },
}));

import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

import { Store } from 'store';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchNodesWeight } from './fetchNodesWeight';
import { ChainId } from '../api/chain';

export interface IChainItemDetails {
  nodes?: INodeEntity[];
  nodesWeight?: IWorkerNodesWeight[];
}

export const fetchChainNodesData = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchChainNodesData', (chainId: ChainId) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    poll: 30,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const [{ data: nodes }, { data: nodesWeight }] = await Promise.all([
            store.dispatchRequest(fetchChainNodes(chainId)),
            store.dispatchRequest(fetchNodesWeight()),
          ]);

          return {
            nodes,
            nodesWeight,
          };
        })(),
      };
    },
  },
}));

import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Timeframe, INodeEntity, IWorkerNodesWeight } from '@ankr.com/multirpc';

import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchPublicChains } from './fetchPublicChains';
import { fetchChainDetails, IApiChainDetails } from './fetchChainDetails';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchNodesWeight } from './fetchNodesWeight';

export interface IChainItemDetails {
  chain: IApiChain;
  details: Record<Timeframe, IApiChainDetails>;
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
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const [
            { data: chainDetails30d },
            { data: chainDetails7d },
            { data: chainDetails24h },
            { data: chains },
            { data: nodes },
            { data: nodesWeight },
          ] = await Promise.all([
            store.dispatchRequest(fetchChainDetails(chainId, '30d')),
            store.dispatchRequest(fetchChainDetails(chainId, '7d')),
            store.dispatchRequest(fetchChainDetails(chainId, '24h')),
            store.dispatchRequest(fetchPublicChains()),
            store.dispatchRequest(fetchChainNodes(chainId)),
            store.dispatchRequest(fetchNodesWeight()),
          ]);

          const chain = chains?.find(item => item.id === chainId);

          if (
            !chain ||
            !chainDetails30d ||
            !chainDetails7d ||
            !chainDetails24h
          ) {
            throw new Error('ChainId not found');
          }

          return {
            chain,
            nodes,
            nodesWeight,
            details: {
              '30d': chainDetails30d,
              '7d': chainDetails7d,
              '24h': chainDetails24h,
            },
          };
        })(),
      };
    },
  },
}));

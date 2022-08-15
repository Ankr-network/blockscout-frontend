import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';
import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchNodesWeight } from './fetchNodesWeight';

export interface IChainNodesData {
  nodes: INodeEntity[];
  nodesWeight: IWorkerNodesWeight[];
}

export const fetchChainNodesData = createSmartAction<
  RequestAction<null, IChainNodesData>,
  [IApiChain['id'][]]
>('chains/fetchChain', (chains: IApiChain['id'][]) => ({
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
        promise: (async (): Promise<IChainNodesData> => {
          const fetchNodesWeightPromise = store.dispatchRequest(
            fetchNodesWeight(),
          );

          const fetchChainNodesPromise = Promise.all(
            chains.map(id => store.dispatchRequest(fetchChainNodes(id))),
          );

          const [fetchNodesWeightDataResponse, fetchNodesResponse] =
            await Promise.all([
              fetchNodesWeightPromise,
              fetchChainNodesPromise,
            ]);

          const { data: nodesWeight = [] } = fetchNodesWeightDataResponse;

          const nodes = fetchNodesResponse.reduce<INodeEntity[]>(
            (acc, { data }) => [...acc, ...data!],
            [],
          );

          return {
            nodesWeight,
            nodes,
          };
        })(),
      };
    },
  },
}));

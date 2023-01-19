import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

import { getStandaloneUrl, StandaloneType } from '../api/chain';
import { MultiService } from 'modules/api/MultiService';

export interface IChainItemDetails {
  nodes?: INodeEntity[];
  nodesWeight?: IWorkerNodesWeight[];
}

export const fetchStandaloneChainNodesData = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchStandaloneChainNodesData', (chainId: StandaloneType) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    poll: 30,
    onRequest: () => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const url = getStandaloneUrl(chainId);

          const [nodes, nodesWeight] = await Promise.all([
            MultiService.getService()
              .getStandalonePublicGateway(url)
              .getNodes(),
            MultiService.getService()
              .getStandalonePublicGateway(url)
              .getNodesWeight(),
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

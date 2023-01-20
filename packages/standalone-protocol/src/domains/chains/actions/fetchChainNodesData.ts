import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

import { ChainId, getStandaloneUrl, StandaloneType } from '../api/chain';
import { MultiService } from 'modules/api/MultiService';

export interface IChainItemDetails {
  nodes?: INodeEntity[];
  nodesWeight?: IWorkerNodesWeight[];
}

const fetchNodesData = (chainId: ChainId) => {
  return Promise.all([
    MultiService.getService().getPublicGateway().getNodes(chainId),
    MultiService.getService().getPublicGateway().getNodesWeight(),
  ]);
};

const fetchStandaloneNodesData = (chainId: StandaloneType) => {
  const url = getStandaloneUrl(chainId);

  return Promise.all([
    MultiService.getService().getStandalonePublicGateway(url).getNodes(),
    MultiService.getService().getStandalonePublicGateway(url).getNodesWeight(),
  ]);
};

export const fetchChainNodesData = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchChainNodesData', (chainId: ChainId, isStandalone: boolean) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    poll: 30,
    onRequest: () => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const [nodes, nodesWeight] = isStandalone
            ? await fetchStandaloneNodesData(chainId as StandaloneType)
            : await fetchNodesData(chainId);

          return {
            nodes,
            nodesWeight,
          };
        })(),
      };
    },
  },
}));

import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';

import { ChainId } from '../api/chain';
import { MultiService } from 'modules/api/MultiService';
import { API_ENV } from 'modules/common/utils/environment';

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

const stagingUrls = {
  [ChainId.BSC]: 'https://staging.bscrpc.com/',
  [ChainId.Polygon]: 'https://staging.polygon-rpc.com/',
  [ChainId.Fantom]: 'https://staging.ftm.tools/',
};

type StandaloneType = ChainId.BSC | ChainId.Polygon | ChainId.Fantom;

const getUrl = (chainId: StandaloneType) => {
  if (API_ENV === 'prod') return '/';

  return stagingUrls[chainId];
};

const fetchStandaloneNodesData = (chainId: StandaloneType) => {
  const url = getUrl(chainId);

  return Promise.all([
    MultiService.getService().getPublicGateway().getStandaloneNodes(url),
    MultiService.getService().getPublicGateway().getStandaloneNodesWeight(url),
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

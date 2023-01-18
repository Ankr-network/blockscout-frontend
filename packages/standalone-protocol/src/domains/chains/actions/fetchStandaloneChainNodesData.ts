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
          const url = getUrl(chainId);

          const [nodes, nodesWeight] = await Promise.all([
            MultiService.getService()
              .getPublicGateway()
              .getStandaloneNodes(url),
            MultiService.getService()
              .getPublicGateway()
              .getStandaloneNodesWeight(url),
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

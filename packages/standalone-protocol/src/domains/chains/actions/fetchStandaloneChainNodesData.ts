import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodeEntity } from 'multirpc-sdk';
import { API_ENV } from 'modules/common/utils/environment';

import { ChainId } from '../api/chain';
import { MultiService } from 'modules/api/MultiService';

export interface IChainItemDetails {
  nodes?: INodeEntity[];
}

const stagingUrls = {
  [ChainId.BSC]: 'https://staging.bscrpc.com/',
  [ChainId.Polygon]: 'https://staging.polygon-rpc.com/',
  [ChainId.Fantom]: 'https://staging.polygon-rpc.com/',
};

const prodUrls = {
  [ChainId.BSC]: 'https://bscrpc.com/',
  [ChainId.Polygon]: 'https://polygon-rpc.com/',
  [ChainId.Fantom]: 'https://polygon-rpc.com/',
};

export const fetchStandaloneChainNodesData = createSmartAction<
  RequestAction<null, IChainItemDetails>
>('chains/fetchStandaloneChainNodesData', (chainId: ChainId) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    poll: 30,
    onRequest: () => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const urls = API_ENV === 'prod' ? prodUrls : stagingUrls;

          // @ts-ignore
          const url = urls[chainId];

          const nodes = await MultiService.getService()
            .getPublicGateway()
            .getStandaloneNodes(url);

          return {
            nodes,
          };
        })(),
      };
    },
  },
}));

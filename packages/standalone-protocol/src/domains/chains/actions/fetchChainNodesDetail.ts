import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodesDetailEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchChainNodesDetail = createSmartAction<
  RequestAction<INodesDetailEntity[]>
>('chains/fetchChainNodesDetail', (chainId?: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    poll: 30,
    onRequest: () => {
      return {
        promise: (async (): Promise<INodesDetailEntity[]> => {
          const nodesDetail = await MultiService.getService()
            .getPublicGateway()
            .getNodesDetail();

          const data = chainId
            ? nodesDetail.filter(item => chainId === item.id)
            : nodesDetail;

          return data;
        })(),
      };
    },
  },
}));

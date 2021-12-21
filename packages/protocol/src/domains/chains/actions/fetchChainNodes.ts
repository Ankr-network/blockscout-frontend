import { RequestAction } from '@redux-requests/core';
import { INodeEntity } from '@ankr.com/multirpc';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchChainNodes = createSmartAction<
  RequestAction<INodeEntity[], INodeEntity[]>
>('chains/fetchChainNodes', (blockchain: string) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const data = await service.getWorkerGateway().apiGetNodes(blockchain);

      return data;
    })(),
  },
  meta: {
    asMutation: false,
    takeLatest: false,
    getData: data => data,
  },
}));

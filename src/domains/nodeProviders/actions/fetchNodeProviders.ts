import { INodeEntity } from '@ankr.com/multirpc/dist/types/worker';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from '../../../modules/api/MultiService';

export const fetchNodeProviders = createSmartAction<
  RequestAction<INodeEntity[], INodeEntity[]>
>('nodeProviders/fetchNodeProviders', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const nodes = await service.getWorkerGateway().apiGetNodes();

      return nodes;
    })(),
  },
  meta: {
    cache: false,
    asMutation: false,
    getData: data => data,
  },
}));

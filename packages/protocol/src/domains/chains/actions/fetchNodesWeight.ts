import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWorkerNodesWeight } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchNodesWeight = createSmartAction<
  RequestAction<IWorkerNodesWeight[], IWorkerNodesWeight[]>
>('chains/fetchNodesWeight', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const nodesWeight = await service.getNodesWeight();

      return nodesWeight;
    })(),
  },
  meta: {
    cache: true,
    asMutation: false,
  },
}));

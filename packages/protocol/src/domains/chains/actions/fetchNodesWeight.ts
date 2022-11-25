import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWorkerNodesWeight } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';

export const fetchNodesWeight = createSmartAction<
  RequestAction<IWorkerNodesWeight[], IWorkerNodesWeight[]>
>('chains/fetchNodesWeight', () => ({
  request: {
    promise: (async () => {
      return MultiService.getService().getPublicGateway().getNodesWeight();
    })(),
  },
  meta: {
    cache: true,
    asMutation: false,
  },
}));

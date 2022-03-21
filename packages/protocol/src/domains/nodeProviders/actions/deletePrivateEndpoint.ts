import { IJwtToken, IPrivateEndpoint, IWorkerEndpoint } from 'multirpc-sdk';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';
import { fetchEndpoints } from './fetchEndpoints';

type Action = RequestAction<IPrivateEndpoint, IWorkerEndpoint>;
type Params = [string];

export const deletePrivateEndpoint = createAction<Action, Params>(
  'nodeProviders/deletePrivateEndpoint',
  endpointId => ({
    request: {
      promise: async (_store: RequestsStore, jwtToken: IJwtToken) => {
        const { service } = MultiService.getInstance();

        await service.deletePrivateEndpoint(jwtToken, endpointId);
      },
    },
    meta: {
      asMutation: true,
      onRequest: credentialsGuard,
      onSuccess: (_response, _action, store) => {
        store.dispatchRequest(fetchEndpoints());
      },
      requestKey: endpointId,
      showNotificationOnError: true,
    },
  }),
);

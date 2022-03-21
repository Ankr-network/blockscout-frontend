import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken, IWorkerEndpoint, IPrivateEndpoint } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';

export const apiAddPrivateEndpoint = createSmartAction<
  RequestAction<IPrivateEndpoint, IWorkerEndpoint>
>(
  'nodeProviders/apiAddPrivateEndpoint',
  (privateEndpoint: IPrivateEndpoint) => ({
    request: {
      promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
        const { service } = MultiService.getInstance();

        const endpoint = await service.addPrivateEndpoint(
          jwtToken,
          privateEndpoint,
        );

        return endpoint;
      },
    },
    meta: {
      asMutation: true,
      onRequest: credentialsGuard,
      showNotificationOnError: true,
    },
  }),
);

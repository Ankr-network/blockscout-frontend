import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken, IWorkerEndpoint, IPrivateEndpoint } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { fetchEndpoints } from './fetchEndpoints';

export const apiEditPrivateEndpoint = createSmartAction<
  RequestAction<IPrivateEndpoint, IWorkerEndpoint>
>(
  'infrastructure/apiEditPrivateEndpoint',
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

      onSuccess: (
        response: any,
        _action: RequestAction,
        store: RequestsStore,
      ) => {
        store.dispatchRequest(fetchEndpoints(true));

        return response;
      },
    },
  }),
);

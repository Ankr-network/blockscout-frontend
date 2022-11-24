import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWorkerEndpoint, IPrivateEndpoint } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { fetchEndpoints } from './fetchEndpoints';

export const apiEditPrivateEndpoint = createSmartAction<
  RequestAction<IPrivateEndpoint, IWorkerEndpoint>
>(
  'infrastructure/apiEditPrivateEndpoint',
  (privateEndpoint: IPrivateEndpoint) => ({
    request: {
      promise: async () => {
        const service = MultiService.getService();

        const endpoint = await service
          .getWorkerGateway()
          .addPrivateEndpoint(privateEndpoint);

        return endpoint;
      },
    },
    meta: {
      asMutation: true,
      onRequest: credentialsGuard,

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

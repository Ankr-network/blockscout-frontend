import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWorkerEndpoint, IPrivateEndpoint } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';

export const apiAddPrivateEndpoint = createSmartAction<
  RequestAction<IPrivateEndpoint, IWorkerEndpoint>
>(
  'infrastructure/apiAddPrivateEndpoint',
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
    },
  }),
);

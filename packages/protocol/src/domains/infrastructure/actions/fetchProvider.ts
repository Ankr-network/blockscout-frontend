import { IProvider } from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from '../../../modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';

export const fetchProvider = createSmartAction<
  RequestAction<IProvider, IProvider>
>('infrastructure/fetchProvider', () => ({
  request: {
    promise: async () => {
      const service = MultiService.getService();

      const provider = await service.getWorkerGateway().getProvider();

      return provider;
    },
  },
  meta: {
    asMutation: false,
    getData: data => data,
    onRequest: credentialsGuard,
    hideNotificationOnError: true,
  },
}));

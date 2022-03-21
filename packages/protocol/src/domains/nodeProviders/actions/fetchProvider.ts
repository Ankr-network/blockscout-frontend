import { IJwtToken, IProvider } from 'multirpc-sdk';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from '../../../modules/api/MultiService';
import { credentialsGuard } from 'modules/auth/utils/credentialsGuard';

export const fetchProvider = createSmartAction<
  RequestAction<IProvider, IProvider>
>('nodeProviders/fetchProvider', () => ({
  request: {
    promise: async (store: RequestsStore, jwtToken: IJwtToken) => {
      const { service } = MultiService.getInstance();

      const provider = await service.fetchProvider(jwtToken);

      return provider;
    },
  },
  meta: {
    asMutation: false,
    getData: data => data,
    onRequest: credentialsGuard,
  },
}));

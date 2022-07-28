import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { withStore } from '../utils/withStore';
import {
  connectProvider,
  disconnectService,
  getCachedData,
  IConnect,
  loginAndCacheAuthData,
} from './connectUtils';
import { hasMetamask } from '../utils/hasMetamask';
import { resetAuthData } from '../store/authSlice';

export const connect = createSmartAction<RequestAction<IConnect, IConnect>>(
  'auth/connect',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        await connectProvider();

        const service = await MultiService.getInstance();

        const cachedData = await getCachedData(service, store);

        if (cachedData) return cachedData;

        const authData = await loginAndCacheAuthData(service, store);

        return authData;
      },
    },
    meta: {
      onRequest: withStore,
      asMutation: false,
      getData: data => data,
      onError: async (
        error: Error,
        _action: RequestAction,
        store: RequestsStore,
      ) => {
        if (hasMetamask()) {
          await disconnectService();

          store.dispatch(resetAuthData());
          store.dispatch(resetRequests([connect.toString()]));
        }

        throw error;
      },
    },
  }),
);

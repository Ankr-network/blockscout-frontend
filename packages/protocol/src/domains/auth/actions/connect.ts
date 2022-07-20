import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { withStore } from '../utils/withStore';
import {
  connectProvider,
  getCachedData,
  IConnect,
  loginAndCacheAuthData,
} from './connectUtils';
// eslint-disable-next-line import/no-cycle
import { disconnect } from './disconnect';
import { hasMetamask } from '../utils/hasMetamask';

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
      onError: (error: Error, _action: RequestAction, store: RequestsStore) => {
        if (hasMetamask()) {
          store.dispatch(disconnect());
        }

        throw error;
      },
    },
  }),
);

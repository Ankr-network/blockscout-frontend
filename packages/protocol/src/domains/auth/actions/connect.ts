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
    },
  }),
);

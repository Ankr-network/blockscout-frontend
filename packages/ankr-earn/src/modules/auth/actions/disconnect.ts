import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';
import { AvailableWriteProviders } from 'provider/providerManager/types';
import { createAction } from 'redux-smart-actions';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';
import { connect } from './connect';

export const disconnect = createAction<
  RequestAction,
  [AvailableWriteProviders]
>('auth/disconnect', providerId => ({
  request: {
    promise: async () => {
      const providerManager = ProviderManagerSingleton.getInstance();
      providerManager.disconnect(providerId);
    },
  },
  meta: {
    asMutation: true,
    silent: true,
    showNotificationOnError: true,
    requestKey: getAuthRequestKey(providerId),
    onRequest: withStore,
    onSuccess: (
      _response: any,
      _action: RequestAction,
      store: RequestsStore,
    ) => {
      const requestsToReset = [
        {
          requestType: connect.toString(),
          requestKey: getAuthRequestKey(providerId),
        },
      ];

      store.dispatch(resetRequests(requestsToReset));
    },
  },
}));

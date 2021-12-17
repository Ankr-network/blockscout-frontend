import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { ProviderManager } from 'modules/api/ProviderManager';
import { withStore } from 'modules/common/utils/withStore';
import { createAction } from 'redux-smart-actions';
import { AvailableProviders } from '../../api/ProviderManager/types';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';
import { connect } from './connect';

export const disconnect = createAction<RequestAction, [AvailableProviders]>(
  'auth/disconnect',
  providerId => ({
    request: {
      promise: async () => {
        ProviderManager.disconnect(providerId);
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
            requestKey: `${providerId}`,
          },
        ];

        store.dispatch(resetRequests(requestsToReset));
      },
    },
  }),
);

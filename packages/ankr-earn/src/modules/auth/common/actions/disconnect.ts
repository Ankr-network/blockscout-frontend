import { AvailableWriteProviders } from '@ankr.com/provider-core';
import {
  RequestAction,
  RequestsStore,
  resetRequests,
} from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { withStore } from 'modules/common/utils/withStore';

import { setProviderStatus } from '../store/authSlice';
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
      _response,
      _action: RequestAction,
      { dispatch }: RequestsStore,
    ) => {
      dispatch(
        setProviderStatus({
          providerId,
          isActive: false,
          address: undefined,
          walletId: undefined,
          wallet: undefined,
        }),
      );

      const requestsToReset = [
        {
          requestType: connect.toString(),
          requestKey: getAuthRequestKey(providerId),
        },
      ];

      dispatch(resetRequests(requestsToReset));
    },
  },
}));

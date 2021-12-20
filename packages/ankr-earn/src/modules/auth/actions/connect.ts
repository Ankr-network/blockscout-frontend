import { RequestAction } from '@redux-requests/core';
import { ProviderManager } from 'modules/api/ProviderManager';
import { Web3Address } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';
import { createAction } from 'redux-smart-actions';
import { AvailableProviders } from '../../api/ProviderManager/types';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

export interface IConnect {
  isConnected: boolean;
  address?: Web3Address;
}

export const connect = createAction<
  RequestAction<IConnect, IConnect>,
  [AvailableProviders]
>('auth/connect', providerId => ({
  request: {
    promise: async () => {
      const provider = await ProviderManager.getProvider(providerId);

      return {
        isConnected: provider.isConnected(),
        address: provider.getCurrentAccount(),
      };
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    requestKey: getAuthRequestKey(providerId),
    getData: data => data,
    onRequest: withStore,
  },
}));

import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AvailableWriteProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';

import { getAuthRequestKey } from '../utils/getAuthRequestKey';

import { connect, IConnect } from './connect';

interface ISwitchNetworkArgs {
  providerId: AvailableWriteProviders;
  address: string;
}

export const updateAccountAddress = createAction<
  RequestAction,
  [ISwitchNetworkArgs]
>('auth/updateAccountAddress', ({ providerId, address }) => {
  const authRequestKey = getAuthRequestKey(providerId);
  const connectAction = connect.toString() + authRequestKey;

  return {
    request: {
      promise: (async () => {
        const provider =
          await ProviderManagerSingleton.getInstance().getProvider(providerId);
        provider.currentAccount = address;
      })(),
    },
    meta: {
      asMutation: true,
      requestKey: authRequestKey,
      showNotificationOnError: true,
      mutations: {
        [connectAction]: (data: IConnect): IConnect => ({
          ...data,
          address,
        }),
      },
    },
  };
});

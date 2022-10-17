import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { AvailableWriteProviders } from 'common';

import {
  IProviderStatus,
  selectProvidersData,
  setProviderStatus,
} from '../store/authSlice';
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
      onSuccess: (
        response: { data: undefined },
        _action: RequestAction,
        store: RequestsStore,
      ) => {
        const providersData = selectProvidersData(store.getState());
        const currProviderState: IProviderStatus | undefined =
          providersData[providerId];

        if (typeof currProviderState !== 'undefined') {
          store.dispatch(
            setProviderStatus({
              providerId,
              isActive: currProviderState.isActive,
              address,
              walletId: currProviderState.walletId,
            }),
          );
        }

        return response;
      },
    },
  };
});

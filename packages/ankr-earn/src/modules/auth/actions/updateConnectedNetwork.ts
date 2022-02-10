import { RequestAction } from '@redux-requests/core';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { AvailableWriteProviders } from 'provider/providerManager/types';
import { createAction } from 'redux-smart-actions';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';
import { connect, IConnect } from './connect';

interface ISwitchNetworkArgs {
  providerId: AvailableWriteProviders;
  chainId: number;
}

export const updateConnectedNetwork = createAction<
  RequestAction,
  [ISwitchNetworkArgs]
>('auth/updateConnectedNetwork', ({ providerId, chainId }) => {
  const authRequestKey = getAuthRequestKey(providerId);
  const connectAction = connect.toString() + authRequestKey;

  return {
    request: {
      promise: (async () => {
        const provider =
          await ProviderManagerSingleton.getInstance().getProvider(providerId);
        provider.currentChain = chainId;
      })(),
    },
    meta: {
      asMutation: true,
      requestKey: authRequestKey,
      showNotificationOnError: true,
      mutations: {
        [connectAction]: (data: IConnect): IConnect => ({
          ...data,
          chainId,
        }),
      },
    },
  };
});

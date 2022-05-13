import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  EthereumWeb3KeyProvider,
} from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { connect, IConnect } from 'modules/auth/common/actions/connect';
import { getAuthRequestKey } from 'modules/auth/common/utils/getAuthRequestKey';

interface ISwitchNetworkArgs {
  providerId: AvailableWriteProviders;
  chainId: EEthereumNetworkId;
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
          (await ProviderManagerSingleton.getInstance().getProvider(
            providerId,
          )) as EthereumWeb3KeyProvider;

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

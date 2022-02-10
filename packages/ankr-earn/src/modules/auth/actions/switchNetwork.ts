import { RequestAction } from '@redux-requests/core';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';
import { AvailableWriteProviders } from 'provider/providerManager/types';
import { createAction } from 'redux-smart-actions';
import { updateConnectedNetwork } from './updateConnectedNetwork';

interface ISwitchNetworkArgs {
  providerId: AvailableWriteProviders;
  chainId: number;
}

export const switchNetwork = createAction<RequestAction, [ISwitchNetworkArgs]>(
  'auth/switchNetwork',
  ({ providerId, chainId }) => ({
    request: {
      promise: async () => {
        const provider =
          await ProviderManagerSingleton.getInstance().getProvider(providerId);
        await provider.switchNetwork(chainId);
        return chainId;
      },
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onRequest: withStore,
      onSuccess: (response, _action, store) => {
        store.dispatch(
          updateConnectedNetwork({
            providerId,
            chainId,
          }),
        );
        return response;
      },
    },
  }),
);

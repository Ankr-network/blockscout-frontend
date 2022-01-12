import { RequestAction } from '@redux-requests/core';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { withStore } from 'modules/common/utils/withStore';
import { AvailableProviders } from 'provider/providerManager/types';
import { createAction } from 'redux-smart-actions';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';
import { connect, IConnect } from './connect';

interface ISwitchNetworkArgs {
  providerId: AvailableProviders;
  chainId: number;
}

export const switchNetwork = createAction<RequestAction, [ISwitchNetworkArgs]>(
  'auth/switchNetwork',
  ({ providerId, chainId }) => {
    const authRequestKey = getAuthRequestKey(providerId);
    const connectAction = connect.toString() + authRequestKey;

    return {
      request: {
        promise: async () => {
          const provider =
            await ProviderManagerSingleton.getInstance().getProvider(
              providerId,
            );
          await provider.switchNetwork(chainId);
          return chainId;
        },
      },
      meta: {
        asMutation: true,
        mutations: {
          [connectAction]: (data: IConnect): IConnect => ({
            ...data,
            chainId: chainId,
          }),
        },
        showNotificationOnError: true,
        requestKey: authRequestKey,
        onRequest: withStore,
      },
    };
  },
);

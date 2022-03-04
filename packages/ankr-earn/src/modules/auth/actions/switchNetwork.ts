import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AvailableWriteProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { SupportedChainIDS } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { getAuthRequestKey } from '../utils/getAuthRequestKey';

import { connect, IConnect } from './connect';

interface ISwitchNetworkArgs {
  providerId: AvailableWriteProviders;
  chainId: SupportedChainIDS;
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
          return provider.switchNetwork(chainId);
        },
      },
      meta: {
        asMutation: true,
        showNotificationOnError: true,
        onRequest: withStore,
        mutations: {
          [connectAction]: (data: IConnect): IConnect => ({
            ...data,
            chainId,
          }),
        },
      },
    };
  },
);

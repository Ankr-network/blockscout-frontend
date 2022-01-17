import { RequestAction } from '@redux-requests/core';
import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { Web3Address } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';
import { AvailableProviders } from 'provider/providerManager/types';
import { createAction } from 'redux-smart-actions';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

export interface IConnect {
  isConnected: boolean;
  address: Web3Address;
  chainId: number;
  walletName: string;
  walletIcon?: string;
}

export const connect = createAction<
  RequestAction<IConnect, IConnect>,
  [AvailableProviders]
>('auth/connect', providerId => ({
  request: {
    promise: async (): Promise<IConnect> => {
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = await providerManager.getProvider(providerId);
      const { icons, name: walletName } = provider.getWalletMeta();

      return {
        isConnected: provider.isConnected(),
        address: provider.getCurrentAccount(),
        chainId: provider.getCurrentChain(),
        walletName,
        walletIcon: icons?.length ? icons[0] : undefined,
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

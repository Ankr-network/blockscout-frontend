import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AvailableWriteProviders } from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { Web3Address } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';

import { setProviderStatus } from '../store/authSlice';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

export interface IConnect {
  isConnected: boolean;
  address: Web3Address;
  chainId: number;
  providerId: AvailableWriteProviders;
  walletName: string;
  walletId: string;
  walletIcon?: string;
}

export const connect = createAction<
  RequestAction<IConnect, IConnect>,
  [AvailableWriteProviders, string?]
>('auth/connect', (providerId: AvailableWriteProviders, wallet) => ({
  request: {
    promise: async (): Promise<IConnect> => {
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = await providerManager.getProvider(providerId, wallet);
      const { icon, name: walletName, id: walletId } = provider.getWalletMeta();

      return {
        isConnected: provider.isConnected(),
        address: provider.currentAccount,
        chainId: provider.currentChain,
        providerId,
        walletName,
        walletId,
        walletIcon: icon,
      };
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    requestKey: getAuthRequestKey(providerId),
    getData: data => data,
    onRequest: withStore,
    onSuccess: (
      response: { data: IConnect },
      _action: RequestAction,
      { dispatch }: RequestsStore,
    ) => {
      dispatch(
        setProviderStatus({
          providerId,
          isActive: true,
          walletId: response.data.walletId,
        }),
      );

      return response;
    },
  },
}));

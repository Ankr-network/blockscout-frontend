import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { PolkadotProvider } from 'polkadot';
import {
  Address,
  AvailableWriteProviders,
  Web3KeyWriteProvider,
} from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { Web3Address } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';

import { setProviderStatus } from '../store/authSlice';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

type TOnModalClose = () => void;

export interface IConnect {
  isConnected: boolean;
  address: Web3Address;
  addresses: Address[];
  chainId: number;
  chainType: string | null;
  providerId: AvailableWriteProviders;
  walletName: string;
  walletId: string;
  walletIcon?: string;
}

export const connect = createAction<
  RequestAction<IConnect, IConnect>,
  [AvailableWriteProviders, string?, TOnModalClose?, string?]
>('auth/connect', (providerId, wallet, onModalClose, currentAccount) => ({
  request: {
    promise: async (): Promise<IConnect> => {
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = await providerManager.getProvider(providerId, wallet);
      const addresses =
        provider instanceof PolkadotProvider
          ? await provider.getAccounts()
          : [];
      const chainId =
        provider instanceof Web3KeyWriteProvider ? provider.currentChain : 0;
      const chainType =
        provider instanceof PolkadotProvider
          ? provider.currentNetworkType ?? null
          : null;
      const isConnected = provider.isConnected();
      const { icon, name: walletName, id: walletId } = provider.getWalletMeta();

      if (isConnected && typeof onModalClose === 'function') {
        onModalClose();
      }

      if (currentAccount && addresses.includes(currentAccount)) {
        provider.currentAccount = currentAccount;
      }

      return {
        isConnected,
        address: provider.currentAccount ?? '',
        addresses,
        chainId,
        chainType,
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
          address: response.data.address,
          walletId: response.data.walletId,
        }),
      );

      return response;
    },
  },
}));

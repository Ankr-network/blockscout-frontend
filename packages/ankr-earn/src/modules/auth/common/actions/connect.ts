import {
  Address,
  AvailableWriteProviders,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { PolkadotProvider } from 'polkadot';

import { Web3Address } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';

import { setProviderStatus } from '../store/authSlice';
import { TChainId } from '../types';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

type TProvider = Web3KeyWriteProvider | PolkadotProvider | unknown;

type TOnModalClose = () => void;

export interface IConnect {
  address: Web3Address;
  addresses: Address[];
  chainId: TChainId;
  isConnected: boolean;
  providerId: AvailableWriteProviders;
  walletIcon?: string;
  walletId: string;
  walletName: string;
}

const getAddresses = async (provider: TProvider): Promise<string[]> => {
  if (provider instanceof PolkadotProvider) {
    return provider.getAccounts();
  }

  return [];
};

const getChainId = (provider: TProvider): TChainId => {
  if (provider instanceof Web3KeyWriteProvider) {
    return provider.currentChain;
  }

  if (provider instanceof PolkadotProvider) {
    return provider.currentNetworkType ?? null;
  }

  return null;
};

export const connect = createAction<
  RequestAction<IConnect, IConnect>,
  [AvailableWriteProviders, string?, TOnModalClose?, string?]
>('auth/connect', (providerId, wallet, onModalClose, currentAccount) => ({
  request: {
    promise: async (): Promise<IConnect> => {
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = await providerManager.getProvider(providerId, wallet);

      const address = provider.currentAccount ?? '';
      const addresses = await getAddresses(provider);
      const chainId = getChainId(provider);
      const isConnected = provider.isConnected();

      const {
        icon: walletIcon,
        id: walletId,
        name: walletName,
      } = provider.getWalletMeta();

      if (isConnected && typeof onModalClose === 'function') {
        onModalClose();
      }

      if (currentAccount && addresses.includes(currentAccount)) {
        provider.currentAccount = currentAccount;
      }

      return {
        address,
        addresses,
        chainId,
        isConnected,
        providerId,
        walletIcon,
        walletId,
        walletName,
      };
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    requestKey: getAuthRequestKey(providerId),
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

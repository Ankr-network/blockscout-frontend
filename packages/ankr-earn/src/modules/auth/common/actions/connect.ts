import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import {
  Address,
  EthereumWeb3KeyProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { PolkadotProvider } from 'polkadot';

import {
  AvailableStakingWriteProviders,
  Web3Address,
} from 'modules/common/types';
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
  providerId: AvailableStakingWriteProviders;
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

const getChainId = async (provider: TProvider): Promise<TChainId> => {
  if (provider instanceof Web3KeyWriteProvider) {
    const chainId = await provider.getWeb3().eth.getChainId();
    return chainId || provider.currentChain;
  }

  if (provider instanceof PolkadotProvider) {
    return provider.currentNetworkType ?? null;
  }

  return null;
};

export const connect = createAction<
  RequestAction<IConnect, IConnect>,
  [AvailableStakingWriteProviders, string?, TOnModalClose?, string?]
>('auth/connect', (providerId, wallet, onModalClose, currentAccount) => ({
  request: {
    promise: async (): Promise<IConnect> => {
      const providerManager = ProviderManagerSingleton.getInstance();
      const provider = (await providerManager.getProvider(
        providerId,
        wallet,
      )) as EthereumWeb3KeyProvider;

      const address = provider?.currentAccount ?? '';
      const addresses = await getAddresses(provider);
      const isConnected = provider.isConnected();
      const chainId = await getChainId(provider);

      const {
        icon: walletIcon,
        id: walletId,
        name: walletName,
      } = provider.getWalletMeta();

      if (isConnected && typeof onModalClose === 'function') {
        // TODO: move it outside of action
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
          chainId: response.data.chainId,
          address: response.data.address,
          walletId: response.data.walletId,
          wallet,
        }),
      );

      return response;
    },
  },
}));

import { initProviderManagerSui } from 'sui';

import {
  Address,
  EthereumWeb3KeyProvider,
  Web3KeyWriteProvider,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { initProviderManagerPolkadot, PolkadotProvider } from 'polkadot';

import { web3Api } from 'modules/api/web3Api';
import { featuresConfig } from 'modules/common/const';
import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
  Web3Address,
} from 'modules/common/types';

import { setProviderStatus } from '../store/authSlice';
import { TChainId } from '../types';

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

export interface IConnectArgs {
  providerId: AvailableStakingWriteProviders;
  wallet?: string;
  onModalClose?: TOnModalClose;
  currentAccount?: string;
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

export const {
  useConnectMutation,
  endpoints: { connect },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connect: build.mutation<IConnect, IConnectArgs>({
      queryFn: async ({ providerId, wallet, onModalClose, currentAccount }) => {
        if (providerId === ExtraWriteProviders.polkadotCompatible) {
          await initProviderManagerPolkadot();
        }
        if (
          featuresConfig.isSUIStakingActive &&
          providerId === ExtraWriteProviders.suiCompatible
        ) {
          await initProviderManagerSui();
        }
        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = (await providerManager.getProvider(
          providerId,
          wallet,
        )) as EthereumWeb3KeyProvider;

        const address = provider.currentAccount ?? '';
        const addresses = await getAddresses(provider);
        const isConnected = provider.isConnected();
        const chainId = await getChainId(provider);

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
          data: {
            address,
            addresses,
            chainId,
            isConnected,
            providerId,
            walletIcon,
            walletId,
            walletName,
          },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { providerId } = arg;
          dispatch(
            setProviderStatus({
              providerId,
              isActive: true,
              chainId: response.data.chainId,
              address: response.data.address,
              addresses: response.data.addresses,
              walletId: response.data.walletId,
              walletIcon: response.data.walletIcon,
              walletName: response.data.walletName,
            }),
          );
        });
      },
    }),
  }),
});

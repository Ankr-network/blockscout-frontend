import { t } from '@ankr.com/common';

import {
  initProviderManagerPolkadot,
  PolkadotProvider,
  TNetworkType,
} from 'polkadot';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { setProviderStatus } from 'modules/auth/common/store/authSlice';
import { IConnect } from 'modules/auth/common/types';
import { ExtraWriteProviders, Web3Address } from 'modules/common/types';

const providerId = ExtraWriteProviders.polkadotCompatible;

export interface IConnectArgs {
  currentAccount?: string;
}

interface IConnectPolkadot extends IConnect {
  addresses: Web3Address[];
  chainId: TNetworkType | null;
}

export const {
  useConnectPolkadotMutation,
  endpoints: { connectPolkadot },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectPolkadot: build.mutation<IConnectPolkadot, IConnectArgs | void>({
      queryFn: queryFnNotifyWrapper<
        IConnectArgs | void,
        never,
        IConnectPolkadot
      >(
        async ({ currentAccount } = {}) => {
          await initProviderManagerPolkadot();
          const providerManager = getProviderManager();

          const polkadotProvider =
            await providerManager.getProvider<PolkadotProvider>(providerId);

          const addresses = await polkadotProvider.getAccounts();

          const {
            icon: walletIcon,
            id: walletId,
            name: walletName,
          } = polkadotProvider.getWalletMeta();

          if (currentAccount && addresses.includes(currentAccount)) {
            polkadotProvider.currentAccount = currentAccount;
          }

          const data: IConnectPolkadot = {
            address: polkadotProvider.currentAccount ?? '',
            addresses,
            chainId: polkadotProvider.currentNetworkType ?? null,
            isConnected: polkadotProvider.isConnected(),
            providerId,
            walletIcon,
            walletId,
            walletName,
          };

          return { data };
        },
        error =>
          getExtendedErrorText(
            error,
            t('stake-polkadot.errors.wallet-connect'),
          ),
      ),

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
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

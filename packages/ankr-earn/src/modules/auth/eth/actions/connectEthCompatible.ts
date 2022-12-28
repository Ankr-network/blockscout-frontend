import {
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
} from '@ankr.com/provider';

import { getProviderManager } from 'modules/api/getProviderManager';
import { web3Api } from 'modules/api/web3Api';
import { setProviderStatus } from 'modules/auth/common/store/authSlice';
import { IConnect } from 'modules/auth/common/types';

const providerId = AvailableWriteProviders.ethCompatible;

interface IConnectEthCompatible extends IConnect {
  chainId: number;
}

interface IConnectArgs {
  wallet?: string;
}

export const {
  useConnectEthCompatibleMutation,
  endpoints: { connectEthCompatible },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectEthCompatible: build.mutation<
      IConnectEthCompatible,
      IConnectArgs | void
    >({
      queryFn: async ({ wallet } = {}) => {
        const providerManager = getProviderManager();

        const provider =
          await providerManager.getProvider<EthereumWeb3KeyProvider>(
            providerId,
            wallet,
          );

        const {
          icon: walletIcon,
          id: walletId,
          name: walletName,
        } = provider.getWalletMeta();

        const data: IConnectEthCompatible = {
          address: provider.currentAccount ?? '',
          chainId: provider.currentChain,
          isConnected: provider.isConnected(),
          providerId,
          walletIcon,
          walletId,
          walletName,
        };

        return { data };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          dispatch(
            setProviderStatus({
              providerId,
              isActive: true,
              chainId: response.data.chainId,
              address: response.data.address,
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

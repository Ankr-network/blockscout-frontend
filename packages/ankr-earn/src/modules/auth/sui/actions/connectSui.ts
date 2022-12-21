import { initProviderManagerSui, SuiProvider } from 'sui';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { web3Api } from 'modules/api/web3Api';
import { setProviderStatus } from 'modules/auth/common/store/authSlice';
import { IConnect } from 'modules/auth/common/types';
import { ExtraWriteProviders } from 'modules/common/types';

const providerId = ExtraWriteProviders.suiCompatible;

interface IConnectSui extends IConnect {}

export const {
  useConnectSuiMutation,
  endpoints: { connectSui },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectSui: build.mutation<IConnectSui, void>({
      queryFn: async () => {
        await initProviderManagerSui();

        const providerManager = ProviderManagerSingleton.getInstance();
        const provider = await providerManager.getProvider<SuiProvider>(
          providerId,
        );

        const {
          icon: walletIcon,
          id: walletId,
          name: walletName,
        } = provider.getWalletMeta();

        const data: IConnectSui = {
          address: provider.currentAccount ?? '',
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

import { t } from '@ankr.com/common';
import { initProviderManagerSui, SuiProvider } from 'sui';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
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
      queryFn: queryFnNotifyWrapper<void, never, IConnectSui>(
        async () => {
          await initProviderManagerSui();

          const providerManager = getProviderManager();
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
        error =>
          getExtendedErrorText(error, t('stake-sui.errors.connect-wallet')),
      ),

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

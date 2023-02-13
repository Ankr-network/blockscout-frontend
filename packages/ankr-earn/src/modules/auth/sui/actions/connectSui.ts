import { initProviderManagerSui, SuiProvider } from 'sui';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { setProviderStatus } from 'modules/auth/common/store/authSlice';
import { IConnect } from 'modules/auth/common/types';
import { ExtraWriteProviders } from 'modules/common/types';

// todo: STAKAN-2484 translations are not initialized at the moment, so we use a constant
const ERROR_TEXT = 'Failed to connect SUI wallet';
const providerId = ExtraWriteProviders.suiCompatible;

interface IConnectSui extends IConnect {}

export const {
  useConnectSuiMutation,
  endpoints: { connectSui },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    connectSui: build.mutation<IConnectSui, void>({
      queryFn: queryFnNotifyWrapper<void, never, IConnectSui>(async () => {
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
      }, getOnErrorWithCustomText(ERROR_TEXT)),

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

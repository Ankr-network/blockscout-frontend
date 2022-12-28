import { RootState } from 'store';
import { SUI_PROVIDER_ID } from 'sui';

import { Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { addTokenToWallet } from '../api';
import { CacheTags } from '../const';

export const { useAddSUITokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addSUITokenToWallet: build.mutation<boolean, void>({
      queryFn: queryFnNotifyWrapper<void, never, boolean>(
        async (args, { getState }) => {
          const providerManager = getProviderManager();

          const { walletId } = selectEthProviderData(getState() as RootState);

          if (!walletId) {
            return {
              data: false,
            };
          }

          const provider = await providerManager.getProvider(
            SUI_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyWriteProvider)) {
            return {
              data: false,
            };
          }

          return {
            data: await addTokenToWallet({
              provider,
            }),
          };
        },
      ),
      invalidatesTags: [CacheTags.common],
    }),
  }),
});

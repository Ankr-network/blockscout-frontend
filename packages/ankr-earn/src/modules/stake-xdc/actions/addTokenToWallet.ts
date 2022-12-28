import { RootState } from 'store';

import { Web3KeyWriteProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { XDC_PROVIDER_ID } from '../const';

export const { useLazyAddTokenToWalletQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    addTokenToWallet: build.query<boolean, XDC.EXDCTokens>({
      queryFn: queryFnNotifyWrapper<XDC.EXDCTokens, never, boolean>(
        async (args, { getState }) => {
          const providerManager = getProviderManager();

          const { walletId } = selectEthProviderData(getState() as RootState);

          if (!walletId) {
            return {
              data: false,
            };
          }

          const provider = await providerManager.getProvider(
            XDC_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyWriteProvider)) {
            return {
              data: false,
            };
          }

          return {
            data: await XDC.addTokenToWallet({
              provider,
            }),
          };
        },
      ),
    }),
  }),
});

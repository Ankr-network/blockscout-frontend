import { t } from '@ankr.com/common';
import { store } from 'store';

import { EthereumSSV, Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { SSV_ETH_NETWORK_BY_ENV, SSV_PROVIDER_ID } from '../const';

export const { useAddSSVTokenToWalletMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    addSSVTokenToWallet: build.mutation<boolean, EthereumSSV.ESSVTokens>({
      queryFn: queryFnNotifyWrapper<EthereumSSV.ESSVTokens, never, boolean>(
        async token => {
          const providerManager = getProviderManager();

          const { walletId } = selectEthProviderData(store.getState());

          if (!walletId) {
            return { data: false };
          }

          const provider = await providerManager.getProvider(
            SSV_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyWriteProvider)) {
            return { data: false };
          }

          return {
            data: await EthereumSSV.addTokenToWallet({
              chainId: SSV_ETH_NETWORK_BY_ENV,
              provider,
              token,
            }),
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-ssv.errors.add-to-wallet')),
      ),
    }),
  }),
});

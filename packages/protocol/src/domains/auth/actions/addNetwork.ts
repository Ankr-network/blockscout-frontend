import { EWalletId } from '@ankr.com/provider';
import { PrefixedHex } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { ChainID } from '@ankr.com/chains-list';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { web3Api } from 'store/queries';
import { trackAddNetworkInMM } from 'modules/analytics/mixpanel/trackAddNetworkInMM';
import { getProviderManager } from 'modules/api/getProviderManager';
import { selectAuthData } from 'domains/auth/store/authSlice';

import {
  selectHasOauthLogin,
  selectHasPremium,
  selectHasWeb3Connection,
  selectIsLoggedIn,
} from '../store';

export interface AddNetworkParams {
  chainID: ChainID;
  chainParams: IChainParams;
}

export interface IChainParams {
  chainId: PrefixedHex;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export const {
  endpoints: { authAddNetwork },
  useLazyAuthAddNetworkQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authAddNetwork: build.query<boolean, AddNetworkParams>({
      queryFn: createNotifyingQueryFn(
        async ({ chainID, chainParams }, { getState }) => {
          if (!hasMetamask()) {
            throw new Error(t('error.no-metamask'));
          }

          const providerManager = getProviderManager();

          const writeProvider = await providerManager.getETHWriteProvider(
            EWalletId.injected,
          );

          const { givenProvider } = writeProvider.getWeb3();

          await givenProvider.request({
            method: 'wallet_addEthereumChain',
            params: [chainParams],
          });

          const state = getState() as RootState;

          const { authAddress, email, trackingWalletName } =
            selectAuthData(state);
          const hasOauthLogin = selectHasOauthLogin(state);
          const hasWeb3Connection = selectHasWeb3Connection(state);
          const isLoggedIn = selectIsLoggedIn(state);
          const hasPremium = selectHasPremium(state);

          trackAddNetworkInMM({
            address: authAddress,
            chainID,
            email: hasOauthLogin ? email : undefined,
            hasOauthLogin,
            hasPremium,
            hasWeb3Connection,
            isLoggedIn,
            walletName: trackingWalletName,
          });

          return { data: true };
        },
      ),
    }),
  }),
});

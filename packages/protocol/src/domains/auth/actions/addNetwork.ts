import { EthereumWeb3KeyProvider } from '@ankr.com/provider';
import { PrefixedHex } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { ChainID } from 'domains/chains/types';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { web3Api } from 'store/queries';
import { web3ModalTheme } from 'modules/api/Web3ModalKeyProvider';
import { trackAddNetworkInMM } from 'modules/analytics/mixpanel/trackAddNetworkInMM';

import { selectAuthData } from '../store/authSlice';
import {
  selectHasOauthLogin,
  selectHasPremium,
  selectHasWeb3Connection,
  selectIsLoggedIn,
} from '../store/selectors';

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
  useLazyAuthAddNetworkQuery,
  endpoints: { authAddNetwork },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authAddNetwork: build.query<boolean, AddNetworkParams>({
      queryFn: createNotifyingQueryFn(
        async ({ chainID, chainParams }, { getState }) => {
          if (!hasMetamask()) {
            throw new Error(t('error.no-metamask'));
          }

          // create mm provider instance to add network
          const keyProvider = new EthereumWeb3KeyProvider({
            web3ModalTheme,
          });

          await keyProvider.inject(undefined, {});
          await keyProvider.connect();

          const { givenProvider } = keyProvider.getWeb3();

          await givenProvider.request({
            method: 'wallet_addEthereumChain',
            params: [chainParams],
          });

          const state = getState() as RootState;

          const { address, email, trackingWalletName } = selectAuthData(state);
          const hasOauthLogin = selectHasOauthLogin(state);
          const hasWeb3Connection = selectHasWeb3Connection(state);
          const isLoggedIn = selectIsLoggedIn(state);
          const hasPremium = selectHasPremium(state);

          trackAddNetworkInMM({
            address,
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

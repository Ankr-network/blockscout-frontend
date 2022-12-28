import { EthereumWeb3KeyProvider } from '@ankr.com/provider';
import { PrefixedHex } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { t } from 'modules/i18n/utils/intl';
import { web3Api } from 'store/queries';
import { web3ModalTheme } from 'modules/api/Web3ModalKeyProvider';

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
    authAddNetwork: build.query<boolean, IChainParams>({
      queryFn: createNotifyingQueryFn(async chainParams => {
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

        return { data: true };
      }),
    }),
  }),
});

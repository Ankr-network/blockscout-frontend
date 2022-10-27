import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { t } from 'modules/i18n/utils/intl';
import { PrefixedHex } from 'multirpc-sdk';
import { EthereumWeb3KeyProvider } from '@ankr.com/provider';
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

export const addNetwork = createSmartAction<
  RequestAction<IChainParams, IChainParams>
>('auth/addNetwork', (chainParams: Chain) => ({
  request: {
    promise: (async () => {
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
    })(),
  },
  meta: {},
}));

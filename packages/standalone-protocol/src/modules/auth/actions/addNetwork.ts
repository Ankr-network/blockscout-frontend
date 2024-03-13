import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import { EWalletId } from '@ankr.com/provider';

import { Chain } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/ChainItemHeaderTypes';

import { getProviderManager } from '../getProviderManager';

export interface IChainParams {
  chainId: string; // 0x + hex string
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
      const providerManager = getProviderManager();

      const writeProvider = await providerManager.getETHWriteProvider(
        EWalletId.injected,
      );

      const { givenProvider } = writeProvider.getWeb3();

      givenProvider.request({
        method: 'wallet_addEthereumChain',
        params: [chainParams],
      });
    })(),
  },
  meta: {
    asMutation: false,
  },
}));

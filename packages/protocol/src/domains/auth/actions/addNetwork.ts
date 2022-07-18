import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';

import { MultiService } from 'modules/api/MultiService';
import { Chain } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { t } from 'modules/i18n/utils/intl';

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
      if (!hasMetamask()) {
        throw new Error(t('error.no-metamask'));
      }

      const service = await MultiService.getInstance();
      const keyProvider = service.getKeyProvider();

      const { givenProvider } = keyProvider.getWeb3();

      await givenProvider.request({
        method: 'wallet_addEthereumChain',
        params: [chainParams],
      });
    })(),
  },
  meta: {},
}));

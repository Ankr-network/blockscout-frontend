import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction } from '@redux-requests/core';
import { MultiService } from '../../api/MultiService';
import { Chain } from '../../../domains/chains/screens/Chains/components/ChainsList/ChainsListTypes';

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
      const { service } = MultiService.getInstance();
      const { givenProvider } = service.getKeyProvider().getWeb3();
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

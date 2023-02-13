import { t } from '@ankr.com/common';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { EthereumSSV, Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { withStore } from 'modules/common/utils/withStore';

import {
  SSV_ACTIONS_PREFIX,
  SSV_ETH_NETWORK_BY_ENV,
  SSV_PROVIDER_ID,
} from '../const';

export const addTokenToWallet = createSmartAction<
  RequestAction<undefined, boolean>,
  [EthereumSSV.ESSVTokens]
>(`${SSV_ACTIONS_PREFIX}addTokenToWallet`, token => ({
  request: {
    promise: async (store: RequestsStore): Promise<boolean> => {
      const providerManager = getProviderManager();

      const { walletId } = selectEthProviderData(store.getState());

      if (!walletId) {
        return false;
      }

      const provider = await providerManager.getProvider(
        SSV_PROVIDER_ID,
        walletId,
      );

      if (!(provider instanceof Web3KeyWriteProvider)) {
        return false;
      }

      return EthereumSSV.addTokenToWallet({
        chainId: SSV_ETH_NETWORK_BY_ENV,
        provider,
        token,
      });
    },
  },
  meta: {
    asMutation: true,
    onRequest: withStore,
    showNotificationOnError: true,
    additionalErrorText: t('stake-ssv.errors.add-to-wallet'),
  },
}));

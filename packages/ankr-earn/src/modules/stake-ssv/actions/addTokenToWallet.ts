import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  EthereumSSV,
  ProviderManagerSingleton,
  Web3KeyWriteProvider,
} from '@ankr.com/staking-sdk';

import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { withStore } from 'modules/common/utils/withStore';

import { SSV_ACTIONS_PREFIX, SSV_PROVIDER_ID } from '../const';

export const addTokenToWallet = createSmartAction<
  RequestAction<undefined, boolean>,
  [EthereumSSV.ESSVTokens]
>(`${SSV_ACTIONS_PREFIX}addTokenToWallet`, token => ({
  request: {
    promise: async (store: RequestsStore): Promise<boolean> => {
      const providerManager = ProviderManagerSingleton.getInstance();

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
        provider,
        token,
      });
    },
  },
  meta: {
    asMutation: true,
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));

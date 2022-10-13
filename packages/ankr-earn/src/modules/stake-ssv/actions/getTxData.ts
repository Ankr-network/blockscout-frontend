import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  EthereumSSV,
  IStakeData,
  ProviderManagerSingleton,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { withStore } from 'modules/common/utils/withStore';
import { IFetchTxData } from 'modules/switcher/api/types';

import { SSV_ACTIONS_PREFIX, SSV_PROVIDER_ID } from '../const';

type TGetTxData = IFetchTxData | null;

export const getTxData = createSmartAction<
  RequestAction<undefined, TGetTxData>,
  [IStakeData]
>(`${SSV_ACTIONS_PREFIX}getTxData`, ({ txHash }) => ({
  request: {
    promise: async (store: RequestsStore): Promise<TGetTxData> => {
      const providerManager = ProviderManagerSingleton.getInstance();

      const { walletId } = selectEthProviderData(store.getState());

      if (!walletId) {
        return null;
      }

      const provider = await providerManager.getProvider(
        SSV_PROVIDER_ID,
        walletId,
      );

      if (!(provider instanceof Web3KeyReadProvider)) {
        return null;
      }

      return EthereumSSV.getTxData({
        provider,
        txHash,
      });
    },
  },
  meta: {
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));

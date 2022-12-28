import { RequestAction, RequestsStore } from '@redux-requests/core';
import retry from 'async-retry';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  EthereumSSV,
  IStakeData,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';
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
      const providerManager = getProviderManager();

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

      return retry(() => EthereumSSV.getTxData({ provider, txHash }), {
        retries: RETRIES_TO_GET_TX_DATA,
      });
    },
  },
  meta: {
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));

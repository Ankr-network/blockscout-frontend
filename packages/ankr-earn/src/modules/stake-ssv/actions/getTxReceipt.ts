import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { TransactionReceipt } from 'web3-eth';

import {
  EthereumSSV,
  IStakeData,
  ProviderManagerSingleton,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { Seconds } from 'modules/common/types';
import { withStore } from 'modules/common/utils/withStore';

import { SSV_ACTIONS_PREFIX, SSV_PROVIDER_ID } from '../const';

type TGetTxReceiptData = TransactionReceipt | null;

const POLL_INTERVAL: Seconds = 3;

export const getTxReceipt = createSmartAction<
  RequestAction<undefined, TGetTxReceiptData>,
  [IStakeData]
>(`${SSV_ACTIONS_PREFIX}getTxReceipt`, ({ txHash }) => ({
  request: {
    promise: async (store: RequestsStore): Promise<TGetTxReceiptData> => {
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

      return EthereumSSV.getTxReceipt({
        provider,
        txHash,
      });
    },
  },
  meta: {
    onRequest: withStore,
    poll: POLL_INTERVAL,
    showNotificationOnError: true,
  },
}));

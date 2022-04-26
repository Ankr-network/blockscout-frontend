import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { MultiService } from 'modules/api/MultiService';
import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { fetchPublicKey } from './fetchPublicKey';
import {
  setAllowanceTransaction,
  setTopUpTransaction,
} from 'domains/account/store/accountSlice';

const setTransaction = (
  store: RequestsStore,
  address: string,
  transactionHash: string,
) => {
  if (transactionHash) {
    store.dispatch(
      setTopUpTransaction({
        address,
        transactionHash,
      }),
    );
  }
};

export const deposit = createSmartAction<
  RequestAction<string, IWeb3SendResult>
>('topUp/deposit', (amount: BigNumber) => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { service } = MultiService.getInstance();

      await store.dispatchRequest(fetchPublicKey());

      const { data: publicKey } = getQuery(store.getState(), {
        type: fetchPublicKey.toString(),
        action: fetchPublicKey,
      });

      const depositResponse = await service.depositAnkrToPAYG(
        amount,
        publicKey,
      );

      const address = service.getKeyProvider().currentAccount();

      store.dispatch(setAllowanceTransaction());

      setTransaction(store, address, depositResponse.transactionHash);

      return depositResponse;
    },
  },
  meta: {
    onRequest: walletConnectionGuard,
    asMutation: false,
  },
}));

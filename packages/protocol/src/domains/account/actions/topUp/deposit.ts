import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { MultiService } from 'modules/api/MultiService';
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
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const { service } = MultiService.getInstance();
          const { data: publicKey } = await store.dispatchRequest(
            fetchPublicKey(),
          );

          const depositResponse = await service.depositAnkrToPAYG(
            amount,
            publicKey as string,
          );

          const address = service.getKeyProvider().currentAccount();

          store.dispatch(setAllowanceTransaction());
          setTransaction(store, address, depositResponse.transactionHash);

          return depositResponse;
        })(),
      };
    },
  },
}));

import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { MultiService } from 'modules/api/MultiService';
import { fetchPublicKey } from '../fetchPublicKey';
import {
  setAllowanceTransaction,
  setTopUpTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { throwIfError } from '@ankr.com/common';

const setTransaction = (
  store: RequestsStore,
  address: string,
  topUpTransactionHash: string,
) => {
  if (topUpTransactionHash) {
    store.dispatch(
      setTopUpTransaction({
        address,
        topUpTransactionHash,
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
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const { data: publicKey } = throwIfError(
            await store.dispatchRequest(fetchPublicKey()),
          );

          const depositResponse = await service.depositAnkrToPAYG(
            amount,
            publicKey as string,
          );

          store.dispatch(setAllowanceTransaction({ address }));
          setTransaction(store, address, depositResponse.transactionHash);

          return depositResponse;
        })(),
      };
    },
  },
}));

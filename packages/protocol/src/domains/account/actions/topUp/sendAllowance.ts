import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { MultiService } from 'modules/api/MultiService';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { fetchBalance } from '../balance/fetchBalance';
import { checkAllowanceTransaction } from './checkAllowanceTransaction';

const setTransaction = (
  store: RequestsStore,
  address: string,
  allowanceTransactionHash: string,
) => {
  if (allowanceTransactionHash) {
    store.dispatch(
      setAllowanceTransaction({
        address,
        allowanceTransactionHash,
      }),
    );
  }
};

const NOT_MINED_TRANSACTION_ERROR =
  'Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined!';

export const sendAllowance = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [BigNumber]
>('topUp/sendAllowance', (amount: BigNumber) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async () => {
          const { service } = MultiService.getInstance();
          const address = service.getKeyProvider().currentAccount();
          const allowanceResponse = await service.sendAllowanceForPAYG(amount);

          const transactionHash = allowanceResponse?.transactionHash;
          setTransaction(store, address, transactionHash);

          try {
            await allowanceResponse.receiptPromise;
          } catch (error: any) {
            if (error.message === NOT_MINED_TRANSACTION_ERROR) {
              await store.dispatchRequest(
                checkAllowanceTransaction(transactionHash),
              );

              return;
            }

            throw error;
          }
        })(),
      };
    },
    onSuccess: (
      response: any,
      _action: RequestAction,
      store: RequestsStore,
    ) => {
      store.dispatchRequest(fetchBalance());

      return response;
    },
  },
}));

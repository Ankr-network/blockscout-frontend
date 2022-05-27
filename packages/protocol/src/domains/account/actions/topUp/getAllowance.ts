import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { MultiService } from 'modules/api/MultiService';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { fetchBalance } from '../balance/fetchBalance';

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

export const getAllowance = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [BigNumber]
>('topUp/getAllowance', (amount: BigNumber) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async () => {
          const { service } = MultiService.getInstance();
          const address = service.getKeyProvider().currentAccount();
          const allowanceResponse = await service.getAllowanceForPAYG(amount);

          setTransaction(store, address, allowanceResponse?.transactionHash);
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

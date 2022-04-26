import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { MultiService } from 'modules/api/MultiService';
import { setAllowanceTransaction } from 'domains/account/store/accountSlice';
import { fetchBalance } from 'modules/account/actions/fetchBalance';

const setTransaction = (
  store: RequestsStore,
  address: string,
  transactionHash: string,
) => {
  if (transactionHash) {
    store.dispatch(
      setAllowanceTransaction({
        address,
        transactionHash,
      }),
    );
  }
};

export const getAllowance = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [BigNumber]
>('topUp/getAllowance', (amount: BigNumber) => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();

      const allowanceResponse = await service.getAllowanceForPAYG(amount);

      setTransaction(store, address, allowanceResponse?.transactionHash);

      return allowanceResponse?.receiptPromise;
    },
  },
  meta: {
    onRequest: walletConnectionGuard,
    asMutation: false,
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

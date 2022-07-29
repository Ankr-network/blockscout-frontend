import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { MultiService } from 'modules/api/MultiService';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { checkAllowanceTransaction } from './checkAllowanceTransaction';

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
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const allowanceResponse = await service.sendAllowanceForPAYG(amount);

          const { transactionHash: allowanceTransactionHash } =
            allowanceResponse;

          store.dispatch(
            setAllowanceTransaction({
              address,
              allowanceTransactionHash,
            }),
          );

          const { data: receipt } = await store.dispatchRequest(
            checkAllowanceTransaction(allowanceTransactionHash),
          );

          store.dispatch(
            setAllowanceTransaction({
              address,
              allowanceTransactionHash: receipt?.transactionHash,
            }),
          );
        })(),
      };
    },
  },
}));

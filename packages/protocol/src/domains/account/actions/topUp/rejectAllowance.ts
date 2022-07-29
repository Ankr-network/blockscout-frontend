import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/provider';

import { MultiService } from 'modules/api/MultiService';
import {
  resetTransaction,
  setRejectAllowanceTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { fetchBalance } from '../balance/fetchBalance';
// eslint-disable-next-line import/no-cycle
import { reset } from './reset';
import { checkAllowanceTransaction } from './checkAllowanceTransaction';

export const rejectAllowance = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>('topUp/rejectAllowance', () => ({
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

          const rejectAllowanceResponse =
            await service.rejectAllowanceForPAYG();

          const rejectAllowanceTransactionHash =
            rejectAllowanceResponse?.transactionHash;

          store.dispatch(
            setRejectAllowanceTransaction({
              address,
              rejectAllowanceTransactionHash,
            }),
          );

          await store.dispatchRequest(
            checkAllowanceTransaction(rejectAllowanceTransactionHash),
          );

          store.dispatch(resetTransaction({ address }));
          store.dispatchRequest(reset());
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

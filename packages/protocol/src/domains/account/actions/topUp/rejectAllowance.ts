import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import {
  setAllowanceTransaction,
  setAmount,
} from 'domains/account/store/accountSlice';
import { fetchBalances } from '../balance/fetchBalances';
// eslint-disable-next-line import/no-cycle
import { reset } from './reset';

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
          const { service } = MultiService.getInstance();

          await service.rejectAllowanceForPAYG();

          store.dispatch(setAllowanceTransaction());
          store.dispatch(setAmount(new BigNumber(0)));

          store.dispatchRequest(reset());
        })(),
      };
    },
    onSuccess: (
      response: any,
      _action: RequestAction,
      store: RequestsStore,
    ) => {
      store.dispatchRequest(fetchBalances());

      return response;
    },
  },
}));

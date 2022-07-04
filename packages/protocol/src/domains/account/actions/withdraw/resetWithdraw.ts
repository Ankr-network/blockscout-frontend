import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { MultiService } from 'modules/api/MultiService';
import { resetTransaction } from 'domains/account/store/accountWithdrawSlice';

// eslint-disable-next-line import/no-cycle
import { reset } from './reset';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { push } from 'connected-react-router';

const timeout = () => new Promise(res => setTimeout(res, 100));

export const resetWithdraw = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>('withdraw/resetWithdraw', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async () => {
          const { service } = MultiService.getInstance();
          const address = service.getKeyProvider().currentAccount();

          store.dispatch(resetTransaction({ address }));
          store.dispatchRequest(reset());

          await timeout();

          // redirect to update a component
          store.dispatch(
            push(AccountRoutesConfig.accountDetails.generatePath()),
          );

          store.dispatch(push(AccountRoutesConfig.withdraw.generatePath()));
        })(),
      };
    },
    asMutation: false,
  },
}));

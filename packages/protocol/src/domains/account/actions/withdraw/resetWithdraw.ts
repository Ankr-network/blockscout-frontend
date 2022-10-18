import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/provider-core';

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
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

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

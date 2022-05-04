import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';
import { push } from 'connected-react-router';
import BigNumber from 'bignumber.js';

import {
  setAmount,
  setTopUpTransaction,
} from 'domains/account/store/accountSlice';
import { connect } from 'modules/auth/actions/connect';
import { AccountRoutesConfig } from 'domains/account/Routes';

export const redirectIfCredentials = createSmartAction<
  RequestAction<IWeb3SendResult, null>
>('topUp/redirectIfCredentials', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const { data: connectData } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          if (connectData?.credentials) {
            const link = AccountRoutesConfig.accountDetails.generatePath();
            store.dispatch(setTopUpTransaction());
            store.dispatch(setAmount(new BigNumber(0)));
            store.dispatch(push(link));

            return true;
          }

          return false;
        })(),
      };
    },

    asMutation: false,
  },
}));

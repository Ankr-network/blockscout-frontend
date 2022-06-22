import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';
import { push } from 'connected-react-router';

import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { connect } from 'domains/auth/actions/connect';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { MultiService } from 'modules/api/MultiService';

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
          const { service } = MultiService.getInstance();
          const address = service.getKeyProvider().currentAccount();

          const { data: connectData } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          if (connectData?.credentials) {
            const link = AccountRoutesConfig.accountDetails.generatePath();

            store.dispatch(resetTransaction({ address }));
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

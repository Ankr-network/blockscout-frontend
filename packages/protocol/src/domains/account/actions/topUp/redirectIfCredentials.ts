import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/provider-core';

import { connect } from 'domains/auth/actions/connect';
import { MultiService } from 'modules/api/MultiService';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';

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
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const { data: connectData } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          if (connectData?.credentials) {
            resetTransactionSliceAndRedirect(store, address);

            return true;
          }

          return false;
        })(),
      };
    },

    asMutation: false,
  },
}));

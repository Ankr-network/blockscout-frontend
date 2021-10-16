import { DispatchRequest, getQuery, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { Store } from 'store';
import { IApiChain } from 'domains/chains/api/queryChains';
import { connect } from 'modules/auth/actions/connect';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';

export const fetchChains = createSmartAction<
  RequestAction<IApiChain[], IApiChain[]>
>('dashboard/fetchChains', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    getData: data => data,
    onRequest: (
      _request: any,
      _action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IApiChain[] | undefined> => {
          const { data } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          const jwtToken = data?.hasAccount;

          const { data: chains } = await store.dispatchRequest(
            fetchPrivateChains(jwtToken),
          );

          return chains;
        })(),
      };
    },
  },
}));

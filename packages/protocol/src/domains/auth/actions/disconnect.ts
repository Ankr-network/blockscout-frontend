import { RequestAction, resetRequests } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { connect } from './connect';
import { store } from 'store';
import { resetAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';
import { reset as topUpReset } from 'domains/account/actions/topUp/reset';
import { fetchPremiumChainFeatures } from 'domains/chains/actions/fetchPremiumChainFeatures';
import { disconnectService } from './connectUtils';
import { fetchAccountBalance } from 'domains/account/actions/balance/fetchAccountBalance';

export const disconnect = createSmartAction<RequestAction>(
  'auth/disconnect',
  () => ({
    request: {
      promise: (async () => {
        store.dispatch(setAuthData({ isManualDisconnected: true }));

        disconnectService();

        store.dispatch(resetAuthData());
        store.dispatch(topUpReset());
        store.dispatch(
          resetRequests([
            connect.toString(),
            fetchPremiumChainFeatures.toString(),
            fetchProvider.toString(),
            fetchAccountBalance.toString(),
          ]),
        );
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
);

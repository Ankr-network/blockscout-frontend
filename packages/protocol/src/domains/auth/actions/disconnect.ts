import { RequestAction, resetRequests } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { connect } from './connect';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { MultiService } from 'modules/api/MultiService';
import { store } from 'store';
import { resetAuthData } from 'domains/auth/store/authSlice';
import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';
import { reset as topUpReset } from 'domains/account/actions/topUp/reset';
import { reset as withdrawReset } from 'domains/account/actions/withdraw/reset';
import { fetchPremiumChainFeatures } from 'domains/chains/actions/fetchPremiumChainFeatures';

export const disconnect = createSmartAction<RequestAction>(
  'auth/disconnect',
  () => ({
    request: {
      promise: (async () => {
        const { service } = MultiService.getInstance();
        await service.getWorkerGateway().removeJwtToken();
        await service.getAccountGateway().removeToken();

        await service.getKeyProvider().disconnect();

        store.dispatch(resetAuthData());
        store.dispatch(withdrawReset());
        store.dispatch(topUpReset());
        store.dispatch(resetRequests([fetchPremiumChainFeatures.toString()]));
      })(),
    },
    meta: {
      asMutation: true,
      mutations: {
        [fetchProvider.toString()]: (): ResponseData<typeof connect> | null => {
          return null;
        },
        [connect.toString()]: (): ResponseData<typeof connect> | null => {
          return null;
        },
      },
    },
  }),
);

import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { connect } from './connect';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { MultiService } from 'modules/api/MultiService';
import { store } from 'store';
import { resetAuthData } from 'domains/auth/store/authSlice';
import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';
import { reset } from 'domains/account/actions/withdraw/reset';

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
        store.dispatch(reset());
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

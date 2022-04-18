import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';
import { MultiService } from '../../api/MultiService';
import { store } from 'store';
import { resetAuthData } from 'modules/auth/store/authSlice';
import { fetchDepositStatus } from './fetchDepositStatus';

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
      })(),
    },
    meta: {
      asMutation: true,
      mutations: {
        [connect.toString()]: (): ResponseData<typeof connect> | null => {
          return null;
        },
        [fetchDepositStatus.toString()]: (): ResponseData<
          typeof fetchDepositStatus
        > | null => {
          return null;
        },
      },
    },
  }),
);

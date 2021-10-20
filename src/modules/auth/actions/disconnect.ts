import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';
import { MultiService } from '../../api/MultiService';

interface ICompleteDeposit {}

export const disconnect = createSmartAction<
  RequestAction<ICompleteDeposit, ICompleteDeposit>
>('auth/disconnect', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();
      await service.getWorkerGateway().removeJwtToken();
      await service.getKeyProvider().disconnect();
    })(),
  },
  meta: {
    asMutation: true,
    mutations: {
      [connect.toString()]: (): ResponseData<typeof connect> | null => {
        return null;
      },
    },
  },
}));

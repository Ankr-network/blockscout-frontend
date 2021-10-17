import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';

interface ICompleteDeposit {}

export const completeDeposit = createSmartAction<
  RequestAction<ICompleteDeposit, ICompleteDeposit>
>('auth/completeDeposit', () => ({
  request: {
    promise: (async () => {})(),
  },
  meta: {
    asMutation: true,
    mutations: {
      [connect.toString()]: (
        data: ResponseData<typeof connect>,
      ): ResponseData<typeof connect> => {
        return { ...data, justDeposited: false };
      },
    },
  },
}));

import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { ResponseData } from '../../api/utils/ResponseData';
import { DepositStep, fetchDepositStatus } from './fetchDepositStatus';

interface ISetDepositStatus {}

export const setDepositStatus = createSmartAction<
  RequestAction<ISetDepositStatus, ISetDepositStatus>,
  [DepositStep]
>('auth/setDepositStatus', (step: DepositStep) => ({
  request: {
    promise: (async () => {})(),
  },
  meta: {
    asMutation: true,
    mutations: {
      [fetchDepositStatus.toString()]: (): ResponseData<
        typeof fetchDepositStatus
      > => {
        return { step };
      },
    },
  },
}));

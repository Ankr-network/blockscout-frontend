import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { authenticatedRequestGuard } from '../utils/authenticatedRequestGuard';
import { MultiService } from '../../api/MultiService';
import BigNumber from 'bignumber.js';
import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';

interface IDeposit {}

export const deposit = createSmartAction<
  RequestAction<IDeposit, IDeposit>,
  [BigNumber]
>('auth/deposit', (amount: BigNumber) => ({
  request: {
    promise: async () => {
      const { service } = MultiService.getInstance();

      await service.depositAnkr(amount);

      return {} as IDeposit;
    },
  },
  meta: {
    onRequest: authenticatedRequestGuard,
    asMutation: true,
    getData: data => data,
    mutations: {
      [connect.toString()]: (
        data: ResponseData<typeof connect>,
      ): ResponseData<typeof connect> => {
        return { ...data, hasAccount: true, justDeposited: true };
      },
    },
  },
}));

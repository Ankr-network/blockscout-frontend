import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { walletConnectionGuard } from '../utils/walletConnectionGuard';
import { MultiService } from '../../api/MultiService';
import BigNumber from 'bignumber.js';
import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';
import { IJwtToken } from '@ankr.com/multirpc';

interface IDeposit {
  credentials: IJwtToken;
}

export const deposit = createSmartAction<
  RequestAction<IDeposit, IDeposit>,
  [BigNumber]
>('auth/deposit', (amount: BigNumber) => ({
  request: {
    promise: async () => {
      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();

      await Promise.all(
        (await service.depositAnkr(amount)).map(item => item.receiptPromise),
      );

      return {
        credentials: await service.loginAsUser(address),
      } as IDeposit;
    },
  },
  meta: {
    onRequest: walletConnectionGuard,
    asMutation: true,
    mutations: {
      [connect.toString()]: (
        data: ResponseData<typeof connect>,
        mutationData: IDeposit,
      ): ResponseData<typeof connect> => {
        return {
          ...data,
          ...mutationData,
          justDeposited: true,
        };
      },
    },
  },
}));

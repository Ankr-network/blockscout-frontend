import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { walletConnectionGuard } from '../utils/walletConnectionGuard';
import { MultiService } from '../../api/MultiService';
import BigNumber from 'bignumber.js';
import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';
import { IJwtToken } from '@ankr.com/multirpc';
import { fetchCredentialsStatus } from './fetchCredentialsStatus';
import { retry } from '../../api/utils/retry';
import { throwIfError } from '../../api/utils/throwIfError';

const MAX_ATTEMPTS = 20;

interface IDeposit {
  credentials: IJwtToken;
}

export const deposit = createSmartAction<
  RequestAction<IDeposit, IDeposit>,
  [BigNumber]
>('auth/deposit', (amount: BigNumber) => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();

      const depositResponse = await service.depositAnkr(amount);

      await Promise.all([
        depositResponse.allowance?.receiptPromise,
        depositResponse.deposit?.receiptPromise,
      ]);

      await store.dispatchRequest(
        fetchCredentialsStatus(depositResponse.deposit.transactionHash),
      );

      await retry(
        async () => {
          const { data } = throwIfError(
            await store.dispatchRequest(
              fetchCredentialsStatus(depositResponse.deposit.transactionHash),
            ),
          );

          const { isReady } = data;

          if (!isReady) {
            throw new Error('Credentials are not ready');
          }

          return data;
        },
        () => {
          return false;
        },
        MAX_ATTEMPTS,
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

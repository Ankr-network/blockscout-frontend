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

async function waitForBlocks(store: RequestsStore, transactionHash: string) {
  const response = await store.dispatchRequest(
    fetchCredentialsStatus(transactionHash),
  );

  if (response.data?.isReady) {
    return undefined;
  }

  return retry(
    async () => {
      const { data } = throwIfError(
        await store.dispatchRequest(fetchCredentialsStatus(transactionHash)),
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
}

interface IDeposit {
  address: string;
  credentials: IJwtToken;
  justDeposited: boolean;
}

export const deposit = createSmartAction<
  RequestAction<IDeposit, IDeposit>,
  [BigNumber]
>('auth/deposit', (amount: BigNumber) => ({
  request: {
    promise: async (
      store: RequestsStore,
      data: ResponseData<typeof connect>,
    ) => {
      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();

      if (data.credentials) {
        return {
          credentials: data.credentials,
          justDeposited: false,
        } as IDeposit;
      }

      const depositTransactionId = await service.isUserHasDeposit(address);

      if (depositTransactionId) {
        await waitForBlocks(store, depositTransactionId);

        return {
          address,
          credentials: await service.loginAsUser(address),
          justDeposited: false,
        } as IDeposit;
      }

      const depositResponse = await service.depositAnkr(amount);

      await Promise.all([
        depositResponse.allowance?.receiptPromise,
        depositResponse.deposit?.receiptPromise,
      ]);

      await waitForBlocks(store, depositResponse.deposit.transactionHash);

      return {
        address,
        credentials: await service.loginAsUser(address),
        justDeposited: true,
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
        };
      },
    },
  },
}));

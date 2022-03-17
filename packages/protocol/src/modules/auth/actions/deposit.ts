import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { walletConnectionGuard } from '../utils/walletConnectionGuard';
import { MultiService } from '../../api/MultiService';
import BigNumber from 'bignumber.js';
import { connect } from './connect';
import { ResponseData } from '../../api/utils/ResponseData';
import { IJwtToken } from 'multirpc-sdk';
import { fetchCredentialsStatus } from './fetchCredentialsStatus';
import { retry } from '../../api/utils/retry';
import { throwIfError } from 'common';
import { fetchEncryptionKey } from './fetchEncryptionKey';
import { DepositStep, fetchDepositStatus } from './fetchDepositStatus';
import { setDepositStatus } from './setDepositStatus';
import { setCredentials } from 'modules/user/userSlice';
import { tryToLogin } from '../utils/tryToLogin';

const MAX_ATTEMPTS = 50;

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
          address,
          credentials: data.credentials,
        } as IDeposit;
      }

      const { data: depositStatusData } = await store.dispatchRequest(
        fetchDepositStatus(),
      );

      const step = depositStatusData?.step ?? DepositStep.publicKey;

      const {
        data: { key },
      } = throwIfError(await store.dispatchRequest(fetchEncryptionKey()));
      if (step === DepositStep.waitTransactionConfirming) {
        const depositTransactionId = await service.isUserHasDeposit(address);

        if (depositTransactionId) {
          await waitForBlocks(store, depositTransactionId);

          return {
            address,
            credentials: await service.loginAsUser(address, key),
          } as IDeposit;
        }
      }

      if (step === DepositStep.allowance || step === DepositStep.deposit) {
        const depositResponse = await service.depositAnkr(amount);

        await depositResponse.allowance?.receiptPromise;

        // TODO Refactor it
        store.dispatchRequest(fetchDepositStatus());

        await depositResponse.deposit?.receiptPromise;

        // TODO Refactor it
        store.dispatchRequest(fetchDepositStatus());

        await waitForBlocks(store, depositResponse.deposit.transactionHash);
      }

      await store.dispatchRequest(setDepositStatus(DepositStep.login));

      const credentials = await tryToLogin(service, address, key);

      if (credentials) {
        store.dispatch(setCredentials(credentials));
      }

      return {
        address,
        credentials,
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

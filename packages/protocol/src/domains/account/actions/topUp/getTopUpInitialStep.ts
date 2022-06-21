import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { push } from 'connected-react-router';

import { selectAccount } from 'domains/account/store/accountTopUpSlice';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from './const';
// eslint-disable-next-line import/no-cycle
import { waitTransactionConfirming } from './waitTransactionConfirming';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { connect } from 'modules/auth/actions/connect';

const checkTopUpTransaction = async (
  store: RequestsStore,
  topUpTransactionHash?: string,
) => {
  const { service } = MultiService.getInstance();

  if (!topUpTransactionHash) {
    return TopUpStep.deposit;
  }

  // It will return null for pending transactions and an object if the transaction is successful.
  const transactionReceipt = await service.getTransactionReceipt(
    topUpTransactionHash,
  );

  if (!transactionReceipt) {
    store.dispatchRequest(waitTransactionConfirming());

    return TopUpStep.waitTransactionConfirming;
  }

  return null;
};

const checkLoginStep = async (address: string, store: RequestsStore) => {
  const { service } = MultiService.getInstance();

  // last topup event
  const lastEvent = await service.getLastLockedFundsEvent(address);

  const { data: connectData } = getQuery(store.getState(), {
    type: connect.toString(),
    action: connect,
  });

  // the first topup
  if (Boolean(lastEvent) && !connectData?.credentials) {
    // It will return null for pending transactions and an object if the transaction is successful.
    const transactionReceipt = await service.getTransactionReceipt(
      lastEvent?.transactionHash as string,
    );

    if (!transactionReceipt) {
      store.dispatchRequest(waitTransactionConfirming());

      return TopUpStep.waitTransactionConfirming;
    }

    return TopUpStep.login;
  }

  return null;
};

export const getTopUpInitialStep = createSmartAction<
  RequestAction<TopUpStep, TopUpStep>
>('topUp/getTopUpInitialStep', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const { service } = MultiService.getInstance();
          const address = service.getKeyProvider().currentAccount();

          const loginStep = await checkLoginStep(address, store);

          if (loginStep) return loginStep;

          const transaction = selectAccount(store.getState(), address);

          if (
            !transaction ||
            !transaction?.amount ||
            transaction?.amount?.toString() === '0'
          ) {
            store.dispatch(
              push(AccountRoutesConfig.accountDetails.generatePath()),
            );
          }

          if (
            !transaction?.allowanceTransactionHash &&
            !transaction?.topUpTransactionHash
          ) {
            return TopUpStep.start;
          }

          if (transaction?.allowanceTransactionHash) {
            return TopUpStep.deposit;
          }

          const topUpStep = await checkTopUpTransaction(
            store,
            transaction?.topUpTransactionHash,
          );

          if (topUpStep) {
            return topUpStep;
          }

          const { data: connectData } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          if (connectData?.credentials) {
            return TopUpStep.waitTransactionConfirming;
          }

          return TopUpStep.login;
        })(),
      };
    },
  },
}));

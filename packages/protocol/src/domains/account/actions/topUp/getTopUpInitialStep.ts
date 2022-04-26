import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { push } from 'connected-react-router';

import {
  selectAccount,
  setTopUpTransaction,
  setAllowanceTransaction,
} from 'domains/account/store/accountSlice';
import { MultiService } from 'modules/api/MultiService';
import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { TopUpStep } from './const';
import { waitTransactionConfirming } from './waitTransactionConfirming';
import { AccountRoutesConfig } from 'domains/account/Routes';

const checkAllowanceTransaction = (store: RequestsStore, address: string) => {
  const { allowanceTransaction } = selectAccount(store.getState());

  const allowanceSavedAddress = allowanceTransaction?.address;
  const allowanceTransactionHash = allowanceTransaction?.transactionHash;

  if (allowanceTransactionHash && allowanceSavedAddress === address) {
    return TopUpStep.publicKey;
  }

  // reset allowanceTransaction
  if (allowanceTransactionHash && allowanceSavedAddress !== address) {
    store.dispatch(setAllowanceTransaction());
  }

  return null;
};

const checkTopUpTransaction = async (store: RequestsStore, address: string) => {
  const { service } = MultiService.getInstance();

  const { topUpTransaction } = selectAccount(store.getState());

  const topUpSavedAddress = topUpTransaction?.address;
  const topUpTransactionHash = topUpTransaction?.transactionHash;

  if (!topUpTransactionHash || topUpSavedAddress !== address) {
    store.dispatch(setTopUpTransaction());

    return TopUpStep.start;
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

export const getTopUpInitialStep = createSmartAction<
  RequestAction<TopUpStep, TopUpStep>
>('topUp/getTopUpInitialStep', () => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { service } = MultiService.getInstance();
      const address = service.getKeyProvider().currentAccount();

      const { amount } = selectAccount(store.getState());

      if (amount.toNumber() === 0) {
        store.dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
      }

      const allowanceStep = checkAllowanceTransaction(store, address);

      if (allowanceStep) {
        return allowanceStep;
      }

      const topUpStep = await checkTopUpTransaction(store, address);

      if (typeof topUpStep === 'number') {
        return topUpStep;
      }

      return TopUpStep.done;
    },
  },
  meta: {
    onRequest: walletConnectionGuard,
    asQuery: true,
  },
}));

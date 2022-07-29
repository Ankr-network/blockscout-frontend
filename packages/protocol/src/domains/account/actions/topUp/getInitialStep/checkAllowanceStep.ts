import { RequestsStore, resetRequests } from '@redux-requests/core';
import { push } from 'connected-react-router';

import {
  resetTransaction,
  setAllowanceTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
// eslint-disable-next-line import/no-cycle
import { reset } from '../reset';
import { checkAllowanceTransaction } from '../checkAllowanceTransaction';

const rejectAllowance = async (
  store: RequestsStore,
  address: string,
  transactionHash: string,
) => {
  await store.dispatchRequest(checkAllowanceTransaction(transactionHash));

  store.dispatch(resetTransaction({ address }));

  await store.dispatchRequest(reset());

  store.dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
};

const getLastAllowanceTransaction = async (
  store: RequestsStore,
  address: string,
  transactionHash: string,
) => {
  const { data: receipt } = await store.dispatchRequest(
    checkAllowanceTransaction(transactionHash),
  );

  store.dispatch(
    setAllowanceTransaction({
      address,
      allowanceTransactionHash: receipt?.transactionHash,
    }),
  );

  store.dispatch(resetRequests([checkAllowanceTransaction.toString()]));
};

export const checkAllowanceStep = async (
  store: RequestsStore,
  rejectAllowanceTransactionHash?: string,
  allowanceTransactionHash?: string,
) => {
  const service = await MultiService.getInstance();
  const provider = service.getKeyProvider();
  const { currentAccount: address } = provider;

  if (rejectAllowanceTransactionHash) {
    rejectAllowance(store, address, rejectAllowanceTransactionHash);

    return TopUpStep.deposit;
  }

  if (!allowanceTransactionHash) return null;

  getLastAllowanceTransaction(store, address, allowanceTransactionHash);

  return TopUpStep.deposit;
};

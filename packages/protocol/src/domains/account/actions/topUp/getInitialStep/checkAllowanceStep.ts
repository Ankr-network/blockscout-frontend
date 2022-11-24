import { RequestsStore } from '@redux-requests/core';

import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { checkAllowanceTransaction } from '../checkAllowanceTransaction';
import { resetTransactionSliceAndRedirect } from '../resetTransactionSliceAndRedirect';

const getLastAllowanceTransaction = async (
  store: RequestsStore,
  address: string,
  transactionHash: string,
) => {
  const { data: receipt } = await store.dispatchRequest(
    checkAllowanceTransaction(transactionHash),
  );

  if (receipt) {
    store.dispatch(
      setAllowanceTransaction({
        address,
        allowanceTransactionHash: receipt?.transactionHash,
      }),
    );
  } else {
    resetTransactionSliceAndRedirect(store, address);
  }
};

export const checkAllowanceStep = async (
  store: RequestsStore,
  rejectAllowanceTransactionHash?: string,
  allowanceTransactionHash?: string,
) => {
  const service = await MultiService.getWeb3Service();
  const provider = service.getKeyProvider();
  const { currentAccount: address } = provider;

  if (rejectAllowanceTransactionHash) {
    await store.dispatchRequest(
      checkAllowanceTransaction(rejectAllowanceTransactionHash),
    );

    resetTransactionSliceAndRedirect(store, address);

    return TopUpStep.deposit;
  }

  if (!allowanceTransactionHash) return null;

  getLastAllowanceTransaction(store, address, allowanceTransactionHash);

  return TopUpStep.deposit;
};

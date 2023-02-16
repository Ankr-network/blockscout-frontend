import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { resetTransactionSliceAndRedirect } from '../resetTransactionSliceAndRedirect';
import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { topUpCheckAllowanceTransaction } from '../checkAllowanceTransaction';

const getLastAllowanceTransaction = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  getState: GetState,
  address: string,
  transactionHash: string,
) => {
  const { data: receipt } = await dispatch(
    topUpCheckAllowanceTransaction.initiate(transactionHash),
  );

  if (receipt) {
    dispatch(
      setAllowanceTransaction({
        address,
        allowanceTransactionHash: receipt?.transactionHash,
      }),
    );
  } else {
    resetTransactionSliceAndRedirect(dispatch, getState, address);
  }
};

export const checkAllowanceStep = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  getState: GetState,
  rejectAllowanceTransactionHash?: string,
  allowanceTransactionHash?: string,
) => {
  const service = await MultiService.getWeb3Service();
  const provider = service.getKeyProvider();
  const { currentAccount: address } = provider;

  if (rejectAllowanceTransactionHash) {
    await dispatch(
      topUpCheckAllowanceTransaction.initiate(rejectAllowanceTransactionHash),
    );

    resetTransactionSliceAndRedirect(dispatch, getState, address);

    return TopUpStep.deposit;
  }

  if (!allowanceTransactionHash) return null;

  getLastAllowanceTransaction(
    dispatch,
    getState,
    address,
    allowanceTransactionHash,
  );

  return TopUpStep.deposit;
};

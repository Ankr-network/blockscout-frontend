import { setAllowanceTransaction } from 'domains/account/store/accountTopUpSlice';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { topUpCheckAllowanceTransaction } from '../checkAllowanceTransaction';
import { resetTransactionSliceAndRedirect } from '../resetTransactionSliceAndRedirect';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

const getLastAllowanceTransaction = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
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
    resetTransactionSliceAndRedirect(dispatch, address);
  }
};

export const checkAllowanceStep = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
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

    resetTransactionSliceAndRedirect(dispatch, address);

    return TopUpStep.deposit;
  }

  if (!allowanceTransactionHash) return null;

  getLastAllowanceTransaction(dispatch, address, allowanceTransactionHash);

  return TopUpStep.deposit;
};

import { IWeb3SendResult } from '@ankr.com/provider';

import { AppDispatch } from 'store';
import { TQueryFulfilled } from 'store/queries/types';

import {
  setAllowanceError,
  setAllowanceTxHash,
  setIsApproving,
} from '../store/paymentsSlice';

export interface IHandleAllowanceQueryParams {
  dispatch: AppDispatch;
  queryFulfilled: TQueryFulfilled<IWeb3SendResult | null>;
  txId: string;
}

export const handleAllowanceQuery = async ({
  dispatch,
  queryFulfilled,
  txId,
}: IHandleAllowanceQueryParams) => {
  dispatch(setIsApproving({ isApproving: true, id: txId }));

  try {
    const { data } = await queryFulfilled;

    const allowanceTxHash = data?.transactionHash;

    if (allowanceTxHash) {
      dispatch(setAllowanceTxHash({ allowanceTxHash, id: txId }));
    }
  } catch (error) {
    // TODO: handle properly
    const allowanceError = JSON.stringify(error);

    dispatch(setAllowanceError({ allowanceError, id: txId }));

    throw error;
  } finally {
    dispatch(setIsApproving({ isApproving: false, id: txId }));
  }
};

import { IWeb3SendResult } from '@ankr.com/provider';

import { AppDispatch } from 'store';
import { TQueryFulfilled } from 'store/queries/types';

import {
  setDepositError,
  setDepositTxHash,
  setIsDepositing,
} from '../store/paymentsSlice';

export interface IHandleDepositQueryParams {
  dispatch: AppDispatch;
  queryFulfilled: TQueryFulfilled<IWeb3SendResult | null>;
  txId: string;
}

export const handleDepositQuery = async ({
  dispatch,
  queryFulfilled,
  txId,
}: IHandleDepositQueryParams) => {
  dispatch(setIsDepositing({ isDepositing: true, id: txId }));

  try {
    const { data } = await queryFulfilled;

    const depositTxHash = data?.transactionHash;

    if (depositTxHash) {
      dispatch(setDepositTxHash({ depositTxHash, id: txId }));
    }
  } catch (error) {
    // TODO: handle properly
    const depositError = JSON.stringify(error);

    dispatch(setDepositError({ depositError, id: txId }));

    throw error;
  } finally {
    dispatch(setIsDepositing({ isDepositing: false, id: txId }));
  }
};

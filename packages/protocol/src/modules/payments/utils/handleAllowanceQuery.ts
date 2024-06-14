import { IWeb3SendResult } from '@ankr.com/provider';
import { t } from '@ankr.com/common';

import { AppDispatch } from 'store';
import { TQueryFulfilled } from 'store/queries/types';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { isQueryReturnValue } from 'store/utils/isQueryReturnValue';

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

const getAlowanceError = (error: unknown) => {
  if (isMetamaskError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return t('error.common');
};

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
  } catch (exception) {
    if (isQueryReturnValue(exception)) {
      const allowanceError = getAlowanceError(exception.error);

      dispatch(setAllowanceError({ allowanceError, id: txId }));
    } else {
      throw exception;
    }
  } finally {
    dispatch(setIsApproving({ isApproving: false, id: txId }));
  }
};

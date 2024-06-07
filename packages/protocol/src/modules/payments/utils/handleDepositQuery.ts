import { IWeb3SendResult } from '@ankr.com/provider';
import { t } from '@ankr.com/common';

import { AppDispatch } from 'store';
import { TQueryFulfilled } from 'store/queries/types';
import { isMetamaskError } from 'modules/common/utils/isMetamaskError';
import { isQueryReturnValue } from 'store/utils/isQueryReturnValue';

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
  } catch (exception) {
    if (isQueryReturnValue(exception)) {
      const depositError = isMetamaskError(exception.error)
        ? exception.error.message
        : t('error.common');

      dispatch(setDepositError({ depositError, id: txId }));
    } else {
      throw exception;
    }
  } finally {
    dispatch(setIsDepositing({ isDepositing: false, id: txId }));
  }
};

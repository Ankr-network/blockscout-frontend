import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { withdraw } from '../actions/withdraw/withdraw';
import { waitTransactionConfirming } from '../actions/withdraw/waitTransactionConfirming';
import { resetWithdraw } from '../actions/withdraw/resetWithdraw';

import { useAppDispatch } from 'store/useAppDispatch';
import { setAmount } from 'domains/account/store/accountWithdrawSlice';
import {
  checkWithdrawStatus,
  WIHDRAWAL_STATUS_INTERVAL,
} from '../actions/withdraw/checkWithdrawStatus';
import { useAddress } from './useAddress';
import { useSelectWithdrawalTransaction } from './useSelectWithdrawalTransaction';

export const useWithdraw = () => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const address = useAddress();
  const transaction = useSelectWithdrawalTransaction();

  const amount = useMemo(
    () => new BigNumber(transaction?.amount || 0),
    [transaction],
  );

  const handleWithdraw = useCallback(
    () => dispatchRequest(withdraw()),
    [dispatchRequest],
  );

  const handleWaitTransactionConfirming = useCallback(
    () => dispatchRequest(waitTransactionConfirming()),
    [dispatchRequest],
  );

  const handleSetAmount = useCallback(
    (value: BigNumber) => dispatch(setAmount({ address, amount: value })),
    [dispatch, address],
  );

  const handleResetWithdraw = useCallback(
    () => dispatch(resetWithdraw()),
    [dispatch],
  );

  const handleCheckWithdrawStatus = useCallback(
    () =>
      dispatch(
        checkWithdrawStatus(
          transaction?.withdrawTransactionHash,
          WIHDRAWAL_STATUS_INTERVAL,
        ),
      ),
    [dispatch, transaction?.withdrawTransactionHash],
  );

  const { loading: loadingWithdraw } = useQuery({
    type: withdraw.toString(),
  });

  const {
    loading: loadingWaitTransactionConfirming,
    error: errorWaitTransactionConfirming,
  } = useQuery({
    type: waitTransactionConfirming.toString(),
  });

  return {
    handleSetAmount,
    amount,
    loading: loadingWithdraw || loadingWaitTransactionConfirming,
    hasError: Boolean(errorWaitTransactionConfirming),
    handleWithdraw,
    handleResetWithdraw,
    handleWaitTransactionConfirming,
    handleCheckWithdrawStatus,
  };
};

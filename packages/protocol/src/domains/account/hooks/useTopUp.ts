import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';
import { resetRequests } from '@redux-requests/core';

import { deposit } from '../actions/topUp/deposit';
import { fetchPublicKey } from '../actions/fetchPublicKey';
import { sendAllowance } from '../actions/topUp/sendAllowance';
import { login } from '../actions/topUp/login';
import { waitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { rejectAllowance } from '../actions/topUp/rejectAllowance';
import { redirectIfCredentials } from '../actions/topUp/redirectIfCredentials';
import { checkAllowanceTransaction } from '../actions/topUp/checkAllowanceTransaction';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import {
  setAmount,
  selectTransaction,
  resetTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { MultiService } from 'modules/api/MultiService';

export const useTopUp = () => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { service } = MultiService.getInstance();
  const address = service.getKeyProvider().currentAccount();

  const transaction = useAppSelector(selectTransaction);
  const amount = useMemo(
    () => new BigNumber(transaction?.amount || 0),
    [transaction],
  );

  const handleFetchPublicKey = useCallback(
    () => dispatchRequest(fetchPublicKey()),
    [dispatchRequest],
  );

  const handleGetAllowance = useCallback(
    () => dispatchRequest(sendAllowance(amount)),
    [dispatchRequest, amount],
  );

  const handleDeposit = useCallback(
    () => dispatchRequest(deposit(amount)),
    [dispatchRequest, amount],
  );

  const handleResetDeposit = useCallback(() => {
    dispatch(
      resetRequests([deposit.toString(), waitTransactionConfirming.toString()]),
    );
  }, [dispatch]);

  const handleWaitTransactionConfirming = useCallback(
    () => dispatchRequest(waitTransactionConfirming()),
    [dispatchRequest],
  );

  const handleLogin = useCallback(
    () => dispatchRequest(login()),
    [dispatchRequest],
  );

  const handleResetTopUpTransaction = useCallback(() => {
    dispatch(resetTransaction({ address }));
  }, [dispatch, address]);

  const handleSetAmount = useCallback(
    (value: BigNumber) => dispatch(setAmount({ address, amount: value })),
    [dispatch, address],
  );

  const handleRejectAllowance = useCallback(
    () => dispatchRequest(rejectAllowance()),
    [dispatchRequest],
  );

  const handleRedirectIfCredentials = useCallback(
    () => dispatchRequest(redirectIfCredentials()),
    [dispatchRequest],
  );

  const { loading: loadingGetAllowance } = useQuery({
    type: sendAllowance.toString(),
  });

  const { loading: loadingFetchPublicKey } = useQuery({
    type: fetchPublicKey.toString(),
  });

  const { loading: loadingDeposit } = useQuery({
    type: deposit.toString(),
  });

  const {
    loading: loadingWaitTransactionConfirming,
    error: errorWaitTransactionConfirming,
  } = useQuery({
    type: waitTransactionConfirming.toString(),
  });

  const { loading: loadingLogin } = useMutation({
    type: login.toString(),
  });

  const { loading: loadingRejectAllowance } = useQuery({
    type: rejectAllowance.toString(),
  });

  const { loading: loadingCheckAllowanceTransaction } = useQuery({
    type: checkAllowanceTransaction.toString(),
  });

  return {
    handleSetAmount,
    amount,
    loading:
      loadingGetAllowance ||
      loadingFetchPublicKey ||
      loadingDeposit ||
      loadingWaitTransactionConfirming ||
      loadingLogin ||
      loadingCheckAllowanceTransaction,
    hasError: Boolean(errorWaitTransactionConfirming),
    isRejectAllowanceLoading: loadingRejectAllowance,
    handleFetchPublicKey,
    handleGetAllowance,
    handleDeposit,
    handleWaitTransactionConfirming,
    handleLogin,
    handleResetTopUpTransaction,
    handleRejectAllowance,
    handleRedirectIfCredentials,
    handleResetDeposit,
  };
};

import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { deposit } from '../actions/topUp/deposit';
import { fetchPublicKey } from '../actions/topUp/fetchPublicKey';
import { getAllowance } from '../actions/topUp/getAllowance';
import { login } from '../actions/topUp/login';
import { waitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { useAppDispatch } from 'store/useAppDispatch';
import {
  selectAccount,
  setTopUpTransaction,
  setAmount,
} from 'domains/account/store/accountSlice';
import { useAppSelector } from 'store/useAppSelector';
import { fetchPublicKeyAgain } from '../actions/topUp/fetchPublicKeyAgain';

export function useTopUp() {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const { amount } = useAppSelector(selectAccount);

  const handleFetchPublicKey = useCallback(
    () => dispatchRequest(fetchPublicKey()),
    [dispatchRequest],
  );

  const handleGetAllowance = useCallback(
    () => dispatchRequest(getAllowance(amount)),
    [dispatchRequest, amount],
  );

  const handleDeposit = useCallback(
    () => dispatchRequest(deposit(amount)),
    [dispatchRequest, amount],
  );

  const handleWaitTransactionConfirming = useCallback(
    () => dispatchRequest(waitTransactionConfirming()),
    [dispatchRequest],
  );

  const handleFetchPublicKeyAgain = useCallback(
    () => dispatchRequest(fetchPublicKeyAgain()),
    [dispatchRequest],
  );

  const handleLogin = useCallback(
    () => dispatchRequest(login()),
    [dispatchRequest],
  );

  const handleResetTopUpTransaction = useCallback(
    () => dispatch(setTopUpTransaction()),
    [dispatch],
  );

  const handleSetAmount = useCallback(
    (value: BigNumber) => dispatch(setAmount(value)),
    [dispatch],
  );

  const { loading: loadingGetAllowance, error: errorGetAllowance } = useQuery({
    type: getAllowance.toString(),
  });

  const { loading: loadingFetchPublicKey, error: errorFetchPublicKey } =
    useQuery({
      type: fetchPublicKey.toString(),
    });

  const { loading: loadingDeposit, error: errorDeposit } = useQuery({
    type: deposit.toString(),
  });

  const {
    loading: loadingWaitTransactionConfirming,
    error: errorWaitTransactionConfirming,
  } = useQuery({
    type: waitTransactionConfirming.toString(),
  });

  const {
    loading: loadingFetchPublicKeyAgain,
    error: errorFetchPublicKeyAgain,
  } = useQuery({
    type: fetchPublicKeyAgain.toString(),
  });

  const { loading: loadingLogin, error: errorLogin } = useQuery({
    type: login.toString(),
  });

  return {
    handleSetAmount,
    amount,
    loading:
      loadingGetAllowance ||
      loadingFetchPublicKey ||
      loadingDeposit ||
      loadingWaitTransactionConfirming ||
      loadingFetchPublicKeyAgain ||
      loadingLogin,
    hasError: Boolean(
      errorGetAllowance ||
        errorFetchPublicKey ||
        errorDeposit ||
        errorWaitTransactionConfirming ||
        errorFetchPublicKeyAgain ||
        errorLogin,
    ),

    handleFetchPublicKey,
    handleGetAllowance,
    handleDeposit,
    handleWaitTransactionConfirming,
    handleFetchPublicKeyAgain,
    handleLogin,
    handleResetTopUpTransaction,
  };
}

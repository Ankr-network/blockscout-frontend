import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { deposit } from '../actions/topUp/deposit';
import { fetchPublicKey } from '../actions/topUp/fetchPublicKey';
import { getAllowance } from '../actions/topUp/getAllowance';
import { login } from '../actions/topUp/login';
import { waitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { useAppDispatch } from 'store/useAppDispatch';
import {
  setTopUpTransaction,
  setAmount,
  selectTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { useAppSelector } from 'store/useAppSelector';
import { rejectAllowance } from '../actions/topUp/rejectAllowance';
import { redirectIfCredentials } from '../actions/topUp/redirectIfCredentials';
import { MultiService } from 'modules/api/MultiService';

export function useTopUp() {
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
    () => dispatchRequest(getAllowance(amount)),
    [dispatchRequest, amount],
  );

  const handleDeposit = useCallback(
    () => dispatchRequest(deposit(amount)),
    [dispatchRequest, amount],
  );

  const handleWaitTransactionConfirming = useCallback(
    receiptPromise =>
      dispatchRequest(waitTransactionConfirming(receiptPromise)),
    [dispatchRequest],
  );

  const handleLogin = useCallback(
    () => dispatchRequest(login()),
    [dispatchRequest],
  );

  const handleResetTopUpTransaction = useCallback(
    () => dispatch(setTopUpTransaction({ address })),
    [dispatch, address],
  );

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

  const { loading: loadingLogin, error: errorLogin } = useMutation({
    type: login.toString(),
  });

  const { loading: loadingRejectAllowance } = useQuery({
    type: rejectAllowance.toString(),
  });

  return {
    handleSetAmount,
    amount,
    loading:
      loadingGetAllowance ||
      loadingFetchPublicKey ||
      loadingDeposit ||
      loadingWaitTransactionConfirming ||
      loadingLogin,
    hasError: Boolean(
      errorGetAllowance ||
        errorFetchPublicKey ||
        errorDeposit ||
        errorWaitTransactionConfirming ||
        errorLogin,
    ),
    isRejectAllowanceLoading: loadingRejectAllowance,
    handleFetchPublicKey,
    handleGetAllowance,
    handleDeposit,
    handleWaitTransactionConfirming,
    handleLogin,
    handleResetTopUpTransaction,
    handleRejectAllowance,
    handleRedirectIfCredentials,
  };
}

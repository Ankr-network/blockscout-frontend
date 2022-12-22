import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { accountFetchPublicKey } from '../actions/fetchPublicKey';
import {
  setAmount,
  resetTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { topUpCheckAllowanceTransaction } from '../actions/topUp/checkAllowanceTransaction';
import { topUpDeposit } from '../actions/topUp/deposit';
import { topUpLogin } from '../actions/topUp/login';
import { topUpRedirectIfCredentials } from '../actions/topUp/redirectIfCredentials';
import { topUpRejectAllowance } from '../actions/topUp/rejectAllowance';
import { topUpSendAllowance } from '../actions/topUp/sendAllowance';
import { topUpWaitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { useAddress } from './useAddress';
import { useAppDispatch } from 'store/useAppDispatch';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectTopUpTransaction } from './useSelectTopUpTransaction';

export const useTopUp = () => {
  const dispatch = useAppDispatch();

  const [deposit, { isLoading: loadingDeposit }, depositReset] =
    useQueryEndpoint(topUpDeposit);

  const [fetchPublicKey, { isLoading: loadingFetchPublicKey }] =
    useQueryEndpoint(accountFetchPublicKey);

  const [sendAllowance, { isLoading: loadingGetAllowance }] =
    useQueryEndpoint(topUpSendAllowance);

  const [login, { isLoading: loadingLogin }] = useQueryEndpoint(topUpLogin);

  const [
    waitTransactionConfirming,
    {
      data: { error: errorWaitTransactionConfirming = undefined } = {},
      isLoading: loadingWaitTransactionConfirming,
    },
    waitTransactionConfirmingReset,
  ] = useQueryEndpoint(topUpWaitTransactionConfirming);

  const [rejectAllowance, { isLoading: loadingRejectAllowance }] =
    useQueryEndpoint(topUpRejectAllowance);

  const [redirectIfCredentials] = useQueryEndpoint(topUpRedirectIfCredentials);

  const [, { isLoading: loadingCheckAllowanceTransaction }] = useQueryEndpoint(
    topUpCheckAllowanceTransaction,
  );

  const address = useAddress();
  const transaction = useSelectTopUpTransaction();

  const amount = useMemo(
    () => new BigNumber(transaction?.amount || 0),
    [transaction],
  );

  const handleFetchPublicKey = useCallback(
    () => fetchPublicKey(),
    [fetchPublicKey],
  );

  const handleGetAllowance = useCallback(
    () => sendAllowance(amount),
    [sendAllowance, amount],
  );

  const handleDeposit = useCallback(() => deposit(amount), [deposit, amount]);

  const handleResetDeposit = useCallback(() => {
    depositReset();
    waitTransactionConfirmingReset();
  }, [depositReset, waitTransactionConfirmingReset]);

  const handleWaitTransactionConfirming = useCallback(
    () => waitTransactionConfirming(),
    [waitTransactionConfirming],
  );

  const handleLogin = useCallback(() => login(), [login]);

  const handleResetTopUpTransaction = useCallback(() => {
    dispatch(resetTransaction({ address }));
  }, [dispatch, address]);

  const handleSetAmount = useCallback(
    (value: BigNumber) => {
      dispatch(setAmount({ address, amount: value }));
    },
    [dispatch, address],
  );

  const handleRejectAllowance = useCallback(
    () => rejectAllowance(),
    [rejectAllowance],
  );

  const handleRedirectIfCredentials = useCallback(
    () => redirectIfCredentials(),
    [redirectIfCredentials],
  );

  const loading =
    loadingGetAllowance ||
    loadingFetchPublicKey ||
    loadingDeposit ||
    loadingWaitTransactionConfirming ||
    loadingLogin ||
    loadingCheckAllowanceTransaction;

  return {
    amount,
    handleDeposit,
    handleFetchPublicKey,
    handleGetAllowance,
    handleLogin,
    handleRedirectIfCredentials,
    handleRejectAllowance,
    handleResetDeposit,
    handleResetTopUpTransaction,
    handleSetAmount,
    handleWaitTransactionConfirming,
    hasError: Boolean(errorWaitTransactionConfirming),
    isRejectAllowanceLoading: loadingRejectAllowance,
    loading,
    loadingWaitTransactionConfirming,
  };
};

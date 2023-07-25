import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import {
  setAmount,
  resetTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { accountFetchPublicKey } from '../actions/fetchPublicKey';
import { topUpCheckAllowanceTransaction } from '../actions/topUp/checkAllowanceTransaction';
import { topUpDeposit } from '../actions/topUp/deposit';
import { topUpDepositForUser } from '../actions/topUp/depositForUser';
import { topUpLogin } from '../actions/topUp/login';
import { topUpRedirectIfCredentials } from '../actions/topUp/redirectIfCredentials';
import { topUpRejectAllowance } from '../actions/topUp/rejectAllowance';
import { topUpSendAllowance } from '../actions/topUp/sendAllowance';
import { topUpWaitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { useAddress } from './useAddress';
import { useSelectTopUpTransaction } from './useSelectTopUpTransaction';
import { useTopUpTrackingHandler } from './useTopUpTrackingHandler';
import { topUpResetTransactionSliceAndRedirect } from '../actions/topUp/resetTransactionSliceAndRedirect';

export const useTopUp = () => {
  const { selectedGroupAddress } = useSelectedUserGroup();

  const dispatch = useAppDispatch();

  const [deposit, { isLoading: loadingDeposit }, depositReset] =
    useQueryEndpoint(topUpDeposit);

  const [
    depositForUser,
    { isLoading: loadingDepositForUser },
    depositForUserReset,
  ] = useQueryEndpoint(topUpDepositForUser);

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

  const [handleResetTransactionSliceAndRedirect] = useQueryEndpoint(
    topUpResetTransactionSliceAndRedirect,
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

  const handleDeposit = useCallback(() => {
    if (selectedGroupAddress) {
      return depositForUser({ amount, targetAddress: selectedGroupAddress });
    }

    return deposit(amount);
  }, [selectedGroupAddress, depositForUser, amount, deposit]);

  const handleResetDeposit = useCallback(() => {
    if (selectedGroupAddress) {
      depositForUserReset();
    } else {
      depositReset();
    }

    waitTransactionConfirmingReset();
  }, [
    depositForUserReset,
    depositReset,
    selectedGroupAddress,
    waitTransactionConfirmingReset,
  ]);

  const handleWaitTransactionConfirming = useCallback(
    () => waitTransactionConfirming({ group: selectedGroupAddress }),
    [waitTransactionConfirming, selectedGroupAddress],
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

  const trackTopUp = useTopUpTrackingHandler();

  const handleRejectAllowance = useCallback(() => {
    const result = rejectAllowance({ group: selectedGroupAddress });

    trackTopUp({
      isAllowanceConfirmed: true,
      isTopUpAccepted: true,
    });

    return result;
  }, [rejectAllowance, trackTopUp, selectedGroupAddress]);

  const handleRedirectIfCredentials = useCallback(
    () => redirectIfCredentials(),
    [redirectIfCredentials],
  );

  const loading =
    loadingGetAllowance ||
    loadingFetchPublicKey ||
    loadingDeposit ||
    loadingDepositForUser ||
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
    trackTopUp,
    handleResetTransactionSliceAndRedirect,
  };
};

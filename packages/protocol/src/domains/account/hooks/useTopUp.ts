import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import {
  setAmount,
  resetTransaction,
  setApprovedAmount,
} from 'domains/account/store/accountTopUpSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTopupFromDifferentAddress } from 'modules/billing/components/PaymentForm/hooks/useTopupFromDifferentAddress';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';

import { accountFetchPublicKey } from '../actions/fetchPublicKey';
import { topUpCheckAllowanceTransaction } from '../actions/topUp/checkAllowanceTransaction';
import { topUpDeposit } from '../actions/topUp/deposit';
import { topUpDepositForUser } from '../actions/topUp/depositForUser';
import { topUpLogin } from '../actions/topUp/login';
import { topUpRedirectIfCredentials } from '../actions/topUp/redirectIfCredentials';
import { topUpRejectAllowance } from '../actions/topUp/rejectAllowance';
import { topUpSendAllowance } from '../actions/topUp/sendAllowance';
import { topUpWaitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { useSelectTopUpTransaction } from './useSelectTopUpTransaction';
import { useTopUpTrackingHandler } from './useTopUpTrackingHandler';
import { topUpResetTransactionSliceAndRedirect } from '../actions/topUp/resetTransactionSliceAndRedirect';

const getErrorMessage = (error: any) => {
  if (error && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return undefined;
};

// eslint-disable-next-line max-lines-per-function
export const useTopUp = () => {
  const { address: personalAddress } = useAuth();
  const { connectedAddress } = useConnectedAddress();
  const { selectedGroupAddress } = useSelectedUserGroup();

  const address = selectedGroupAddress ?? connectedAddress ?? personalAddress;

  const dispatch = useAppDispatch();

  const { isDepositAddressDifferent } = useTopupFromDifferentAddress();

  const [
    deposit,
    { isLoading: loadingDeposit, error: depositError },
    depositReset,
  ] = useQueryEndpoint(topUpDeposit);

  const [
    depositForUser,
    { isLoading: loadingDepositForUser, error: depositForUserError },
    depositForUserReset,
  ] = useQueryEndpoint(topUpDepositForUser);

  const [fetchPublicKey, { isLoading: loadingFetchPublicKey }] =
    useQueryEndpoint(accountFetchPublicKey);

  const [
    sendAllowance,
    { isLoading: loadingGetAllowance, error: sendAllowanceError },
  ] = useQueryEndpoint(topUpSendAllowance);

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

  const transaction = useSelectTopUpTransaction();

  const amount = useMemo(
    () => new BigNumber(transaction?.amount || 0),
    [transaction],
  );

  const amountToApprove = useMemo(
    () =>
      new BigNumber(transaction?.amountToApprove || transaction?.amount || 0),
    [transaction],
  );

  const approvedAmount = useMemo(
    () => new BigNumber(transaction?.approvedAmount || 0),
    [transaction],
  );

  const handleFetchPublicKey = useCallback(
    () => fetchPublicKey(),
    [fetchPublicKey],
  );

  const handleGetAllowance = useCallback(
    () => sendAllowance(amountToApprove),
    [sendAllowance, amountToApprove],
  );

  const handleDeposit = useCallback(() => {
    if (selectedGroupAddress) {
      return depositForUser({
        amount: approvedAmount,
        targetAddress: selectedGroupAddress,
      });
    }

    if (isDepositAddressDifferent) {
      return depositForUser({
        amount: approvedAmount,
        targetAddress: personalAddress,
      });
    }

    return deposit(approvedAmount);
  }, [
    approvedAmount,
    selectedGroupAddress,
    isDepositAddressDifferent,
    deposit,
    depositForUser,
    personalAddress,
  ]);

  const handleResetDeposit = useCallback(() => {
    if (selectedGroupAddress || isDepositAddressDifferent) {
      depositForUserReset();
    } else {
      depositReset();
    }

    waitTransactionConfirmingReset();
  }, [
    isDepositAddressDifferent,
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

  const handleSetApprovedAmount = useCallback(
    (value: BigNumber) => {
      dispatch(setApprovedAmount({ address, amount: value }));
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

  const depositErrorMessage =
    getErrorMessage(depositError) || getErrorMessage(depositForUserError);

  const hasError = Boolean(
    errorWaitTransactionConfirming || sendAllowanceError || depositErrorMessage,
  );

  return {
    amount,
    amountToApprove,
    approvedAmount,
    handleDeposit,
    handleFetchPublicKey,
    handleGetAllowance,
    handleLogin,
    handleRedirectIfCredentials,
    handleRejectAllowance,
    handleResetDeposit,
    handleResetTopUpTransaction,
    handleSetAmount,
    handleSetApprovedAmount,
    handleWaitTransactionConfirming,
    hasError,
    isRejectAllowanceLoading: loadingRejectAllowance,
    loading,
    loadingWaitTransactionConfirming,
    trackTopUp,
    handleResetTransactionSliceAndRedirect,

    sendAllowanceErrorMessage: getErrorMessage(sendAllowanceError),
    depositErrorMessage,
  };
};

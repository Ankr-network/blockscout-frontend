import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { ECurrency } from 'modules/billing/types';
import {
  resetTransaction,
  setAmount,
  setApprovedAmount,
} from 'domains/account/store/accountTopUpSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTopupFromDifferentAddress } from 'modules/billing/components/PaymentForm/hooks/useTopupFromDifferentAddress';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

import { accountFetchPublicKey } from '../actions/fetchPublicKey';
import { selectPaymentOptionsByNetwork } from '../store/selectors';
import { topUpCheckAllowanceTransaction } from '../actions/topUp/checkAllowanceTransaction';
import { topUpDeposit } from '../actions/topUp/deposit';
import { topUpDepositForUser } from '../actions/topUp/depositForUser';
import { topUpDepositForUserUSDC } from '../actions/topUp/depositForUserUSDC';
import { topUpDepositForUserUSDT } from '../actions/topUp/depositForUserUSDT';
import { topUpDepositUSDC } from '../actions/topUp/depositUSDC';
import { topUpDepositUSDT } from '../actions/topUp/depositUSDT';
import { topUpLogin } from '../actions/topUp/login';
import { topUpRedirectIfCredentials } from '../actions/topUp/redirectIfCredentials';
import { topUpRejectAllowance } from '../actions/topUp/rejectAllowance';
import { topUpResetTransactionSliceAndRedirect } from '../actions/topUp/resetTransactionSliceAndRedirect';
import { topUpSendAllowanceAnkr } from '../actions/topUp/sendAllowanceAnkr';
import { topUpSendAllowanceUsdc } from '../actions/topUp/sendAllowanceUsdc';
import { topUpSendAllowanceUsdt } from '../actions/topUp/sendAllowanceUsdt';
import { topUpWaitTransactionConfirming } from '../actions/topUp/waitTransactionConfirming';
import { useSelectTopUpTransaction } from './useSelectTopUpTransaction';
import { useTopUpTrackingHandler } from './useTopUpTrackingHandler';
import { EBlockchain } from 'multirpc-sdk';

const getErrorMessage = (error: any) => {
  if (error && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return undefined;
};

// eslint-disable-next-line max-lines-per-function
export const useTopUp = () => {
  const { address: personalAddress } = useAuth();
  const { walletAddress: connectedAddress } = useWalletAddress();
  const { selectedGroupAddress } = useSelectedUserGroup();

  const address = connectedAddress ?? personalAddress;

  const dispatch = useAppDispatch();

  const { isDepositAddressDifferent } = useTopupFromDifferentAddress();

  const [
    depositANKR,
    { isLoading: loadingDepositANKR, error: depositANKRError },
    depositResetANKR,
  ] = useQueryEndpoint(topUpDeposit);

  const [
    depositUSDC,
    { isLoading: loadingDepositUSDC, error: depositUSDCError },
    depositResetUSDC,
  ] = useQueryEndpoint(topUpDepositUSDC);

  const [
    depositUSDT,
    { isLoading: loadingDepositUSDT, error: depositUSDTError },
    depositResetUSDT,
  ] = useQueryEndpoint(topUpDepositUSDT);

  const [
    depositUSDCForUser,
    { isLoading: loadingDepositUSDCForUser, error: depositUSDCForUserError },
    depositUSDCForUserReset,
  ] = useQueryEndpoint(topUpDepositForUserUSDC);

  const [
    depositUSDTForUser,
    { isLoading: loadingDepositUSDTForUser, error: depositUSDTForUserError },
    depositUSDTForUserReset,
  ] = useQueryEndpoint(topUpDepositForUserUSDT);

  const [
    depositANKRForUser,
    { isLoading: loadingDepositANKRForUser, error: depositANKRForUserError },
    depositANKRForUserReset,
  ] = useQueryEndpoint(topUpDepositForUser);

  const [fetchPublicKey, { isLoading: loadingFetchPublicKey }] =
    useQueryEndpoint(accountFetchPublicKey);

  const [
    sendAllowanceAnkr,
    {
      data: isAllowanceAnkrSent = false,
      error: sendAllowanceAnkrError,
      isLoading: isSendAllowanceAnkrLoading,
    },
    handleResetAllowanceAnkr,
  ] = useQueryEndpoint(topUpSendAllowanceAnkr);

  const [
    sendAllowanceUsdc,
    {
      data: isAllowanceUsdcSent = false,
      error: sendAllowanceUsdcError,
      isLoading: isSendAllowanceUsdcLoading,
    },
    handleResetAllowanceUsdc,
  ] = useQueryEndpoint(topUpSendAllowanceUsdc);

  const [
    sendAllowanceUsdt,
    {
      data: isAllowanceUsdtSent = false,
      error: sendAllowanceUsdtError,
      isLoading: isSendAllowanceUsdtLoading,
    },
    handleResetAllowanceUsdt,
  ] = useQueryEndpoint(topUpSendAllowanceUsdt);

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

  const amountToDeposit = useMemo(() => {
    return new BigNumber(transaction?.amountToDeposit || 0);
  }, [transaction]);

  const approvedAmount = useMemo(
    () => new BigNumber(transaction?.approvedAmount || 0),
    [transaction],
  );

  const transactionCurrency = transaction?.currency;
  const transactionNetwork = transaction?.network;

  const handleFetchPublicKey = useCallback(
    () => fetchPublicKey(),
    [fetchPublicKey],
  );

  const {
    depositContractAddress = '',
    tokenAddress = '',
    tokenDecimals = 0,
    confirmationBlocksNumber = 0,
  } = useAppSelector(state =>
    selectPaymentOptionsByNetwork(
      state,
      transactionNetwork,
      transactionCurrency,
    ),
  );

  // eslint-disable-next-line consistent-return
  const handleSendAllowance = useCallback(() => {
    if (transactionCurrency === ECurrency.ANKR) {
      return sendAllowanceAnkr(amountToDeposit);
    }

    if (transactionCurrency === ECurrency.USDT) {
      return sendAllowanceUsdt({
        network: transactionNetwork ?? EBlockchain.eth,
        amount: amountToDeposit,
        depositContractAddress,
        tokenAddress,
        tokenDecimals,
        confirmationBlocksNumber,
      });
    }

    if (transactionCurrency === ECurrency.USDC) {
      return sendAllowanceUsdc({
        network: transactionNetwork ?? EBlockchain.eth,
        amount: amountToDeposit,
        depositContractAddress,
        tokenAddress,
        tokenDecimals,
        confirmationBlocksNumber,
      });
    }
  }, [
    transactionCurrency,
    sendAllowanceAnkr,
    amountToDeposit,
    sendAllowanceUsdt,
    depositContractAddress,
    tokenAddress,
    tokenDecimals,
    confirmationBlocksNumber,
    sendAllowanceUsdc,
  ]);

  // add payment currency check to manage with actions requests
  const handleDeposit = useCallback(() => {
    const defaultParams = {
      tokenDecimals,
      amount: amountToDeposit,
      depositContractAddress,
      tokenAddress,
    };

    if (transactionCurrency === ECurrency.USDC) {
      if (selectedGroupAddress) {
        return depositUSDCForUser({
          ...defaultParams,
          targetAddress: selectedGroupAddress,
        });
      }

      if (isDepositAddressDifferent) {
        return depositUSDCForUser({
          ...defaultParams,
          targetAddress: personalAddress,
        });
      }

      return depositUSDC(defaultParams);
    }

    if (transactionCurrency === ECurrency.USDT) {
      if (selectedGroupAddress) {
        return depositUSDTForUser({
          ...defaultParams,
          targetAddress: selectedGroupAddress,
        });
      }

      if (isDepositAddressDifferent) {
        return depositUSDTForUser({
          ...defaultParams,
          targetAddress: personalAddress,
        });
      }

      return depositUSDT(defaultParams);
    }

    if (selectedGroupAddress) {
      return depositANKRForUser({
        amount: amountToDeposit,
        targetAddress: selectedGroupAddress,
      });
    }

    if (isDepositAddressDifferent) {
      return depositANKRForUser({
        amount: amountToDeposit,
        targetAddress: personalAddress,
      });
    }

    return depositANKR(amountToDeposit);
  }, [
    tokenDecimals,
    amountToDeposit,
    depositContractAddress,
    tokenAddress,
    transactionCurrency,
    selectedGroupAddress,
    isDepositAddressDifferent,
    depositANKR,
    depositUSDC,
    depositUSDCForUser,
    personalAddress,
    depositUSDT,
    depositUSDTForUser,
    depositANKRForUser,
  ]);

  const handleResetDeposit = useCallback(() => {
    if (selectedGroupAddress || isDepositAddressDifferent) {
      depositANKRForUserReset();
      depositUSDCForUserReset();
      depositUSDTForUserReset();
    } else {
      depositResetANKR();
      depositResetUSDC();
      depositResetUSDT();
    }

    waitTransactionConfirmingReset();
  }, [
    isDepositAddressDifferent,
    depositANKRForUserReset,
    depositUSDCForUserReset,
    depositUSDTForUserReset,
    depositResetANKR,
    depositResetUSDC,
    depositResetUSDT,
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
    isSendAllowanceAnkrLoading ||
    isSendAllowanceUsdtLoading ||
    isSendAllowanceUsdcLoading ||
    loadingFetchPublicKey ||
    loadingDepositANKR ||
    loadingDepositUSDC ||
    loadingDepositUSDT ||
    loadingDepositANKRForUser ||
    loadingDepositUSDCForUser ||
    loadingDepositUSDTForUser ||
    loadingWaitTransactionConfirming ||
    loadingLogin ||
    loadingCheckAllowanceTransaction;

  const depositErrorMessage =
    getErrorMessage(depositANKRError) ||
    getErrorMessage(depositUSDCError) ||
    getErrorMessage(depositUSDTError) ||
    getErrorMessage(depositANKRForUserError) ||
    getErrorMessage(depositUSDCForUserError) ||
    getErrorMessage(depositUSDTForUserError) ||
    getErrorMessage(errorWaitTransactionConfirming);

  const hasError =
    Boolean(sendAllowanceAnkrError || depositErrorMessage) && !loading;

  const { isAllowanceSent, sendAllowanceErrorMessage, handleResetAllowance } =
    useMemo(() => {
      switch (transactionCurrency) {
        case ECurrency.ANKR:
          return {
            isAllowanceSent: isAllowanceAnkrSent,
            sendAllowanceErrorMessage: getErrorMessage(sendAllowanceAnkrError),
            handleResetAllowance: handleResetAllowanceAnkr,
          };
        case ECurrency.USDT:
          return {
            isAllowanceSent: isAllowanceUsdtSent,
            sendAllowanceErrorMessage: getErrorMessage(sendAllowanceUsdtError),
            handleResetAllowance: handleResetAllowanceUsdt,
          };
        case ECurrency.USDC:
          return {
            isAllowanceSent: isAllowanceUsdcSent,
            sendAllowanceErrorMessage: getErrorMessage(sendAllowanceUsdcError),
            handleResetAllowance: handleResetAllowanceUsdc,
          };
        default:
          return {
            isAllowanceSent: false,
            sendAllowanceErrorMessage: undefined,
            handleResetAllowance: () => {},
          };
      }
    }, [
      handleResetAllowanceAnkr,
      handleResetAllowanceUsdc,
      handleResetAllowanceUsdt,
      isAllowanceAnkrSent,
      isAllowanceUsdcSent,
      isAllowanceUsdtSent,
      sendAllowanceAnkrError,
      sendAllowanceUsdcError,
      sendAllowanceUsdtError,
      transactionCurrency,
    ]);

  return {
    amount,
    amountToDeposit,
    approvedAmount,
    depositErrorMessage,
    handleDeposit,
    handleFetchPublicKey,
    handleLogin,
    handleRedirectIfCredentials,
    handleRejectAllowance,
    handleResetAllowance,
    handleResetDeposit,
    handleResetTopUpTransaction,
    handleResetTransactionSliceAndRedirect,
    handleSendAllowance,
    handleSetAmount,
    handleSetApprovedAmount,
    handleWaitTransactionConfirming,
    hasError,
    isAllowanceSent,
    isRejectAllowanceLoading: loadingRejectAllowance,
    loading,
    loadingWaitTransactionConfirming,
    sendAllowanceErrorMessage,
    trackTopUp,
    transactionCurrency,
    transactionNetwork,
  };
};

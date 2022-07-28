import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { push } from 'connected-react-router';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { confirmEmailBinding } from 'domains/userSettings/actions/email/confirmEmailBinding';
import { getEmailBindingStatuses } from 'domains/userSettings/actions/email/getEmailBindingStatuses';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { makeEmailStatus } from 'domains/userSettings/utils/makeEmailStatus';
import { EmailErrorMessage, IEmailResponse } from 'multirpc-sdk';
import { useLinkParams } from './hooks/useLinkParams';
import { ConfirmationContentState } from './types';

const REDIRECT_TIMEOUT = 250;

export const useConfirmation = () => {
  const {
    isWalletConnected,
    address,
    loading: walletConnectionLoading,
  } = useAuth();

  const { email, code } = useLinkParams();

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  const {
    loading: getEmailBindingStatusesLoading,
    data: getEmailBindingStatusesData,
    pristine: getEmailBindingStatusesPristine,
  } = useQuery<IEmailResponse[] | null>({
    type: getEmailBindingStatuses.toString(),
    requestKey: address,
  });

  const {
    pendingEmail,
    pendingAddress,
    isEmailPending,
    lastLinkExpiredEmail,
    isEmailLinkExpired,
    isEmailConfirmed,
  } = useMemo(
    () => makeEmailStatus(getEmailBindingStatusesData),
    [getEmailBindingStatusesData],
  );

  const {
    loading: confirmEmailBindingLoading,
    data: confirmEmailBindingData,
    error: confirmEmailBindingError,
    pristine: confirmEmailBindingPristine,
  } = useQuery<IEmailResponse | null>({
    type: confirmEmailBinding.toString(),
    requestKey: address,
  });

  // * response address comes in lowerCase, while MetaMasks uses a mix
  const checkUnrelatedWallet = useCallback(
    () =>
      !isEmailPending ||
      (email &&
        (email !== pendingEmail || address.toLowerCase() !== pendingAddress)),
    [address, email, isEmailPending, pendingAddress, pendingEmail],
  );

  const [contentState, setContentState] = useState<ConfirmationContentState>(
    ConfirmationContentState.DEFAULT,
  );

  useLayoutEffect(() => {
    const loading =
      walletConnectionLoading ||
      confirmEmailBindingLoading ||
      getEmailBindingStatusesLoading;

    if (loading) {
      setContentState(ConfirmationContentState.LOADING);
      return;
    }

    if (!isWalletConnected) {
      setContentState(ConfirmationContentState.CONNECT_WALLET);
      return;
    }

    if (getEmailBindingStatusesPristine) {
      dispatchRequest(getEmailBindingStatuses({ address }));
      return;
    }

    const isExpired =
      isEmailLinkExpired && email && email === lastLinkExpiredEmail;

    if (isExpired) {
      setContentState(ConfirmationContentState.LINK_EXPIRED);
      return;
    }

    if (checkUnrelatedWallet()) {
      setContentState(ConfirmationContentState.CONNECT_RELATED_WALLET);
      return;
    }

    const shouldConfirmEmailBinding =
      code &&
      email &&
      getEmailBindingStatusesData &&
      isEmailPending &&
      confirmEmailBindingPristine;

    if (shouldConfirmEmailBinding) {
      dispatchRequest(confirmEmailBinding({ address, email, code }));
      return;
    }

    const emailError = confirmEmailBindingError?.response?.data
      ?.error as IEmailResponse['error'];

    const isLinkExpiredError =
      emailError?.message === EmailErrorMessage.LINK_EXPIRED;

    if (isLinkExpiredError) {
      setContentState(ConfirmationContentState.LINK_EXPIRED);
      return;
    }

    // * response address comes in lowerCase, while MetaMasks uses a mix
    const isRelatedWallet =
      confirmEmailBindingData &&
      confirmEmailBindingData.address === address.toLowerCase();

    const isCodeAlreadyUsedError =
      emailError?.message === EmailErrorMessage.CODE_ALREADY_USED;

    const isConfirmationCodeNotFoundError =
      emailError?.message === EmailErrorMessage.CONFIRMATION_CODE_NOT_FOUND;

    const shouldGoToSettings =
      isRelatedWallet ||
      isEmailConfirmed ||
      isCodeAlreadyUsedError ||
      isConfirmationCodeNotFoundError;

    if (shouldGoToSettings) {
      setContentState(ConfirmationContentState.LOADING);
      setTimeout(
        () => dispatch(push(UserSettingsRoutesConfig.settings.generatePath())),
        REDIRECT_TIMEOUT,
      );

      return;
    }

    setContentState(ConfirmationContentState.DEFAULT);
  }, [
    address,
    code,
    confirmEmailBindingData,
    confirmEmailBindingError?.response?.data?.error,
    confirmEmailBindingLoading,
    confirmEmailBindingPristine,
    dispatch,
    dispatchRequest,
    email,
    getEmailBindingStatusesData,
    getEmailBindingStatusesLoading,
    getEmailBindingStatusesPristine,
    isEmailConfirmed,
    isEmailLinkExpired,
    isEmailPending,
    checkUnrelatedWallet,
    isWalletConnected,
    lastLinkExpiredEmail,
    pendingAddress,
    pendingEmail,
    walletConnectionLoading,
  ]);

  return {
    contentState,
  };
};

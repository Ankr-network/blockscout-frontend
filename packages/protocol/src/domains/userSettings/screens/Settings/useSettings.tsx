import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useLayoutEffect, useMemo, useState } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { getEmailBindingStatuses } from 'domains/userSettings/actions/email/getEmailBindingStatuses';
import {
  AddEmailFormContentState,
  AddEmailFormFields,
  IAddEmailFormData,
} from 'domains/userSettings/components/AddEmailForm/types';
import { makeEmailStatus } from 'domains/userSettings/utils/makeEmailStatus';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { IEmailResponse } from 'multirpc-sdk';
import { useAppDispatch } from 'store/useAppDispatch';
import { SettingsContentState } from './types';

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const dispatchRequest = useDispatchRequest();

  const {
    isWalletConnected,
    address,
    loading: walletConnectionLoading,
  } = useAuth();

  useOnMount(() => {
    // ! only onMount resetRequests with pristine work - 'cache: false' has no effect
    dispatch(
      resetRequests([
        {
          requestType: getEmailBindingStatuses.toString(),
          requestKey: address,
        },
      ]),
    );
  });

  const {
    loading: getEmailBindingStatusesLoading,
    data,
    pristine,
  } = useQuery<IEmailResponse[] | null>({
    type: getEmailBindingStatuses.toString(),
    requestKey: address,
  });

  const [contentState, setContentState] = useState<SettingsContentState>(
    SettingsContentState.DEFAULT,
  );

  const addEmailBannerContentState = useMemo<AddEmailFormContentState>(
    () =>
      contentState === SettingsContentState.ADD_EMAIL_SUCCESS
        ? AddEmailFormContentState.SUCCESS
        : AddEmailFormContentState.ADD_EMAIL,
    [contentState],
  );

  const emailStatus = useMemo(() => makeEmailStatus(data), [data]);

  const {
    pendingEmail,
    confirmedEmail,
    lastLinkExpiredEmail,
    confirmedAddress,

    isEmailPending,
    isEmailConfirmed,
    isEmailNotUsed,
    isEmailLinkExpired,
  } = emailStatus;

  const initialSubmittedData = useMemo<IAddEmailFormData | undefined>(() => {
    if (pendingEmail) return { [AddEmailFormFields.email]: pendingEmail };

    return undefined;
  }, [pendingEmail]);

  useLayoutEffect(() => {
    const loading = walletConnectionLoading || getEmailBindingStatusesLoading;

    if (loading) {
      setContentState(SettingsContentState.LOADING);
      return;
    }

    if (!isWalletConnected) {
      setContentState(SettingsContentState.CONNECT_WALLET);
      return;
    }

    if (pristine) {
      dispatchRequest(getEmailBindingStatuses({ address }));
      return;
    }

    if (isEmailNotUsed) {
      setContentState(SettingsContentState.ADD_EMAIL_FORM);
      return;
    }

    if (isEmailPending) {
      setContentState(SettingsContentState.ADD_EMAIL_SUCCESS);
      return;
    }

    if (isEmailLinkExpired) {
      setContentState(SettingsContentState.LINK_EXPIRED);
      return;
    }

    // * response address is in lower case, while MetaMask uses a mix case
    const isRelatedWallet =
      isEmailConfirmed && address.toLowerCase() === confirmedAddress;

    if (isRelatedWallet) {
      setContentState(SettingsContentState.SETTINGS);
      return;
    }

    setContentState(SettingsContentState.DEFAULT);
  }, [
    address,
    confirmedAddress,
    dispatchRequest,
    getEmailBindingStatusesLoading,
    isEmailConfirmed,
    isEmailLinkExpired,
    isEmailNotUsed,
    isEmailPending,
    isWalletConnected,
    pristine,
    walletConnectionLoading,
  ]);

  return {
    contentState,
    addEmailBannerContentState,
    initialSubmittedData,
    lastLinkExpiredEmail,
    confirmedEmail,
  };
};

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resetAuthData } from 'domains/auth/store/authSlice';
import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';
import { useGoogleLoginParams } from 'domains/oauth/hooks/useGoogleLoginParams';
import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';
import { setAvoidGuestTeamInvitationDialog } from 'domains/userSettings/screens/TeamInvitation/utils/teamInvitationUtils';

import {
  SignupDialogState,
  OauthLoginType,
} from '../SignupDialogDefaultContent';
import { useDialogTitle } from './useDialogTitle';

interface SignupDialogHookProps {
  hasOauthLogin?: boolean;
  hasOnlyGoogleAuth?: boolean;
  shouldResetAuthDataForGoogleAuth?: boolean;
  onClose: () => void;
  onOauthSignUp?: () => void | Promise<void>;
  title?: string;
}

export const useSignupDialog = ({
  hasOauthLogin,
  hasOnlyGoogleAuth,
  onClose,
  onOauthSignUp = () => Promise.resolve(),
  shouldResetAuthDataForGoogleAuth,
  title,
}: SignupDialogHookProps) => {
  const dispatch = useDispatch();
  const {
    handleFetchLoginParams: handleFetchGoogleLoginParams,
    loading: isFetchGoogleLoginParamsLoading,
  } = useGoogleLoginParams();
  const {
    handleFetchLoginParams: handleFetchOauthLoginParams,
    loading: isFetchOauthLoginParamsLoading,
  } = useOauthLoginParams();

  const [currentState, setCurrentState] = useState<SignupDialogState>(
    SignupDialogState.DEFAULT,
  );

  const [oauthLoginType, setOauthLoginType] = useState<OauthLoginType>();

  const [isLoggingInViaOauth, setIsLoggingInViaOauth] = useState(false);

  useEffect(() => {
    if (hasOauthLogin) {
      setCurrentState(SignupDialogState.WEB3);
    }
  }, [hasOauthLogin]);

  const dialogTitle = useDialogTitle({
    currentState,
    externalTitle: title,
    hasOauthLogin,
    hasOnlyGoogleAuth,
    loading: isFetchGoogleLoginParamsLoading || isFetchOauthLoginParamsLoading,
  });

  const handleClose = useCallback(() => {
    onClose();

    if (!hasOauthLogin) {
      setCurrentState(SignupDialogState.DEFAULT);
    }
  }, [hasOauthLogin, onClose]);

  const onDialogCloseClick = useCallback(() => {
    handleClose();

    trackSignUpModalClose();
  }, [handleClose]);

  const redirectToOauth = useCallback((url = '') => {
    window.location.replace(url);
  }, []);

  const onGoogleButtonClick = useCallback(async () => {
    setOauthLoginType(OauthLoginType.Google);

    if (shouldResetAuthDataForGoogleAuth) {
      dispatch(resetAuthData());
      // hack with localStorage to avoid blinking dialog
      // case 2 from https://ankrnetwork.atlassian.net/browse/MRPC-4529
      setAvoidGuestTeamInvitationDialog();
    }

    setIsLoggingInViaOauth(true);

    const { data: googleAuthUrl } = await handleFetchGoogleLoginParams();

    await onOauthSignUp();

    redirectToOauth(googleAuthUrl);
  }, [
    dispatch,
    shouldResetAuthDataForGoogleAuth,
    handleFetchGoogleLoginParams,
    onOauthSignUp,
    redirectToOauth,
  ]);

  const onGithubButtonClick = useCallback(async () => {
    setOauthLoginType(OauthLoginType.Github);

    setIsLoggingInViaOauth(true);

    const { data: oauthAuthUrl } = await handleFetchOauthLoginParams();

    await onOauthSignUp();

    redirectToOauth(oauthAuthUrl);
  }, [handleFetchOauthLoginParams, redirectToOauth, onOauthSignUp]);

  return {
    currentState,
    handleClose,
    setWeb3State: () => setCurrentState(SignupDialogState.WEB3),
    onGoogleButtonClick,
    onGithubButtonClick,
    isLoading:
      isFetchGoogleLoginParamsLoading ||
      isFetchOauthLoginParamsLoading ||
      isLoggingInViaOauth,
    dialogTitle,
    onDialogCloseClick,
    oauthLoginType,
  };
};

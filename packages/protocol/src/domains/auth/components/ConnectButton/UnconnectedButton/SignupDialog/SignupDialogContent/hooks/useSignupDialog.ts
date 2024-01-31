import { useCallback, useEffect, useState } from 'react';

import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';
import { useGoogleLoginParams } from 'domains/oauth/hooks/useGoogleLoginParams';
import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';

import {
  SignupDialogState,
  OauthLoginType,
} from '../SignupDialogDefaultContent';
import { useDialogTitle } from './useDialogTitle';

interface SignupDialogHookProps {
  hasOauthLogin?: boolean;
  onClose: () => void;
  onOauthSignUp?: () => void;
  hasOnlyGoogleAuth?: boolean;
}

export const useSignupDialog = ({
  onClose,
  hasOauthLogin,
  hasOnlyGoogleAuth,
  onOauthSignUp = () => {},
}: SignupDialogHookProps) => {
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

  useEffect(() => {
    if (hasOauthLogin) {
      setCurrentState(SignupDialogState.WEB3);
    }
  }, [hasOauthLogin]);

  const dialogTitle = useDialogTitle({
    loading: isFetchGoogleLoginParamsLoading || isFetchOauthLoginParamsLoading,
    currentState,
    hasOauthLogin,
    hasOnlyGoogleAuth,
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

    const { data: googleAuthUrl } = await handleFetchGoogleLoginParams();

    redirectToOauth(googleAuthUrl);

    onOauthSignUp();
  }, [handleFetchGoogleLoginParams, onOauthSignUp, redirectToOauth]);

  const onGithubButtonClick = useCallback(async () => {
    setOauthLoginType(OauthLoginType.Github);

    const { data: oauthAuthUrl } = await handleFetchOauthLoginParams();

    redirectToOauth(oauthAuthUrl);
    onOauthSignUp();
  }, [handleFetchOauthLoginParams, redirectToOauth, onOauthSignUp]);

  return {
    currentState,
    handleClose,
    setWeb3State: () => setCurrentState(SignupDialogState.WEB3),
    onGoogleButtonClick,
    onGithubButtonClick,
    isLoading:
      isFetchGoogleLoginParamsLoading || isFetchOauthLoginParamsLoading,
    dialogTitle,
    onDialogCloseClick,
    oauthLoginType,
  };
};

import { useMemo } from 'react';

import { SignupDialogWeb3Content } from './SignupDialogWeb3Content';
import {
  OauthLoginType,
  SignupDialogDefaultContent,
  SignupDialogState,
} from './SignupDialogDefaultContent';
import { OauthLoadingState } from '../OauthLoadingState';

interface SignupDialogProps {
  currentState: SignupDialogState;
  onDialogClose: () => void;
  onGoogleButtonClick: () => void;
  onGithubButtonClick: () => void;
  onSuccess?: () => void;
  setWeb3State: () => void;
  isLoading: boolean;
  oauthLoginType?: OauthLoginType;
  hasOnlyGoogleAuth?: boolean;
}

export const SignupDialogContent = ({
  currentState,
  onDialogClose,
  onGoogleButtonClick,
  onGithubButtonClick,
  onSuccess,
  setWeb3State,
  isLoading,
  oauthLoginType,
  hasOnlyGoogleAuth = false,
}: SignupDialogProps) => {
  const defaultStateComponent = useMemo(() => {
    return (
      <SignupDialogDefaultContent
        onGoogleButtonClick={onGoogleButtonClick}
        onGithubButtonClick={onGithubButtonClick}
        setWeb3State={setWeb3State}
        hasOnlyGoogleAuth={hasOnlyGoogleAuth}
      />
    );
  }, [
    hasOnlyGoogleAuth,
    onGithubButtonClick,
    onGoogleButtonClick,
    setWeb3State,
  ]);

  if (isLoading) return <OauthLoadingState loginType={oauthLoginType} />;

  if (hasOnlyGoogleAuth) {
    return defaultStateComponent;
  }

  switch (currentState) {
    case SignupDialogState.WEB3:
      return (
        <SignupDialogWeb3Content
          onClose={onDialogClose}
          onSuccess={onSuccess}
        />
      );

    case SignupDialogState.DEFAULT:
    default:
      return defaultStateComponent;
  }
};

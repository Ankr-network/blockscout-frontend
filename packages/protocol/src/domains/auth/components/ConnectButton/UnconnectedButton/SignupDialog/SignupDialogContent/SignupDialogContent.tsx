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
  description?: string;
  hasAutoAgreement?: boolean;
  hasOnlyGoogleAuth?: boolean;
  isLoading: boolean;
  oauthLoginType?: OauthLoginType;
  onDialogClose: () => void;
  onGithubButtonClick: () => void;
  onGoogleButtonClick: () => void;
  onSuccess?: () => void;
  setWeb3State: () => void;
  shouldSaveTeamInvitationLink?: boolean;
}

export const SignupDialogContent = ({
  currentState,
  description,
  hasAutoAgreement,
  hasOnlyGoogleAuth = false,
  isLoading,
  oauthLoginType,
  onDialogClose,
  onGithubButtonClick,
  onGoogleButtonClick,
  onSuccess,
  setWeb3State,
  shouldSaveTeamInvitationLink,
}: SignupDialogProps) => {
  const defaultStateComponent = useMemo(() => {
    return (
      <SignupDialogDefaultContent
        description={description}
        hasAutoAgreement={hasAutoAgreement}
        hasOnlyGoogleAuth={hasOnlyGoogleAuth}
        onGithubButtonClick={onGithubButtonClick}
        onGoogleButtonClick={onGoogleButtonClick}
        setWeb3State={setWeb3State}
        shouldSaveTeamInvitationLink={shouldSaveTeamInvitationLink}
      />
    );
  }, [
    description,
    hasAutoAgreement,
    hasOnlyGoogleAuth,
    onGithubButtonClick,
    onGoogleButtonClick,
    setWeb3State,
    shouldSaveTeamInvitationLink,
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

import { ReactNode } from 'react';

import { SignupDialogWeb3Content } from './SignupDialogWeb3Content';
import {
  OauthLoginType,
  SignupDialogDefaultContent,
  SignupDialogState,
} from './SignupDialogDefaultContent';
import { OauthLoadingState } from '../OauthLoadingState';

interface SignupDialogProps {
  canProcessReferralCode?: boolean;
  currentState: SignupDialogState;
  description?: string;
  extraContent?: ReactNode;
  hasAutoAgreement?: boolean;
  hasOnlyGoogleAuth?: boolean;
  isLoading: boolean;
  oauthLoginType?: OauthLoginType;
  onDialogClose: () => void;
  onGithubButtonClick: () => void;
  onGoogleButtonClick: () => void;
  onSuccess?: () => void;
  onWeb3Connect?: () => void | Promise<void>;
  setWeb3State: () => void;
  shouldSaveTeamInvitationLink?: boolean;
}

export const SignupDialogContent = ({
  canProcessReferralCode,
  currentState,
  description,
  extraContent,
  hasAutoAgreement,
  hasOnlyGoogleAuth = false,
  isLoading,
  oauthLoginType,
  onDialogClose,
  onGithubButtonClick,
  onGoogleButtonClick,
  onSuccess,
  onWeb3Connect,
  setWeb3State,
  shouldSaveTeamInvitationLink,
}: SignupDialogProps) => {
  const defaultStateComponent = (
    <SignupDialogDefaultContent
      canProcessReferralCode={canProcessReferralCode}
      description={description}
      extraContent={extraContent}
      hasAutoAgreement={hasAutoAgreement}
      hasOnlyGoogleAuth={hasOnlyGoogleAuth}
      onGithubButtonClick={onGithubButtonClick}
      onGoogleButtonClick={onGoogleButtonClick}
      setWeb3State={setWeb3State}
      shouldSaveTeamInvitationLink={shouldSaveTeamInvitationLink}
    />
  );

  if (isLoading) return <OauthLoadingState loginType={oauthLoginType} />;

  if (hasOnlyGoogleAuth) {
    return defaultStateComponent;
  }

  switch (currentState) {
    case SignupDialogState.WEB3:
      return (
        <SignupDialogWeb3Content
          onClose={onDialogClose}
          onConnect={onWeb3Connect}
          onSuccess={onSuccess}
        />
      );

    case SignupDialogState.DEFAULT:
    default:
      return defaultStateComponent;
  }
};

import { ReactNode } from 'react';

import { Dialog } from 'uiKit/Dialog';

import { useSignupDialogStyles } from './useSignupDialogStyles';
import { SignupDialogContent } from './SignupDialogContent';
import { useSignupDialog } from './SignupDialogContent/hooks/useSignupDialog';

export const SIGNUP_DIALOG_WIDTH = 600;

export interface ISignupDialogProps {
  canProcessReferralCode?: boolean;
  description?: string;
  extraContent?: ReactNode;
  hasAutoAgreement?: boolean;
  hasOauthLogin?: boolean;
  hasOnlyGoogleAuth?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onManualClose?: () => void;
  onOauthSignIn?: () => void | Promise<void>;
  onSuccess?: () => void;
  onWeb3Connect?: () => void | Promise<void>;
  shouldResetAuthDataForGoogleAuth?: boolean;
  shouldSaveTeamInvitationLink?: boolean;
  title?: string;
}

export const SignupDialog = ({
  canProcessReferralCode,
  description,
  extraContent,
  hasAutoAgreement,
  hasOauthLogin,
  hasOnlyGoogleAuth = false,
  isOpen = false,
  onClose,
  onManualClose,
  onOauthSignIn,
  onSuccess,
  onWeb3Connect,
  shouldResetAuthDataForGoogleAuth = false,
  shouldSaveTeamInvitationLink,
  title,
}: ISignupDialogProps) => {
  const { classes } = useSignupDialogStyles();
  const {
    currentState,
    dialogTitle,
    handleClose,
    handleManualClose,
    isLoading,
    oauthLoginType,
    onDialogCloseClick,
    onGithubButtonClick,
    onGoogleButtonClick,
    setWeb3State,
  } = useSignupDialog({
    hasOauthLogin,
    hasOnlyGoogleAuth,
    onClose,
    onManualClose,
    onOauthSignUp: onOauthSignIn,
    shouldResetAuthDataForGoogleAuth,
    title,
  });

  return (
    <Dialog
      closeButtonClassName={classes.closeButton}
      maxPxWidth={SIGNUP_DIALOG_WIDTH}
      onClose={onDialogCloseClick}
      onManualClose={handleManualClose}
      open={isOpen}
      paperClassName={classes.paperRoot}
      title={dialogTitle}
      titleClassName={classes.dialogTitle}
    >
      <SignupDialogContent
        canProcessReferralCode={canProcessReferralCode}
        currentState={currentState}
        description={description}
        extraContent={extraContent}
        hasAutoAgreement={hasAutoAgreement}
        hasOnlyGoogleAuth={hasOnlyGoogleAuth}
        isLoading={isLoading}
        oauthLoginType={oauthLoginType}
        onDialogClose={handleClose}
        onGithubButtonClick={onGithubButtonClick}
        onGoogleButtonClick={onGoogleButtonClick}
        onSuccess={onSuccess}
        onWeb3Connect={onWeb3Connect}
        setWeb3State={setWeb3State}
        shouldSaveTeamInvitationLink={shouldSaveTeamInvitationLink}
      />
    </Dialog>
  );
};

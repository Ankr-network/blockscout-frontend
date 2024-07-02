import { ReactNode } from 'react';

import { Dialog } from 'uiKit/Dialog';

import { useSignupDialogStyles } from './useSignupDialogStyles';
import { SignupDialogContent } from './SignupDialogContent';
import { useSignupDialog } from './SignupDialogContent/hooks/useSignupDialog';

export const SIGNUP_DIALOG_WIDTH = 600;

export interface ISignupDialogProps {
  description?: string;
  extraContent?: ReactNode;
  hasAutoAgreement?: boolean;
  hasOauthLogin?: boolean;
  hasOnlyGoogleAuth?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  shouldResetAuthDataForGoogleAuth?: boolean;
  shouldSaveTeamInvitationLink?: boolean;
  title?: string;
}

export const SignupDialog = ({
  description,
  extraContent,
  hasAutoAgreement,
  hasOauthLogin,
  hasOnlyGoogleAuth = false,
  isOpen = false,
  onClose,
  onSuccess,
  shouldResetAuthDataForGoogleAuth = false,
  shouldSaveTeamInvitationLink,
  title,
}: ISignupDialogProps) => {
  const { classes } = useSignupDialogStyles();
  const {
    currentState,
    dialogTitle,
    handleClose,
    isLoading,
    oauthLoginType,
    onDialogCloseClick,
    onGithubButtonClick,
    onGoogleButtonClick,
    setWeb3State,
  } = useSignupDialog({
    onClose,
    hasOauthLogin,
    hasOnlyGoogleAuth,
    shouldResetAuthDataForGoogleAuth,
    title,
  });

  return (
    <Dialog
      closeButtonClassName={classes.closeButton}
      maxPxWidth={SIGNUP_DIALOG_WIDTH}
      onClose={onDialogCloseClick}
      open={isOpen}
      paperClassName={classes.paperRoot}
      title={dialogTitle}
      titleClassName={classes.dialogTitle}
    >
      <SignupDialogContent
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
        setWeb3State={setWeb3State}
        shouldSaveTeamInvitationLink={shouldSaveTeamInvitationLink}
      />
    </Dialog>
  );
};

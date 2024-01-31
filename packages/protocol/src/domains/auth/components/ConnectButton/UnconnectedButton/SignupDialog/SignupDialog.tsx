import { Dialog } from 'uiKit/Dialog';

import { useSignupDialogStyles } from './useSignupDialogStyles';
import { SignupDialogContent } from './SignupDialogContent';
import { useSignupDialog } from './SignupDialogContent/hooks/useSignupDialog';

export const SIGNUP_DIALOG_WIDTH = 620;

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  hasOauthLogin?: boolean;
  hasOnlyGoogleAuth?: boolean;
}

export const SignupDialog = ({
  isOpen = false,
  onClose,
  onSuccess,
  hasOauthLogin,
  hasOnlyGoogleAuth = false,
}: SignupDialogProps) => {
  const { classes } = useSignupDialogStyles();
  const {
    currentState,
    dialogTitle,
    handleClose,
    isLoading,
    onDialogCloseClick,
    onGoogleButtonClick,
    onGithubButtonClick,
    setWeb3State,
    oauthLoginType,
  } = useSignupDialog({ onClose, hasOauthLogin, hasOnlyGoogleAuth });

  return (
    <Dialog
      maxPxWidth={SIGNUP_DIALOG_WIDTH}
      onClose={onDialogCloseClick}
      open={isOpen}
      title={dialogTitle}
      titleClassName={classes.dialogTitle}
      closeButtonClassName={classes.closeButton}
      paperClassName={classes.paperRoot}
    >
      <SignupDialogContent
        currentState={currentState}
        onDialogClose={handleClose}
        onGoogleButtonClick={onGoogleButtonClick}
        onGithubButtonClick={onGithubButtonClick}
        onSuccess={onSuccess}
        setWeb3State={setWeb3State}
        isLoading={isLoading}
        oauthLoginType={oauthLoginType}
        hasOnlyGoogleAuth={hasOnlyGoogleAuth}
      />
    </Dialog>
  );
};

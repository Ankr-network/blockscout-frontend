import { Dialog } from 'uiKit/Dialog';

import { LoadingState } from './LoadingState';
import { useSignupDialogStyles } from './useSignupDialogStyles';
import { SignupDialogContent } from './SignupDialogContent';
import { useSignupDialog } from './useSignupDialog';

export const SIGNUP_DIALOG_WIDTH = 620;

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  hasOauthLogin?: boolean;
}

export const SignupDialog = ({
  isOpen = false,
  onClose,
  onSuccess,
  hasOauthLogin,
}: SignupDialogProps) => {
  const { classes } = useSignupDialogStyles();
  const {
    currentState,
    dialogTitle,
    handleClose,
    loading,
    onDialogClose,
    onGoogleButtonClick,
    setWeb3State,
  } = useSignupDialog({ onClose, hasOauthLogin });

  return (
    <Dialog
      maxPxWidth={SIGNUP_DIALOG_WIDTH}
      onClose={onDialogClose}
      open={isOpen}
      title={dialogTitle}
      titleClassName={classes.dialogTitle}
      closeButtonClassName={classes.closeButton}
      paperClassName={classes.paperRoot}
    >
      {loading ? (
        <LoadingState />
      ) : (
        <SignupDialogContent
          currentState={currentState}
          onDialogClose={handleClose}
          onGoogleButtonClick={onGoogleButtonClick}
          onSuccess={onSuccess}
          setWeb3State={setWeb3State}
        />
      )}
    </Dialog>
  );
};

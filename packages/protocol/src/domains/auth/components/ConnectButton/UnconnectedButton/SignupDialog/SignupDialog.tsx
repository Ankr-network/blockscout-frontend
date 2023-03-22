import { Dialog } from 'uiKit/Dialog';
import { EmailContentLoading } from './EmailContentLoading';
import { useSignupDialogStyles } from './useSignupDialogStyles';
import { SignupDialogContent } from './SignupDialogContent';
import { useSignupDialog } from './useSignupDialog';

export const SIGNUP_DIALOG_WIDTH = 620;

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onManualClose?: () => void;
  onSuccess?: () => void;
  hasOauthLogin?: boolean;
}

export const SignupDialog = ({
  isOpen = false,
  onClose,
  onManualClose = onClose,
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
  } = useSignupDialog({ onClose, onManualClose, hasOauthLogin });

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
        <EmailContentLoading />
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
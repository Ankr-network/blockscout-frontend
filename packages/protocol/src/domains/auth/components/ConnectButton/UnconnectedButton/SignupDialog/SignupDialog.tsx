import { Dialog } from 'uiKit/Dialog';
import { EmailContentLoading } from './EmailContentLoading';
import { useSignupDialogStyles } from './useSignupDialogStyles';
import { SignupDialogContent } from './SignupDialogContent';
import { useSignupDialog } from './useSignupDialog';

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
      maxPxWidth={618}
      onClose={onDialogClose}
      open={isOpen}
      title={dialogTitle}
      titleClassName={classes.dialogTitle}
      closeButtonClassName={classes.closeButton}
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

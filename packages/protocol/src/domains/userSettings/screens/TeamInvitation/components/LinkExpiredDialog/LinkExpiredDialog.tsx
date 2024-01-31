import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { useLinkExpiredDialog } from './hooks/useLinkExpiredDialog';
import { useLinkExpiredDialogStyles } from './useLinkExpiredDialogStyles';

export interface ILinkExpiredDialogProps extends IDialogProps {
  handleParentDialogOpen: () => void;
  onClose: () => void;
}

export const LinkExpiredDialog = ({
  handleParentDialogOpen,
  onClose: handleClose,
  ...dialogProps
}: ILinkExpiredDialogProps) => {
  const {
    buttonText,
    handleButtonClick,
    handleDialogClose,
    handleSingUpDialogClose,
    hasOauthLogin,
    isSignUpDialogOpened,
  } = useLinkExpiredDialog({
    handleParentDialogOpen,
    handleParentDialogClose: handleClose,
  });

  const { classes } = useLinkExpiredDialogStyles();

  return (
    <>
      <Dialog
        {...dialogProps}
        canCloseDialogByClickOutside={false}
        classes={{ paper: classes.dialogPaper }}
        onClose={handleDialogClose}
      >
        <Typography variant="h5" className={classes.title}>
          {t('teams.link-expired-dialog.title')}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          {t('teams.link-expired-dialog.description')}
        </Typography>
        <Button fullWidth size="large" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </Dialog>

      <SignupDialog
        hasOauthLogin={hasOauthLogin}
        hasOnlyGoogleAuth
        isOpen={isSignUpDialogOpened}
        onClose={handleSingUpDialogClose}
      />
    </>
  );
};

import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { useLinkExpiredDialog } from './hooks/useLinkExpiredDialog';
import { useLinkExpiredDialogStyles } from './useLinkExpiredDialogStyles';
import { useTeamInvitationSignInDialog } from '../../hooks/useSignUpDialog';

export interface ILinkExpiredDialogProps extends IDialogProps {
  onOpen: () => void;
  onClose: () => void;
}

export const LinkExpiredDialog = ({
  onClose: handleClose,
  onOpen: handleOpen,
  ...dialogProps
}: ILinkExpiredDialogProps) => {
  const {
    description,
    handleSignInDialogClose,
    handleSignInDialogOpen,
    isSignInDialogOpened,
    title,
  } = useTeamInvitationSignInDialog({
    onClose: handleOpen,
    onOpen: handleClose,
  });

  const { buttonText, handleButtonClick, handleDialogClose, hasOauthLogin } =
    useLinkExpiredDialog({ handleSignInDialogOpen });

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
        description={description}
        hasAutoAgreement
        hasOauthLogin={hasOauthLogin}
        hasOnlyGoogleAuth
        isOpen={isSignInDialogOpened}
        onClose={handleSignInDialogClose}
        title={title}
      />
    </>
  );
};

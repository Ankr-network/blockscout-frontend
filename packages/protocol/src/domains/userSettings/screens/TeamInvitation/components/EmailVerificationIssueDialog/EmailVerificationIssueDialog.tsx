import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useEmailVerificationIssueDialogStyles } from './useEmailVerificationIssueDialogStyles';
import { useTeamInvitationSignInDialog } from '../../hooks/useSignUpDialog';

export interface IEmailVerificationIssueDialogProps extends IDialogProps {
  onClose: () => void;
  onOpen: () => void;
}

export const EmailVerificationIssueDialog = ({
  onClose: handleClose,
  onOpen: handleOpen,
  ...dialogProps
}: IEmailVerificationIssueDialogProps) => {
  const { hasOauthLogin } = useAuth();
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

  const { classes } = useEmailVerificationIssueDialogStyles();

  return (
    <>
      <Dialog
        {...dialogProps}
        canCloseDialogByClickOutside={false}
        classes={{ paper: classes.dialogPaper }}
      >
        <div className={classes.root}>
          <Typography variant="h5" className={classes.title}>
            {t('teams.email-verification-issue.title')}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.description}
          >
            {t('teams.email-verification-issue.description')}
          </Typography>
          <Button fullWidth size="large" onClick={handleSignInDialogOpen}>
            {t('teams.email-verification-issue.log-in')}
          </Button>
        </div>
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

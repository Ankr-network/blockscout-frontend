import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useEmailVerificationIssueDialogStyles } from './useEmailVerificationIssueDialogStyles';
import { useSignUpDialog } from './hooks/useSignUpDialog';

export interface IEmailVerificationIssueDialogProps extends IDialogProps {
  handleParentDialogOpen: () => void;
  onClose: () => void;
}

export const EmailVerificationIssueDialog = ({
  onClose: handleParentDialogClose,
  handleParentDialogOpen,
  ...dialogProps
}: IEmailVerificationIssueDialogProps) => {
  const { hasOauthLogin } = useAuth();
  const {
    handleSignUpDialogClose,
    handleSignUpDialogOpen,
    isSignUpDialogOpened,
  } = useSignUpDialog({
    handleParentDialogClose,
    handleParentDialogOpen,
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
          <Button fullWidth size="large" onClick={handleSignUpDialogOpen}>
            {t('teams.email-verification-issue.log-in')}
          </Button>
        </div>
      </Dialog>

      <SignupDialog
        hasOauthLogin={hasOauthLogin}
        hasOnlyGoogleAuth
        isOpen={isSignUpDialogOpened}
        onClose={handleSignUpDialogClose}
      />
    </>
  );
};

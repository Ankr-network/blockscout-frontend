import { Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { IGetActiveEmailBindingResponse } from 'multirpc-sdk';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyUserSettingsGetActiveEmailBindingQuery } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { EmailSkeleton } from './components/Skeleton';
import { useEmailBlock } from './useEmailBlock';
import { useStyles } from './EmailBlockStyles';
import { ChangeEmailDialog } from './components/ChangeEmailDialog';
import { WalletBlock } from '../WalletBlock';

export const EmailBlock = () => {
  const { classes } = useStyles();
  const [getActiveEmailBinding, activeEmailBindingState] =
    useLazyUserSettingsGetActiveEmailBindingQuery();

  const { hasOauthLogin } = useAuth();

  const {
    closeChangeEmailDialog,
    isChangeEmailDialogOpen,
    openChangeEmailDialog,
  } = useEmailBlock();

  useOnMount(() => {
    getActiveEmailBinding();
  });

  return (
    <>
      <div className={classes.row}>
        <Paper className={classes.root}>
          <Typography className={classes.email} variant="h4">
            <Queries<IGetActiveEmailBindingResponse>
              queryStates={[activeEmailBindingState]}
              spinner={<EmailSkeleton />}
            >
              {({ data: { email } = {} }) => (
                <Typography className={classes.text}>{email}</Typography>
              )}
            </Queries>
          </Typography>

          {!hasOauthLogin && (
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={openChangeEmailDialog}
            >
              {t('user-settings.settings-screen.change-email-button')}
            </Button>
          )}
        </Paper>
        <WalletBlock />
      </div>

      <ChangeEmailDialog
        open={isChangeEmailDialogOpen}
        onClose={closeChangeEmailDialog}
      />
    </>
  );
};

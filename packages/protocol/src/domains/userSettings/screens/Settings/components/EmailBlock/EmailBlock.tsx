import { Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { IGetActiveEmailBindingResponse } from 'multirpc-sdk';
import { ChangeEmailDialog } from './components/ChangeEmailDialog';
import { EmailSkeleton } from './components/Skeleton';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEmailBlock } from './useEmailBlock';
import { useLazyUserSettingsGetActiveEmailBindingQuery } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useStyles } from './EmailBlockStyles';

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
      <Paper className={classes.root}>
        <Typography className={classes.email} variant="h4">
          <Queries<IGetActiveEmailBindingResponse>
            queryStates={[activeEmailBindingState]}
            spinner={<EmailSkeleton />}
          >
            {({ data: { email } = {} }) => email}
          </Queries>
        </Typography>

        {!hasOauthLogin && (
          <Button variant="outlined" onClick={openChangeEmailDialog}>
            {t('user-settings.settings-screen.change-email-button')}
          </Button>
        )}
      </Paper>

      <ChangeEmailDialog
        open={isChangeEmailDialogOpen}
        onClose={closeChangeEmailDialog}
      />
    </>
  );
};
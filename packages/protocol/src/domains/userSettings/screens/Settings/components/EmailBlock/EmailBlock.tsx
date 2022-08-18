import { Button, Paper, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';

import { t } from 'common';
import { getActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChangeEmailDialog } from './components/ChangeEmailDialog';
import { EmailSkeleton } from './components/Skeleton';
import { useStyles } from './EmailBlockStyles';
import { useEmailBlock } from './useEmailBlock';

export const EmailBlock = () => {
  const classes = useStyles();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getActiveEmailBinding());
  });

  const {
    isChangeEmailDialogOpen,
    openChangeEmailDialog,
    closeChangeEmailDialog,
  } = useEmailBlock();

  return (
    <>
      <Paper className={classes.root}>
        <Typography className={classes.email} variant="h4">
          <Queries<ResponseData<typeof getActiveEmailBinding>>
            requestActions={[getActiveEmailBinding]}
            spinner={<EmailSkeleton />}
          >
            {({ data: { email } }) => email}
          </Queries>
        </Typography>

        <Button
          className={classes.changeEmailButton}
          variant="outlined"
          onClick={openChangeEmailDialog}
        >
          {t('user-settings.settings-screen.change-email-button')}
        </Button>
      </Paper>

      <ChangeEmailDialog
        open={isChangeEmailDialogOpen}
        onClose={closeChangeEmailDialog}
      />
    </>
  );
};

import { IconButton, Typography } from '@mui/material';
import { IGetActiveEmailBindingResponse } from 'multirpc-sdk';
import { Edit } from '@ankr.com/ui';

import { Queries } from 'modules/common/components/Queries/Queries';
import { useUserSettingsGetActiveEmailBindingQuery } from 'domains/userSettings/actions/email/getActiveEmailBinding';

import { useEmailBlock } from './useEmailBlock';
import { useEmailBlockStyles } from './useEmailBlockStyles';
import { ChangeEmailDialog } from '../ChangeEmailDialog';

export const EmailBlock = () => {
  const { classes } = useEmailBlockStyles();

  const activeEmailBindingState = useUserSettingsGetActiveEmailBindingQuery();

  const {
    closeChangeEmailDialog,
    isChangeEmailDialogOpen,
    openChangeEmailDialog,
  } = useEmailBlock();

  return (
    <div className={classes.root}>
      <Queries<IGetActiveEmailBindingResponse>
        queryStates={[activeEmailBindingState]}
      >
        {({ data: { email } = {} }) => (
          <Typography className={classes.email} variant="body2">
            {email}
          </Typography>
        )}
      </Queries>

      <IconButton onClick={openChangeEmailDialog}>
        <Edit className={classes.icon} />
      </IconButton>

      <ChangeEmailDialog
        open={isChangeEmailDialogOpen}
        onClose={closeChangeEmailDialog}
      />
    </div>
  );
};

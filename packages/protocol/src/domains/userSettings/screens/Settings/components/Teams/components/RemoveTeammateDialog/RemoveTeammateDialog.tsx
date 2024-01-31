import { t, tHTML } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { useCallback } from 'react';
import { IDeleteGroupMemberParams } from 'multirpc-sdk';

import { Dialog } from 'uiKit/Dialog';
import { useRemoveTeammateMutation } from 'domains/userSettings/actions/teams/removeTeammate';

import { useRemoveTeammateDialogStyles } from './useRemoveTeammateDialogStyles';

interface IRemoveTeammateDialogProps extends IDeleteGroupMemberParams {
  email: string;
  open: boolean;
  onClose: () => void;
}

export const RemoveTeammateDialog = ({
  address,
  group,
  email,
  open,
  onClose,
}: IRemoveTeammateDialogProps) => {
  const { classes } = useRemoveTeammateDialogStyles();
  const [removeTeammate, { isLoading }] = useRemoveTeammateMutation();

  const handleRemove = useCallback(async () => {
    await removeTeammate({
      address,
      group,
      email,
    });
    onClose();
  }, [address, group, email, onClose, removeTeammate]);

  return (
    <Dialog
      maxPxWidth={600}
      onClose={onClose}
      open={open}
      paperClassName={classes.root}
      title={t('teams.remove-teammate.title')}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.description}
      >
        {tHTML('teams.remove-teammate.description')}
      </Typography>

      <LoadingButton
        fullWidth
        className={classes.removeButton}
        color="error"
        loading={isLoading}
        onClick={handleRemove}
      >
        {tHTML('teams.remove-teammate.remove')}
      </LoadingButton>
      <Button fullWidth variant="outlined" onClick={onClose}>
        {tHTML('teams.remove-teammate.cancel')}
      </Button>
    </Dialog>
  );
};

import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { useCallback } from 'react';
import { ICancelGroupInvitationParams } from 'multirpc-sdk';

import { Dialog } from 'uiKit/Dialog';
import { useRevokeInvitationMutation } from 'domains/userSettings/actions/teams/revokeInvitation';

import { useRevokeInvitationDialogStyles } from './useRevokeInvitationDialogStyles';

interface IRevokeInvitationDialogProps extends ICancelGroupInvitationParams {
  open: boolean;
  onClose: () => void;
}

export const RevokeInvitationDialog = ({
  email,
  group,
  onClose,
  open,
}: IRevokeInvitationDialogProps) => {
  const { classes } = useRevokeInvitationDialogStyles();
  const [revokeInvitation, { isLoading }] = useRevokeInvitationMutation();

  const handleRevoke = useCallback(async () => {
    await revokeInvitation({
      email,
      group,
    });
    onClose();
  }, [email, group, onClose, revokeInvitation]);

  return (
    <Dialog
      maxPxWidth={600}
      onClose={onClose}
      open={open}
      paperClassName={classes.root}
      title={t('teams.revoke-invitation.title')}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.description}
      >
        {t('teams.revoke-invitation.description')}
      </Typography>

      <LoadingButton
        fullWidth
        className={classes.removeButton}
        color="error"
        loading={isLoading}
        onClick={handleRevoke}
      >
        {t('teams.revoke-invitation.revoke')}
      </LoadingButton>
      <Button fullWidth variant="outlined" onClick={onClose}>
        {t('teams.revoke-invitation.cancel')}
      </Button>
    </Dialog>
  );
};

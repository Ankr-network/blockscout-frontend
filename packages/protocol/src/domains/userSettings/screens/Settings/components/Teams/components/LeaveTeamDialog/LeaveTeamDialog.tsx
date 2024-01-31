import { Button, Typography } from '@mui/material';
import { IApiUserGroupParams } from 'multirpc-sdk';
import { LoadingButton } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';

import { useLeaveTeamDialogStyles } from './useLeaveTeamDialogStyles';
import { useLeaveTeamHandler } from './hooks/useLeaveTeamHandler';

interface ILeaveTeamDialogProps extends IApiUserGroupParams {
  open: boolean;
  onClose: () => void;
}

export const LeaveTeamDialog = ({
  group,
  open,
  onClose,
}: ILeaveTeamDialogProps) => {
  const { handleLeaveTeam, isLeaving } = useLeaveTeamHandler({
    group,
    onSuccess: onClose,
  });

  const { classes } = useLeaveTeamDialogStyles();

  return (
    <Dialog
      maxPxWidth={600}
      onClose={onClose}
      open={open}
      paperClassName={classes.root}
      title={t('teams.leave-team.title')}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.description}
      >
        {tHTML('teams.leave-team.description')}
      </Typography>

      <LoadingButton
        className={classes.removeButton}
        color="error"
        fullWidth
        loading={isLeaving}
        onClick={handleLeaveTeam}
      >
        {t('teams.leave-team.leave')}
      </LoadingButton>
      <Button fullWidth variant="outlined" onClick={onClose}>
        {t('teams.leave-team.cancel')}
      </Button>
    </Dialog>
  );
};

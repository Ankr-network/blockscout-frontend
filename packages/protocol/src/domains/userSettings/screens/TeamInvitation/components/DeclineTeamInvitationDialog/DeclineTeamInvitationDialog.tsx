import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { DeclineButton } from './components/DeclineButton';
import { useDeclineTeamInvitationDialogStyles } from './useDeclineTeamInvitationDialogStyles';
import { CancelButton } from './components/CancelButton';

export interface DeclineTeamInvitationDialogProps extends IDialogProps {
  isDeclining: boolean;
  onDecline: () => void;
  teamName: string;
}

export const DeclineTeamInvitationDialog = ({
  isDeclining,
  onClose: handleDialogClose,
  onDecline,
  teamName,
  ...dialogProps
}: DeclineTeamInvitationDialogProps) => {
  const { classes } = useDeclineTeamInvitationDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={{ paper: classes.dialogPaper }}
      onClose={handleDialogClose}
      title={
        <Typography variant="h6" component="p">
          {t('teams.decline-team-invitation-dialog.title')}
        </Typography>
      }
    >
      <Typography className={classes.description} component="p" variant="body2">
        {t('teams.decline-team-invitation-dialog.description', { teamName })}
      </Typography>
      <DeclineButton
        className={classes.declineButton}
        isDeclining={isDeclining}
        onClick={onDecline}
      />
      <CancelButton isDisabled={isDeclining} onClick={handleDialogClose} />
    </Dialog>
  );
};

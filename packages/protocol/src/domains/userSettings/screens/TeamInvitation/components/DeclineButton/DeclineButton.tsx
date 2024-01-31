import { Button } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import {
  DeclineTeamInvitationDialog,
  UseDeclineTeamInvitationDialogParams,
  useDeclineTeamInvitationDialog,
} from '../DeclineTeamInvitationDialog';

export interface DeclineButtonProps
  extends Omit<UseDeclineTeamInvitationDialogParams, 'open' | 'onOpen'> {
  isDisabled?: boolean;
  onDeclineDialogOpen: () => void;
  onDeclineDialogClose: () => void;
}

export const DeclineButton = ({
  isDeclining,
  isDisabled,
  onDecline,
  onDeclineDialogClose,
  onDeclineDialogOpen,
  teamName,
}: DeclineButtonProps) => {
  const declineDialogParams = useMemo<UseDeclineTeamInvitationDialogParams>(
    () => ({
      isDeclining,
      onClose: onDeclineDialogClose,
      onDecline,
      onOpen: onDeclineDialogOpen,
      open: false,
      teamName,
    }),
    [
      isDeclining,
      onDecline,
      onDeclineDialogClose,
      onDeclineDialogOpen,
      teamName,
    ],
  );

  const {
    declineTeamInvitationDialogProps,
    handleDeclineTeamInvitationDialogOpen,
  } = useDeclineTeamInvitationDialog(declineDialogParams);

  return (
    <>
      <Button
        color="error"
        disabled={isDisabled}
        fullWidth
        onClick={handleDeclineTeamInvitationDialogOpen}
        size="large"
        variant="outlined"
      >
        {t('teams.team-invitation-dialog.decline-button')}
      </Button>
      <DeclineTeamInvitationDialog {...declineTeamInvitationDialogProps} />
    </>
  );
};

import { Button } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { Header } from './components/Header';
import {
  InvitationInfo,
  InvitationInfoProps,
} from './components/InvitationInfo';
import { useGuestTeamInvitationDialogStyles } from './useGuestTeamInvitationDialogStyles';

export interface GuestTeamInvitationDialogProps
  extends Omit<IDialogProps, 'role'>,
    InvitationInfoProps {
  handleSignIn: () => void;
}

export const GuestTeamInvitationDialog = ({
  email,
  handleSignIn,
  onClose: handleCloseDialog,
  role,
  teamName,
  ...dialogProps
}: GuestTeamInvitationDialogProps) => {
  const { classes } = useGuestTeamInvitationDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      canCloseDialogByClickOutside={false}
      classes={{ paper: classes.dialogPaper }}
      onClose={handleCloseDialog}
      shouldHideCloseButton
    >
      <Header />
      <InvitationInfo email={email} role={role} teamName={teamName} />
      <Button fullWidth onClick={handleSignIn} size="large" variant="contained">
        {t('teams.guest-team-invitation-dialog.view-invitation-button')}
      </Button>
    </Dialog>
  );
};

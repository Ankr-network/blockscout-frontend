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
  extends IDialogProps,
  InvitationInfoProps {
  onSignIn: () => void;
}

export const GuestTeamInvitationDialog = ({
  email,
  onClose: handleCloseDialog,
  onSignIn,
  roleName,
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
      <InvitationInfo email={email} roleName={roleName} teamName={teamName} />
      <Button fullWidth onClick={onSignIn} size="large" variant="contained">
        {t('teams.guest-team-invitation-dialog.sign-in-button')}
      </Button>
    </Dialog>
  );
};

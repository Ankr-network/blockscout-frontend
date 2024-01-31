import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

import { GuestTeamInvitationDialog } from '../GuestTeamInvitationDialog/GuestTeamInvitationDialog';
import { TeamInvitationDialogContainerProps } from '../TeamInvitationDialogContainer';
import { useGuestTeamInvitationDialog } from '../GuestTeamInvitationDialog/hooks/useGuestTeamInvitationDialog';
import { useSignUpDialog } from './hooks/useSignUpDialog';

export const GuestTeamInvitationDialogContainer = ({
  isOpened: open,
}: TeamInvitationDialogContainerProps) => {
  const {
    guestTeamInvitationDialogProps,
    handleGuestTeamInvitationDialogClose,
    handleGuestTeamInvitationDialogOpen,
  } = useGuestTeamInvitationDialog({ open });

  const {
    handleSignUpDialogClose,
    handleSignUpDialogOpen,
    isSignupDialogOpened,
  } = useSignUpDialog({
    handleGuestTeamInvitationDialogClose,
    handleGuestTeamInvitationDialogOpen,
  });

  const {
    email,
    gname: teamName,
    role,
  } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  return (
    <>
      <GuestTeamInvitationDialog
        {...guestTeamInvitationDialogProps}
        email={email}
        onSignIn={handleSignUpDialogOpen}
        roleName={role}
        teamName={teamName}
      />
      <SignupDialog
        hasOnlyGoogleAuth
        isOpen={isSignupDialogOpened}
        onClose={handleSignUpDialogClose}
      />
    </>
  );
};

import { SignupDialog } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

import { GuestTeamInvitationDialog } from '../GuestTeamInvitationDialog/GuestTeamInvitationDialog';
import { TeamInvitationDialogContainerProps } from '../TeamInvitationDialogContainer';
import { useGuestTeamInvitationDialog } from '../GuestTeamInvitationDialog/hooks/useGuestTeamInvitationDialog';
import { useTeamInvitationSignInDialog } from '../../hooks/useSignUpDialog';

export const GuestTeamInvitationDialogContainer = ({
  isOpened: open,
}: TeamInvitationDialogContainerProps) => {
  const {
    guestTeamInvitationDialogProps,
    handleGuestTeamInvitationDialogClose,
    handleGuestTeamInvitationDialogOpen,
  } = useGuestTeamInvitationDialog({ open });

  const {
    description,
    handleSignInDialogClose,
    handleSignInDialogOpen,
    isSignInDialogOpened,
    title,
  } = useTeamInvitationSignInDialog({
    onClose: handleGuestTeamInvitationDialogOpen,
    onOpen: handleGuestTeamInvitationDialogClose,
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
        handleSignIn={handleSignInDialogOpen}
        role={role}
        teamName={teamName}
      />
      <SignupDialog
        description={description}
        hasAutoAgreement
        hasOnlyGoogleAuth
        isOpen={isSignInDialogOpened}
        onClose={handleSignInDialogClose}
        title={title}
      />
    </>
  );
};

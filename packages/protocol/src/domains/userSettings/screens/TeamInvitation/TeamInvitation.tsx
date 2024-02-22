import { EmailVerificationIssueDialog } from './components/EmailVerificationIssueDialog';
import { GuestTeamInvitationDialogContainer } from './components/GuestTeamInvitationDialogContainer';
import { LinkExpiredDialog } from './components/LinkExpiredDialog';
import { TeamInvititationDialogContainer } from './components/TeamInvitationDialogContainer';
import { useTeamInvitationPage } from './hooks/useTeamInvitationPage';

export const TeamInvitation = () => {
  const {
    emailVerificationDialogProps,
    expiredLinkDialogProps,
    isLoggedIn,
    teamInvitationDialogProps,
    shouldAvoidGuestTeamInvitationDialog,
  } = useTeamInvitationPage();

  const acceptInvitationDialog =
    isLoggedIn || shouldAvoidGuestTeamInvitationDialog ? (
      <TeamInvititationDialogContainer {...teamInvitationDialogProps} />
    ) : (
      <GuestTeamInvitationDialogContainer {...teamInvitationDialogProps} />
    );

  return (
    <>
      {acceptInvitationDialog}
      <LinkExpiredDialog {...expiredLinkDialogProps} />
      <EmailVerificationIssueDialog {...emailVerificationDialogProps} />
    </>
  );
};

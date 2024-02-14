import { useMemo } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useRejectTeamInvitationCallback } from 'domains/userSettings/screens/TeamInvitation/hooks/useRejectTeamInvitationCallback';

import { TeamInvitationFormProps } from '../../TeamInvitationDialog';
import { useAcceptTeamInvitationCallback } from './useAcceptTeamInvitationCallback';
import { useRejectTeamInvitationSuccessHandler } from './useRejectTeamInvitationSuccessHandler';

export interface UseTeamInvitationFormPropsParams {
  handleSignInDialogOpen: () => void;
  handleTeamInvitationDialogClose: () => void;
  handleTeamInvitationDialogHide: () => void;
  handleTeamInvitationDialogShow: () => void;
}

export const useTeamInvitationFormProps = ({
  handleSignInDialogOpen,
  handleTeamInvitationDialogClose,
  handleTeamInvitationDialogHide,
  handleTeamInvitationDialogShow,
}: UseTeamInvitationFormPropsParams) => {
  const { handleAcceptTeamInvitation, isTeamInvitationAccepting } =
    useAcceptTeamInvitationCallback({ handleTeamInvitationDialogClose });

  const { onSuccess: onRejectTeamInvitationSuccess } =
    useRejectTeamInvitationSuccessHandler({
      handleTeamInvitationDialogClose,
    });

  const { handleRejectTeamInvitation, isRejecting } =
    useRejectTeamInvitationCallback({
      onSuccess: onRejectTeamInvitationSuccess,
    });

  const { gname, role } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const teamInvitationFormProps = useMemo<TeamInvitationFormProps>(
    () => ({
      isDeclining: isRejecting,
      isJoining: isTeamInvitationAccepting,
      onDecline: handleRejectTeamInvitation,
      onDeclineDialogClose: handleTeamInvitationDialogShow,
      onDeclineDialogOpen: handleTeamInvitationDialogHide,
      onJoin: handleAcceptTeamInvitation,
      onSignInWithAnotherEmail: handleSignInDialogOpen,
      role,
      teamName: gname,
    }),
    [
      gname,
      handleAcceptTeamInvitation,
      handleRejectTeamInvitation,
      handleSignInDialogOpen,
      handleTeamInvitationDialogHide,
      handleTeamInvitationDialogShow,
      isRejecting,
      isTeamInvitationAccepting,
      role,
    ],
  );

  return { teamInvitationFormProps };
};

import { useMemo } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useRejectTeamInvitationCallback } from 'domains/userSettings/screens/TeamInvitation/hooks/useRejectTeamInvitationCallback';

import { TeamInvitationFormProps } from '../../TeamInvitationDialog';
import { useAcceptTeamInvitationCallback } from './useAcceptTeamInvitationCallback';
import { useRejectTeamInvitationSuccessHandler } from './useRejectTeamInvitationSuccessHandler';

export interface UseTeamInvitationFormPropsParams {
  handleTeamInvitationDialogClose: () => void;
  handleTeamInvitationDialogHide: () => void;
  handleTeamInvitationDialogShow: () => void;
}

export const useTeamInvitationFormProps = ({
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

  const { gname } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const teamInvitationFormProps = useMemo<TeamInvitationFormProps>(
    () => ({
      isDeclining: isRejecting,
      isJoining: isTeamInvitationAccepting,
      onDecline: handleRejectTeamInvitation,
      onJoin: handleAcceptTeamInvitation,
      onDeclineDialogOpen: handleTeamInvitationDialogHide,
      onDeclineDialogClose: handleTeamInvitationDialogShow,
      teamName: gname,
    }),
    [
      gname,
      handleAcceptTeamInvitation,
      handleRejectTeamInvitation,
      handleTeamInvitationDialogHide,
      handleTeamInvitationDialogShow,
      isRejecting,
      isTeamInvitationAccepting,
    ],
  );

  return { teamInvitationFormProps };
};

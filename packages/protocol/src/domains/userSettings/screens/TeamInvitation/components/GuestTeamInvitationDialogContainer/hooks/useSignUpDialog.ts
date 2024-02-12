import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface IUseSignUpDialogProps {
  handleGuestTeamInvitationDialogClose: () => void;
  handleGuestTeamInvitationDialogOpen: () => void;
}

export const useSignUpDialog = ({
  handleGuestTeamInvitationDialogClose,
  handleGuestTeamInvitationDialogOpen,
}: IUseSignUpDialogProps) => {
  const { isOpened: isSignupDialogOpened, onClose, onOpen } = useDialog();

  const handleSignUpDialogOpen = useCallback(() => {
    handleGuestTeamInvitationDialogClose();

    onOpen();
  }, [handleGuestTeamInvitationDialogClose, onOpen]);

  const handleSignUpDialogClose = useCallback(() => {
    onClose();

    handleGuestTeamInvitationDialogOpen();
  }, [handleGuestTeamInvitationDialogOpen, onClose]);

  const { email } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const title = t('teams.team-invitation-dialog.sign-in-dialog.title');
  const description = t(
    'teams.guest-team-invitation-dialog.sign-in-dialog.description',
    { email },
  );

  return {
    description,
    handleSignUpDialogClose,
    handleSignUpDialogOpen,
    isSignupDialogOpened,
    title,
  };
};

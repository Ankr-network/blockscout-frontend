import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface IUseTeamInvitationSignInDialogProps {
  onOpen: () => void;
  onClose: () => void;
}

export const useTeamInvitationSignInDialog = ({
  onClose,
  onOpen,
}: IUseTeamInvitationSignInDialogProps) => {
  const {
    isOpened: isSignInDialogOpened,
    onClose: handleClose,
    onOpen: handleOpen,
  } = useDialog();

  const handleSignInDialogOpen = useCallback(() => {
    onOpen();

    handleOpen();
  }, [handleOpen, onOpen]);

  const handleSignInDialogClose = useCallback(() => {
    onClose();

    handleClose();
  }, [handleClose, onClose]);

  const { email } = UserSettingsRoutesConfig.teamInvitation.useQuery();

  const title = t('teams.team-invitation-sign-in-dialog.title');
  const description = t('teams.team-invitation-sign-in-dialog.description', {
    email,
  });

  return {
    description,
    handleSignInDialogClose,
    handleSignInDialogOpen,
    isSignInDialogOpened,
    title,
  };
};

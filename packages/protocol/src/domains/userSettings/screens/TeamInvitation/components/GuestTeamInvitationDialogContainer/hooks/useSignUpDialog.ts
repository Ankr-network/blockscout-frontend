import { useCallback } from 'react';

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

  return {
    handleSignUpDialogClose,
    handleSignUpDialogOpen,
    isSignupDialogOpened,
  };
};

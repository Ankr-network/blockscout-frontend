import { useMemo } from 'react';

import { IDialogProps } from 'uiKit/Dialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface UseGuestTeamInvitationDialogParams extends IDialogProps {}

export const useGuestTeamInvitationDialog = ({
  open: isInitiallyOpen = false,
  ...props
}: UseGuestTeamInvitationDialogParams) => {
  const {
    isHidden,
    isOpened: open,
    onClose,
    onOpen: handleGuestTeamInvitationDialogOpen,
  } = useDialog(isInitiallyOpen);

  const guestTeamInvitationDialogProps = useMemo<IDialogProps>(
    () => ({ ...props, isHidden, onClose, open }),
    [isHidden, onClose, open, props],
  );

  const handleGuestTeamInvitationDialogClose = onClose;

  return {
    guestTeamInvitationDialogProps,
    handleGuestTeamInvitationDialogClose,
    handleGuestTeamInvitationDialogOpen,
  };
};

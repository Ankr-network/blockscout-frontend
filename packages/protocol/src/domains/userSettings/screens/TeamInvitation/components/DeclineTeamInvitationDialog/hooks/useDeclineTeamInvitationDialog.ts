import { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import type { DeclineTeamInvitationDialogProps } from '../DeclineTeamInvitationDialog';

export interface UseDeclineTeamInvitationDialogParams
  extends DeclineTeamInvitationDialogProps {
  onOpen: () => void;
}

export const useDeclineTeamInvitationDialog = ({
  onClose,
  onOpen,
  open: isInitiallyOpen = false,
  ...props
}: UseDeclineTeamInvitationDialogParams) => {
  const {
    isOpened: open,
    onClose: handleClose,
    onOpen: handleOpen,
  } = useDialog(isInitiallyOpen);

  const handleDeclineTeamInvitationDialogOpen = useCallback(() => {
    handleOpen();
    onOpen();
  }, [handleOpen, onOpen]);

  const declineTeamInvitationDialogProps =
    useMemo<DeclineTeamInvitationDialogProps>(
      () => ({
        ...props,
        onClose: () => {
          handleClose();
          onClose?.();
        },
        open,
      }),
      [handleClose, onClose, open, props],
    );

  return {
    declineTeamInvitationDialogProps,
    handleDeclineTeamInvitationDialogOpen,
  };
};

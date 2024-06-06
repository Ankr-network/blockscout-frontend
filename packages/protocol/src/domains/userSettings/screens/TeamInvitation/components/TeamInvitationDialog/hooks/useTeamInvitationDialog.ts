import { useMemo } from 'react';

import { IDialogProps } from 'uiKit/Dialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface UseTeamInvitationDialogParams extends IDialogProps {}

export const useTeamInvitationDialog = ({
  open: isInitiallyOpen = false,
  ...props
}: UseTeamInvitationDialogParams) => {
  const {
    handleHide: handleTeamInvitationDialogHide,
    handleShow: handleTeamInvitationDialogShow,
    isHidden,
    isOpened: open,
    onClose,
    onOpen: handleTeamInvitationDialogOpen,
  } = useDialog(isInitiallyOpen);

  const teamInvitationDialogProps = useMemo<IDialogProps>(
    () => ({ ...props, isHidden, onClose, open }),
    [isHidden, onClose, open, props],
  );

  const handleTeamInvitationDialogClose = onClose;

  return {
    handleTeamInvitationDialogClose,
    handleTeamInvitationDialogHide,
    handleTeamInvitationDialogOpen,
    handleTeamInvitationDialogShow,
    teamInvitationDialogProps,
  };
};

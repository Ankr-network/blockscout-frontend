import { useMemo } from 'react';

import { IDialogProps } from 'uiKit/Dialog';
import { useDialog } from 'modules/common/hooks/useDialog';

export interface UseInviteTeammatesDialogParams {
  isOpened?: boolean;
}

export const useInviteTeammatesDialog = ({
  isOpened: isInitiallyOpened = false,
}: UseInviteTeammatesDialogParams | void = {}) => {
  const {
    isOpened: open,
    onClose,
    onOpen: handleInviteTeammatesDialogOpen,
  } = useDialog(isInitiallyOpened);

  const inviteTeammatesDialogProps = useMemo<IDialogProps>(
    () => ({ onClose, open }),
    [onClose, open],
  );

  return { handleInviteTeammatesDialogOpen, inviteTeammatesDialogProps };
};

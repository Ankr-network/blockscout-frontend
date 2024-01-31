import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

export interface IUseSignUpDialogProps {
  handleParentDialogClose: () => void;
  handleParentDialogOpen: () => void;
}

export const useSignUpDialog = ({
  handleParentDialogClose,
  handleParentDialogOpen,
}: IUseSignUpDialogProps) => {
  const {
    isOpened: isSignUpDialogOpened,
    onClose: handleClose,
    onOpen: handleOpen,
  } = useDialog();

  const handleSignUpDialogOpen = useCallback(() => {
    handleParentDialogClose();

    handleOpen();
  }, [handleOpen, handleParentDialogClose]);

  const handleSignUpDialogClose = useCallback(() => {
    handleClose();

    handleParentDialogOpen();
  }, [handleClose, handleParentDialogOpen]);

  return {
    handleSignUpDialogClose,
    handleSignUpDialogOpen,
    isSignUpDialogOpened,
  };
};

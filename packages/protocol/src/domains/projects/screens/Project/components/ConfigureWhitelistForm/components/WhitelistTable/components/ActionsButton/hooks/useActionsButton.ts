import { useCallback } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useMenu } from 'modules/common/hooks/useMenu';

import { useDeleteWhitelistItemHandler } from './useDeleteWhitelistItemHandler';

export interface UseActionsButtonParams {
  address: string;
  handleEditSidebarOpening: (value: string) => void;
}

export const useActionsButton = ({
  address,
  handleEditSidebarOpening,
}: UseActionsButtonParams) => {
  const {
    anchorEl: whitelistActionsMenuAnchorEl,
    handleClose: handleCloseWhitelistActionsMenu,
    handleOpen: handleOpenWhitelistActionsMenu,
    open: isWhitelistActionsMenuOpened,
  } = useMenu();

  const {
    isOpened: isDeleteWhitelistDialogOpened,
    onClose: handleCloseDeleteWhitelistDialog,
    onOpen: handleOpenDeleteWhitelistDialog,
  } = useDialog();

  const { handleDeleteWhitelistItem, isDeleting } =
    useDeleteWhitelistItemHandler({
      address,
      onSuccess: handleCloseDeleteWhitelistDialog,
    });

  const onDelete = useCallback(() => {
    handleOpenDeleteWhitelistDialog();
    handleCloseWhitelistActionsMenu();
  }, [handleCloseWhitelistActionsMenu, handleOpenDeleteWhitelistDialog]);

  const onEdit = useCallback(() => {
    handleEditSidebarOpening(address);
  }, [address, handleEditSidebarOpening]);

  return {
    handleCloseDeleteWhitelistDialog,
    handleCloseWhitelistActionsMenu,
    handleDeleteWhitelistItem,
    handleOpenWhitelistActionsMenu,
    isDeleteWhitelistDialogOpened,
    isDeleting,
    isWhitelistActionsMenuOpened,
    onDelete,
    onEdit,
    whitelistActionsMenuAnchorEl,
  };
};

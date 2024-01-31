import { useCallback, useMemo } from 'react';
import { UserGroup } from 'multirpc-sdk';

import { useMenu } from 'modules/common/hooks/useMenu';
import { useDialog } from 'modules/common/hooks/useDialog';

import { TeamMenuProps } from './TeamMenu';
import { IRenameTeamDialogProps } from '../RenameTeamDialog';

export const useTeamMenu = (group: UserGroup) => {
  const { address: groupAddress, name, comment = '', companyType = '' } = group;

  const {
    anchorEl: anchorElGroupMenu,
    handleOpen: handleOpenGroupMenu,
    handleClose: handleCloseGroupMenu,
    open: isGroupMenuOpened,
  } = useMenu();

  const {
    isOpened: isRenameTeamDialogOpened,
    onOpen: onOpenRenameTeamDialog,
    onClose: onCloseRenameTeamDialog,
  } = useDialog();

  const handleOpenRenameTeamDialog = useCallback(() => {
    handleCloseGroupMenu();
    onOpenRenameTeamDialog();
  }, [handleCloseGroupMenu, onOpenRenameTeamDialog]);

  const groupMenuProps: TeamMenuProps = useMemo(() => {
    return {
      anchorEl: anchorElGroupMenu,
      handleClose: handleCloseGroupMenu,
      open: isGroupMenuOpened,
      onOpenRenameModal: handleOpenRenameTeamDialog,
      onClose: handleCloseGroupMenu,
    };
  }, [
    anchorElGroupMenu,
    handleCloseGroupMenu,
    handleOpenRenameTeamDialog,
    isGroupMenuOpened,
  ]);

  const handleMenuClick = useCallback(
    event => {
      event.stopPropagation();

      handleOpenGroupMenu(event);
    },
    [handleOpenGroupMenu],
  );

  const renameTeamDialogProps = useMemo<IRenameTeamDialogProps>(
    () => ({
      open: isRenameTeamDialogOpened,
      onClose: onCloseRenameTeamDialog,
      group: groupAddress,
      name,
      comment,
      company_type: companyType,
    }),
    [
      comment,
      companyType,
      groupAddress,
      isRenameTeamDialogOpened,
      name,
      onCloseRenameTeamDialog,
    ],
  );

  return {
    handleMenuClick,
    renameTeamDialogProps,
    groupMenuProps,
    onOpenRenameTeamDialog,
  };
};

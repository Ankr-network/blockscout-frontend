import { useCallback } from 'react';

import { useMenu } from 'modules/common/hooks/useMenu';

import { IUseUserRoleProps, useUserRole } from './useUserRole';

export interface IUseUserRoleMenuProps
  extends Omit<IUseUserRoleProps, 'onUpdateUserRoleSuccess'> {}

export const useUserRoleMenu = ({
  email,
  group,
  initialUserRole,
  userAddress,
}: IUseUserRoleMenuProps) => {
  const {
    anchorEl,
    handleClose,
    handleOpen: handleUserRoleMenuOpen,
    open: isUserRoleMenuOpened,
  } = useMenu();

  const {
    handleUserRoleChange,
    handleUserRoleSelect,
    handleUserRoleUpdate,
    isLoading,
    selectedUserRole,
    userRole,
  } = useUserRole({
    email,
    group,
    initialUserRole,
    onUpdateUserRoleSuccess: handleClose,
    userAddress,
  });

  const handleUserRoleMenuClose = useCallback(() => {
    handleUserRoleSelect(initialUserRole);
    handleClose();
  }, [handleClose, handleUserRoleSelect, initialUserRole]);

  return {
    anchorEl,
    handleUserRoleChange,
    handleUserRoleMenuClose,
    handleUserRoleMenuOpen,
    handleUserRoleUpdate,
    isButtonDisabled: selectedUserRole === userRole,
    isLoading,
    isUserRoleMenuOpened,
    selectedUserRole,
    userRole,
  };
};

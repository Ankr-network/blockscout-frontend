import { GroupUserRole } from 'multirpc-sdk';
import { Typography } from '@mui/material';

import { IUpdateRoleMutationArgs } from 'domains/userSettings/actions/teams/updateRole';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';

import { UserRoleMenuButton } from '../UserRoleMenuButton';
import { UserRoleMenu, useUserRoleMenu } from '../UserRoleMenu';

interface IUserRoleSelectProps extends Omit<IUpdateRoleMutationArgs, 'role'> {
  currentRole: GroupUserRole;
  isDisabled?: boolean;
  isPlainTextView: boolean;
}

export const UserRoleSelect = ({
  currentRole,
  userAddress,
  email,
  group,
  isDisabled,
  isPlainTextView,
}: IUserRoleSelectProps) => {
  const {
    anchorEl,
    handleUserRoleChange,
    handleUserRoleMenuClose,
    handleUserRoleMenuOpen,
    handleUserRoleUpdate,
    isButtonDisabled,
    isLoading,
    isUserRoleMenuOpened,
    selectedUserRole,
    userRole,
  } = useUserRoleMenu({
    email,
    group,
    initialUserRole: currentRole,
    userAddress,
  });

  if (!isPlainTextView) {
    return <Typography variant="body3">{getUserRoleName(userRole)}</Typography>;
  }

  return (
    <>
      <UserRoleMenuButton
        currentRole={userRole}
        isDisabled={isDisabled || userRole === GroupUserRole.owner}
        isMenuOpen={isUserRoleMenuOpened}
        onClick={handleUserRoleMenuOpen}
      />

      <UserRoleMenu
        anchorEl={anchorEl}
        handleRoleChange={handleUserRoleChange}
        handleUpdateRole={handleUserRoleUpdate}
        isButtonDisabled={isButtonDisabled}
        isLoading={isLoading}
        onClose={handleUserRoleMenuClose}
        open={isUserRoleMenuOpened}
        selectedRole={selectedUserRole}
      />
    </>
  );
};

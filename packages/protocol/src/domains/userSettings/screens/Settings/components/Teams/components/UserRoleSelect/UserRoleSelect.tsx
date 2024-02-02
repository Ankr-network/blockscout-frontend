import { GroupUserRole } from 'multirpc-sdk';

import { IUpdateRoleMutationArgs } from 'domains/userSettings/actions/teams/updateRole';

import { UserRoleMenuButton } from '../UserRoleMenuButton';
import { UserRoleMenu } from '../UserRoleMenu';
import { useUserRoleMenu } from '../UserRoleMenu/hooks/useUserRoleMenu';

interface IUserRoleSelectProps extends Omit<IUpdateRoleMutationArgs, 'role'> {
  currentRole: GroupUserRole;
  isDisabled?: boolean;
}

export const UserRoleSelect = ({
  currentRole,
  userAddress,
  email,
  group,
  isDisabled,
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

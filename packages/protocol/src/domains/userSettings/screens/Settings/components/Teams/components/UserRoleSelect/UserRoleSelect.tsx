import { GroupUserRole } from 'multirpc-sdk';

import { useMenu } from 'modules/common/hooks/useMenu';
import { IUpdateRoleMutationArgs } from 'domains/userSettings/actions/teams/updateRole';

import { UserRoleMenuButton } from '../UserRoleMenuButton';
import { UserRoleMenu } from '../UserRoleMenu';
import { useUserRoleMenu } from '../UserRoleMenu/useUserRoleMenu';

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
  const { anchorEl, handleOpen, handleClose, open } = useMenu();

  const {
    isLoading,
    isButtonDisabled,
    selectedRole,
    handleUpdateRole,
    handleRoleChange,
    userRole,
  } = useUserRoleMenu({
    currentRole,
    userAddress,
    email,
    group,
    onClose: handleClose,
  });

  return (
    <>
      <UserRoleMenuButton
        currentRole={userRole}
        isMenuOpen={open}
        onClick={handleOpen}
        isDisabled={isDisabled || userRole === GroupUserRole.owner}
      />

      <UserRoleMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        isLoading={isLoading}
        isButtonDisabled={isButtonDisabled}
        selectedRole={selectedRole}
        handleUpdateRole={handleUpdateRole}
        handleRoleChange={handleRoleChange}
      />
    </>
  );
};

import { GroupUserRole, IUpdateGroupMemberRoleParams } from 'multirpc-sdk';
import { useCallback, useMemo, useState } from 'react';

import { useUpdateRoleMutation } from 'domains/userSettings/actions/teams/updateRole';

interface IUserRoleMenuProps
  extends Omit<IUpdateGroupMemberRoleParams, 'role'> {
  currentRole: GroupUserRole;
  email?: string;
  onClose: () => void;
}

export const useUserRoleMenu = ({
  currentRole,
  userAddress,
  email,
  group,
  onClose,
}: IUserRoleMenuProps) => {
  const [updateRole, { data: newData, isLoading }] = useUpdateRoleMutation();

  // in some cases we receive currentRole from group details response with old value after updates.
  // in order not to use timeouts we are using data from useUpdateRoleMutation to get the updated role
  const userRole = useMemo(() => {
    if (newData && !isLoading) {
      const currentUser = newData.members.find(
        ({ address }) => address.toLowerCase() === userAddress.toLowerCase(),
      );

      const newUserRole = currentUser?.role || currentRole;

      return newUserRole;
    }

    return currentRole;
  }, [currentRole, newData, userAddress, isLoading]);

  const [selectedRole, setSelectedRole] = useState(userRole);

  const handleUpdateRole = useCallback(async () => {
    await updateRole({
      role: selectedRole,
      userAddress,
      email,
      group,
    });
    onClose();
  }, [email, group, onClose, selectedRole, updateRole, userAddress]);

  const handleRoleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSelectedRole(value as GroupUserRole);
    },
    [],
  );

  return {
    isLoading,
    isButtonDisabled: selectedRole === userRole,
    selectedRole,
    handleRoleChange,
    handleUpdateRole,
    userRole,
  };
};

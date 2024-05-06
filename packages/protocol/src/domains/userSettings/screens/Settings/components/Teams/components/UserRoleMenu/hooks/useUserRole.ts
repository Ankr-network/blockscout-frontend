import { GroupUserRole, IUpdateGroupMemberRoleParams } from 'multirpc-sdk';
import { useCallback, useMemo, useState } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { useUpdateRoleMutation } from 'domains/userSettings/actions/teams/updateRole';

import { getUserRole } from '../utils/getUserRole';

export interface IUseUserRoleProps
  extends Omit<IUpdateGroupMemberRoleParams, 'role'> {
  email?: string;
  initialUserRole: GroupUserRole;
  onUpdateUserRoleSuccess: () => void;
}

export const useUserRole = ({
  email,
  group,
  initialUserRole,
  onUpdateUserRoleSuccess,
  userAddress,
}: IUseUserRoleProps) => {
  const [updateRole, { data: response, isLoading }] = useUpdateRoleMutation();

  // in some cases we receive currentRole from group details response with old value after updates.
  // in order not to use timeouts we are using data from useUpdateRoleMutation to get the updated role
  const userRole = useMemo(
    () =>
      getUserRole({
        initialUserRole,
        isLoading,
        response,
        userAddress,
      }),
    [initialUserRole, response, userAddress, isLoading],
  );

  const [selectedUserRole, handleUserRoleSelect] = useState(userRole);

  const handleUserRoleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      handleUserRoleSelect(value as GroupUserRole);
    },
    [],
  );

  const handleUserRoleUpdate = useCallback(async () => {
    const result = await updateRole({
      email,
      group,
      role: selectedUserRole,
      userAddress,
    });

    if (isMutationSuccessful(result)) {
      onUpdateUserRoleSuccess();
    }
  }, [
    email,
    group,
    onUpdateUserRoleSuccess,
    selectedUserRole,
    updateRole,
    userAddress,
  ]);

  return {
    handleUserRoleChange,
    handleUserRoleSelect,
    handleUserRoleUpdate,
    isLoading,
    selectedUserRole,
    userRole,
  };
};

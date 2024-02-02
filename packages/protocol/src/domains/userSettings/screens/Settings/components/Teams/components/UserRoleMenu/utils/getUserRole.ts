import { GroupUserRole, IUpdateGroupMemberRoleResponse } from 'multirpc-sdk';

export interface IGetUserRoleParams {
  initialUserRole: GroupUserRole;
  isLoading: boolean;
  response?: IUpdateGroupMemberRoleResponse;
  userAddress: string;
}

export const getUserRole = ({
  initialUserRole,
  isLoading,
  response,
  userAddress,
}: IGetUserRoleParams) => {
  if (response && !isLoading) {
    const currentUser = response.members.find(
      ({ address }) => address.toLowerCase() === userAddress.toLowerCase(),
    );

    const newUserRole = currentUser?.role || initialUserRole;

    return newUserRole;
  }

  return initialUserRole;
};

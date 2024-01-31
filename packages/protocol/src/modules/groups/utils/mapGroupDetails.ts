import { GroupUserRole, IApiUserGroupDetails } from 'multirpc-sdk';

const roleOrder = {
  [GroupUserRole.owner]: 1,
  [GroupUserRole.admin]: 2,
  [GroupUserRole.dev]: 3,
  [GroupUserRole.finance]: 4,
};

const sortMembersByRoles = (members?: IApiUserGroupDetails['members']) => {
  if (!members) return [];

  return [...members].sort((a, b) => {
    return roleOrder[a.role] - roleOrder[b.role];
  });
};

const sortCurrentUserToFirstPosition = (
  members?: IApiUserGroupDetails['members'],
  currentUserAddress?: string,
) => {
  if (!members) return [];

  return [...members].sort((a, b) => {
    if (a.address?.toLowerCase() === currentUserAddress?.toLowerCase())
      return -1;

    if (b.address?.toLowerCase() === currentUserAddress?.toLowerCase())
      return 1;

    return 0;
  });
};

export const mapGroupDetails = (
  data?: IApiUserGroupDetails,
  currentUserAddress?: string,
): IApiUserGroupDetails | undefined => {
  if (!data) return undefined;

  const { members = [] } = data;

  if (members?.length === 0) {
    return data;
  }

  const sortedByRolesUsers = sortMembersByRoles(members);

  return {
    ...data,
    members: sortCurrentUserToFirstPosition(
      sortedByRolesUsers,
      currentUserAddress,
    ),
  };
};

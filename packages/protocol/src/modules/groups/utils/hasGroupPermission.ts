import { GroupUserRole } from 'multirpc-sdk';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { getPermissions } from './getPermissions';

export const hasGroupPermission = (
  role: GroupUserRole,
  permission: BlockWithPermission,
) => {
  return getPermissions(role).includes(permission);
};

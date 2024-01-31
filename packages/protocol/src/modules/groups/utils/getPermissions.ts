import { GroupUserRole } from 'multirpc-sdk';

import {
  ADMIN_PERMISSIONS,
  DEVELOPER_PERMISSIONS,
  FINANCE_PERMISSIONS,
  OWNER_PERMISSIONS,
} from 'domains/userGroup/constants/groups';

export const getPermissions = (role?: GroupUserRole) => {
  switch (role) {
    case GroupUserRole.dev:
      return DEVELOPER_PERMISSIONS;

    case GroupUserRole.finance:
      return FINANCE_PERMISSIONS;

    case GroupUserRole.admin:
      return ADMIN_PERMISSIONS;

    case GroupUserRole.owner:
    default:
      return OWNER_PERMISSIONS;
  }
};

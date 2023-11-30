import { GroupUserRole } from 'multirpc-sdk';

import {
  DEVELOPER_PERMISSIONS,
  FINANCE_PERMISSIONS,
  OWNER_PERMISSIONS,
} from '../constants/groups';

export const getPermissions = (role?: GroupUserRole) => {
  switch (role) {
    case GroupUserRole.dev:
      return DEVELOPER_PERMISSIONS;

    case GroupUserRole.finance:
      return FINANCE_PERMISSIONS;

    case GroupUserRole.owner:
    default:
      return OWNER_PERMISSIONS;
  }
};

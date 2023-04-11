import { GroupUserRole } from 'multirpc-sdk';
import { useMemo } from 'react';

import {
  DEVELOPER_PERMISSIONS,
  FINANCE_PERMISSIONS,
  OWNER_PERMISSIONS,
} from '../constants/groups';
import { useUserGroupConfig } from './useUserGroupConfig';

const getPermissions = (role?: GroupUserRole) => {
  switch (role) {
    case 'GROUP_ROLE_DEV':
      return DEVELOPER_PERMISSIONS;

    case 'GROUP_ROLE_FINANCE':
      return FINANCE_PERMISSIONS;

    case 'GROUP_ROLE_OWNER':
    default:
      return OWNER_PERMISSIONS;
  }
};

export const usePermissionsAndRole = () => {
  const { selectedGroupRole } = useUserGroupConfig();
  const permissions = useMemo(
    () => getPermissions(selectedGroupRole),
    [selectedGroupRole],
  );

  const isDevRole = selectedGroupRole === 'GROUP_ROLE_DEV';
  const isFinanceRole = selectedGroupRole === 'GROUP_ROLE_FINANCE';
  const isOwnerRole = selectedGroupRole === 'GROUP_ROLE_OWNER';

  return {
    permissions,
    role: selectedGroupRole,
    isDevRole,
    isFinanceRole,
    isOwnerRole,
  };
};

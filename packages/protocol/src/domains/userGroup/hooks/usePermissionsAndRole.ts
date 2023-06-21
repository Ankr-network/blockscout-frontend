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
    case GroupUserRole.dev:
      return DEVELOPER_PERMISSIONS;

    case GroupUserRole.finance:
      return FINANCE_PERMISSIONS;

    case GroupUserRole.owner:
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

  const isDevRole = selectedGroupRole === GroupUserRole.dev;
  const isFinanceRole = selectedGroupRole === GroupUserRole.finance;
  const isOwnerRole = selectedGroupRole === GroupUserRole.owner;

  return {
    permissions,
    role: selectedGroupRole,
    isDevRole,
    isFinanceRole,
    isOwnerRole,
  };
};
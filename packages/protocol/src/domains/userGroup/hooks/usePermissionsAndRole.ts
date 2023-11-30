import { GroupUserRole } from 'multirpc-sdk';
import { useMemo } from 'react';

import { getPermissions } from '../utils/getPermissions';
import { useUserGroupConfig } from './useUserGroupConfig';

export const usePermissionsAndRole = () => {
  const { selectedGroupRole } = useUserGroupConfig();
  const permissions = useMemo(
    () => getPermissions(selectedGroupRole),
    [selectedGroupRole],
  );

  const isFinanceRole = selectedGroupRole === GroupUserRole.finance;

  return {
    permissions,
    deprecatedIsFinanceRole: isFinanceRole, // deprecated param. use BlockWithPermission to get the permissions
  };
};

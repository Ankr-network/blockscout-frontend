import { t } from '@ankr.com/common';
import { GroupUserRole } from 'multirpc-sdk';

import { userRoleNamesMap } from 'domains/userSettings/screens/Settings/constants';

export const getUserRoleName = (role: GroupUserRole) => {
  return t(userRoleNamesMap[role] || 'teams.roles.owner');
};

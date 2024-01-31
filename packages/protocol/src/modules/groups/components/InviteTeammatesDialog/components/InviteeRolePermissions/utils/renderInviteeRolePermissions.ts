import { GroupUserRole } from 'multirpc-sdk';
import { tHTML } from '@ankr.com/common';

import { InviteeRole } from 'modules/groups/components/InviteTeammatesDialog/types';

import { INTL_ROOT } from '../constants';

const permissionKeysMap: Record<InviteeRole, string> = {
  [GroupUserRole.admin]: `${INTL_ROOT}.permissions.admin`,
  [GroupUserRole.dev]: `${INTL_ROOT}.permissions.dev`,
  [GroupUserRole.finance]: `${INTL_ROOT}.permissions.finance`,
};

export const renderInviteeRolePermissions = (role: InviteeRole) =>
  tHTML(permissionKeysMap[role]);

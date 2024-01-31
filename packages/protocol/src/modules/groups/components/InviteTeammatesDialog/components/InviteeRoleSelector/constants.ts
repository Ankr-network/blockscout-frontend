import { GroupUserRole } from 'multirpc-sdk';

import { InviteeRole } from '../../types';

export const inviteeRoles: InviteeRole[] = [
  GroupUserRole.admin,
  GroupUserRole.dev,
  GroupUserRole.finance,
];

const intlRoot =
  'teams.invite-teammates-dialog.invitee-role-selector.roles-description';

export const inviteeRolesDescriptionMap: Record<InviteeRole, string> = {
  [GroupUserRole.admin]: `${intlRoot}.admin`,
  [GroupUserRole.dev]: `${intlRoot}.dev`,
  [GroupUserRole.finance]: `${intlRoot}.finance`,
};

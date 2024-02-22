import { GroupUserRole } from 'multirpc-sdk';

export const userRoleNamesMap: Record<GroupUserRole, string> = {
  [GroupUserRole.admin]: 'teams.roles.admin',
  [GroupUserRole.dev]: 'teams.roles.dev',
  [GroupUserRole.finance]: 'teams.roles.finance',
  [GroupUserRole.owner]: 'teams.roles.owner',
};

export const DEFAULT_GROUP_MEMBERS_LIMIT = 20;

export const MAX_TEAM_NAME_LENGTH = 50;

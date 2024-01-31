import { GroupUserRole } from 'multirpc-sdk';

export type InviteeRole = Exclude<GroupUserRole, GroupUserRole.owner>;

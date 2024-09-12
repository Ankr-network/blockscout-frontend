import { GroupUserRole } from 'multirpc-sdk';

import {
  TeamInvitationQueryParams,
  TeamInvitationQueryParamsName,
} from '../types';

export const getTeamInvitationParams = (
  query: string,
): TeamInvitationQueryParams => {
  const queryParams = new URLSearchParams(query);

  return {
    [TeamInvitationQueryParamsName.Group]: queryParams.get('group') ?? '',
    [TeamInvitationQueryParamsName.Email]: queryParams.get('email') ?? '',
    [TeamInvitationQueryParamsName.Token]: queryParams.get('token') ?? '',
    [TeamInvitationQueryParamsName.Role]:
      (queryParams.get('role') as GroupUserRole) ?? GroupUserRole.dev,
    [TeamInvitationQueryParamsName.Gname]: queryParams.get('gname') ?? '',
    [TeamInvitationQueryParamsName.ExpiresAt]:
      queryParams.get('expires_at') ?? '',
  };
};

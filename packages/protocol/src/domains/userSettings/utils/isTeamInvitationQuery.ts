import { TeamInvitationQueryParamsName } from '../types';

export const isTeamInvitationQuery = (query: string) => {
  const queryParams = new URLSearchParams(query);
  const queryNames = Object.values(TeamInvitationQueryParamsName);

  return queryNames.every(name => queryParams.has(name));
};

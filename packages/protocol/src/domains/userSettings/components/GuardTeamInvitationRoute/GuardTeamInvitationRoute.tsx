import { Redirect, RouteProps } from 'react-router-dom';
import { INDEX_PATH } from 'routes/constants';

import { UserSettingsRoutes } from 'domains/userSettings/Routes';
import { isTeamInvitationQuery } from 'domains/userSettings/utils/isTeamInvitationQuery';

export interface GuardTeamInvitationRouteProps extends RouteProps {}

export const GuardTeamInvitationRoute = (
  props: GuardTeamInvitationRouteProps,
) => {
  const { location } = props;

  const isTeamInvitation = isTeamInvitationQuery(location?.search || '');

  if (isTeamInvitation) {
    return <UserSettingsRoutes />;
  }

  return <Redirect to={INDEX_PATH} />;
};

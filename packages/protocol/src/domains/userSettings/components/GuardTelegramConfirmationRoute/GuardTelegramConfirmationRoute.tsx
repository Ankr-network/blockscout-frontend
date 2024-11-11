import { Redirect, RouteProps } from 'react-router-dom';

import { PATH_SETTINGS, UserSettingsRoutes } from 'domains/userSettings/Routes';
import { isTelegramConfirmationQuery } from 'domains/userSettings/utils/isTelegramConfirmationQuery';

export interface GuardTelegramConfirmationRouteProps extends RouteProps {}

export const GuardTelegramConfirmationRoute = (
  props: GuardTelegramConfirmationRouteProps,
) => {
  const { location } = props;

  const isTelegramConfirmation = isTelegramConfirmationQuery(
    location?.search || '',
  );

  if (isTelegramConfirmation) {
    return <UserSettingsRoutes />;
  }

  return <Redirect to={PATH_SETTINGS} />;
};

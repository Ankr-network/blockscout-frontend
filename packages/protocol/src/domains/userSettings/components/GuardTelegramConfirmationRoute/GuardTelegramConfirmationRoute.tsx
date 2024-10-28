import { Redirect, RouteProps } from 'react-router-dom';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
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
    return (
      <DefaultLayout>
        <UserSettingsRoutes />
      </DefaultLayout>
    );
  }

  return <Redirect to={PATH_SETTINGS} />;
};

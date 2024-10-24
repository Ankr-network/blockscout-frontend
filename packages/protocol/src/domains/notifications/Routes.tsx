import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const NOTIFICATIONS_PATH = '/notifications/';

export const NotificationsRoutesConfig = createRouteConfig(
  {
    notifications: {
      path: NOTIFICATIONS_PATH,
      generatePath: () => NOTIFICATIONS_PATH,
      breadcrumbs: 'plan.breadcrumbs',
    },
  },
  NOTIFICATIONS_PATH,
);

const LoadableNotificationsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/NotificationsPage').then(
      module => module.NotificationsPage,
    ),
  {
    fallback: <OverlaySpinner />,
  },
);

export function NotificationsRoutes() {
  return (
    <Route
      exact
      path={NotificationsRoutesConfig.notifications.path}
      component={LoadableNotificationsContainer}
    />
  );
}

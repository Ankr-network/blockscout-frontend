import React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'uiKit/Spinner';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { Route } from 'react-router-dom';

const PATH_DASHBOARD = '/private/';

export const DashboardRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH_DASHBOARD,
      generatePath: () => PATH_DASHBOARD,
      breadcrumbs: 'dashboard.title',
    },
  },
  PATH_DASHBOARD,
);

const LoadableDashboardContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Dashboard').then(module => module.Dashboard),
  {
    fallback: <Spinner />,
  },
);

export function DashboardRoutes() {
  return (
    <>
      <Route
        exact
        path={DashboardRoutesConfig.dashboard.path}
        component={LoadableDashboardContainer}
      />
    </>
  );
}

import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_DASHBOARD = '/dashboard';

export const DashboardRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH_DASHBOARD,
      generatePath: () => PATH_DASHBOARD,
    },
  },
  PATH_DASHBOARD,
);

const LoadableDashboardContainer: LoadableComponent<any> = loadable(
  async () => import('./screens/Dashboard').then(module => module.Dashboard),
  {
    fallback: <QueryLoadingAbsolute />,
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

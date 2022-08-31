import { generatePath, Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ConnectGuardRoute } from './components/ConnectGuardRoute';

const ROOT = '/';

const Dashboard = loadComponent(() =>
  import('./screens/Dashboard').then(module => module.Dashboard),
);

export const RoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
    dashboardSpare: {
      path: `${ROOT}dashboard/`,
      generatePath: () => generatePath(`${ROOT}dashboard/`),
    },
  },
  ROOT,
);

export function getRoutes(): JSX.Element {
  return (
    <Route
      exact
      path={[RoutesConfig.dashboard.path, RoutesConfig.dashboardSpare.path]}
    >
      <Switch>
        <ConnectGuardRoute
          exact
          path={[RoutesConfig.dashboard.path, RoutesConfig.dashboardSpare.path]}
        >
          <DefaultLayout>
            <Dashboard />
          </DefaultLayout>
        </ConnectGuardRoute>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

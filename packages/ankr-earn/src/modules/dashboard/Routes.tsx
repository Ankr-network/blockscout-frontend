import loadable from '@loadable/component';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { ConnectGuardRoute } from './components/ConnectGuardRoute';

const ROOT = `/dashboard`;

const Dashboard = loadable(
  async () => import('./screens/Dashboard').then(module => module.Dashboard),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export const RoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
  },
  ROOT,
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <ConnectGuardRoute exact path={ROOT}>
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

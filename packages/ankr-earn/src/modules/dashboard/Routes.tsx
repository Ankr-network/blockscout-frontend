import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { EARN_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ConnectGuardRoute } from './components/ConnectGuardRoute';

const ROOT = `${EARN_PATH}dashboard/`;

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

export function getRoutes(): JSX.Element {
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

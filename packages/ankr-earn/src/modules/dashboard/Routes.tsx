import { generatePath, Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ConnectGuardRoute } from './components/ConnectGuardRoute';

const ROOT = `${STAKING_PATH}dashboard/`;

const Dashboard = loadComponent(() =>
  import('./screens/Dashboard').then(module => module.Dashboard),
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

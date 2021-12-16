import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';
import { INDEX_PATH } from '../common/const';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

const ROOT = `${INDEX_PATH}/MATIC`;
const DASHBOARD_PATH = `${ROOT}`;
const STAKE_PATH = `${ROOT}/stake`;

const Dashboard = loadable(
  async () =>
    import('./screens/StakePolygonDashboard').then(
      module => module.StakePolygonDashboard,
    ),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const Stake = loadable(
  async () =>
    import('./screens/StakePolygon').then(module => module.StakePolygon),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export const RoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: DASHBOARD_PATH,
      generatePath: () => generatePath(DASHBOARD_PATH),
    },
    stake: {
      path: STAKE_PATH,
      generatePath: () => generatePath(STAKE_PATH),
    },
  },
  ROOT,
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route path={RoutesConfig.dashboard.path} exact>
          <DefaultLayout>
            <Dashboard />
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.stake.path} exact>
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </Route>

        <Route>
          {/* todo: use 404 page component */}
          <DefaultLayout>404</DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

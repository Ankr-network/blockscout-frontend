import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

// TODO: remove dashboard from this route and all dependend components if we decide not to use it

const ROOT = '/polygon-staking'; //`${INDEX_PATH}/MATIC`;
const DASHBOARD_PATH = '/polygon-staking/dashboard'; //`${ROOT}`;
const STAKE_PATH = '/polygon-staking/stake'; //`${ROOT}/stake`;

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

console.log(RoutesConfig.root);
console.log(RoutesConfig.dashboard.path);

export function getRoutes() {
  return (
    <Switch>
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
  );
}

import loadable from '@loadable/component';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { RoutesConfig as FeaturesRoutes } from 'modules/features/Routes';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { POLYGON_PROVIDER_ID } from './const';

// TODO: remove dashboard from this route and all dependend components if we decide not to use it

const ROOT = `${FeaturesRoutes.main.path}/MATIC`;
const DASHBOARD_PATH = `${ROOT}/dashboard`;
const STAKE_PATH = ROOT;

const StakePolygonDashboard = loadable(
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
        <GuardRoute
          providerId={POLYGON_PROVIDER_ID}
          path={DASHBOARD_PATH}
          exact
        >
          <DefaultLayout>
            <StakePolygonDashboard />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute providerId={POLYGON_PROVIDER_ID} path={STAKE_PATH} exact>
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

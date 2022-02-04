import loadable from '@loadable/component';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { MATIC_STAKING_NETWORKS, POLYGON_PROVIDER_ID } from './const';

const ROOT = `${StakeRoutes.main.path}matic/`;
const STAKE_MATIC_PATH = ROOT;
const UNSTAKE_MATIC_PATH = `${UNSTAKE_PATH}matic/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_MATIC_PATH,
      generatePath: () => generatePath(STAKE_MATIC_PATH),
    },
    unstake: {
      path: UNSTAKE_MATIC_PATH,
      generatePath: () => generatePath(UNSTAKE_MATIC_PATH),
    },
  },
  ROOT,
);

const Stake = loadable(
  async () =>
    import('./screens/StakePolygon').then(module => module.StakePolygon),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const Unstake = loadable(
  async () =>
    import('./screens/UnstakePolygon').then(module => module.UnstakePolygon),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes() {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          providerId={POLYGON_PROVIDER_ID}
          path={RoutesConfig.stake.path}
          availableNetworks={MATIC_STAKING_NETWORKS}
          exact
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          providerId={POLYGON_PROVIDER_ID}
          path={RoutesConfig.unstake.path}
          availableNetworks={MATIC_STAKING_NETWORKS}
          exact
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
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

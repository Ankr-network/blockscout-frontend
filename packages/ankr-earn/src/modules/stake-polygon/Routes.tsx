import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { MATIC_STAKING_NETWORKS, POLYGON_PROVIDER_ID } from './const';

const ROOT = `${StakeRoutes.main.path}matic/`;
const STAKE_MATIC_PATH = ROOT;
const UNSTAKE_MATIC_PATH = `${UNSTAKE_PATH}matic/`;
const STEP_STAKE_MATIC_PATH = `${ROOT}:txHash/`;

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
    stakeStep: {
      path: STEP_STAKE_MATIC_PATH,
      generatePath: () => generatePath(STEP_STAKE_MATIC_PATH),
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

const StakeSteps = loadable(
  async () =>
    import('./screens/StakePolygonSteps').then(
      module => module.StakePolygonSteps,
    ),
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

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          exact
          availableNetworks={MATIC_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={POLYGON_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={MATIC_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={POLYGON_PROVIDER_ID}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={MATIC_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
          providerId={POLYGON_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeSteps />
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

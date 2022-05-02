import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

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

const Stake = loadComponent(() =>
  import('./screens/StakePolygon').then(module => module.StakePolygon),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakePolygonSteps').then(
    module => module.StakePolygonSteps,
  ),
);

const Unstake = loadComponent(() =>
  import('./screens/UnstakePolygon').then(module => module.UnstakePolygon),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={MATIC_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={POLYGON_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={POLYGON_PROVIDER_ID}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
          providerId={POLYGON_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

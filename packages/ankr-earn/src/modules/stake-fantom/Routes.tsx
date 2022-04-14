import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { FANTOM_PROVIDER_ID, FANTOM_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}fantom/`;
const STAKE_FANTOM_PATH = ROOT;
const UNSTAKE_FANTOM_PATH = `${UNSTAKE_PATH}fantom/`;
const STEP_STAKE_FANTOM_PATH = `${ROOT}:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_FANTOM_PATH,
      generatePath: () => generatePath(STAKE_FANTOM_PATH),
    },
    unstake: {
      path: UNSTAKE_FANTOM_PATH,
      generatePath: () => generatePath(UNSTAKE_FANTOM_PATH),
    },
    stakeStep: {
      path: STEP_STAKE_FANTOM_PATH,
      generatePath: () => generatePath(STEP_STAKE_FANTOM_PATH),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/StakeFantom').then(module => module.StakeFantom),
);

const Unstake = loadComponent(() =>
  import('./screens/UnstakeFantom').then(module => module.UnstakeFantom),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeFantomSteps').then(module => module.StakeFantomSteps),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={FANTOM_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={FANTOM_PROVIDER_ID}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
          providerId={FANTOM_PROVIDER_ID}
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

import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { SUI_STAKING_NETWORKS } from './const';

const STAKE_SUI_PATH = `${StakeRoutes.main.path}sui/`;
const STEP_STAKE_SUI_PATH = `${STAKE_SUI_PATH}:txHash/`;
const UNSTAKE_SUI_PATH = `${UNSTAKE_PATH}sui/`;
const STEP_UNSTAKE_SUI_PATH = `${UNSTAKE_SUI_PATH}:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_SUI_PATH,
      generatePath: () => {
        return generatePath(STAKE_SUI_PATH);
      },
    },

    unstake: {
      path: UNSTAKE_SUI_PATH,
      generatePath: () => {
        return generatePath(UNSTAKE_SUI_PATH);
      },
    },

    stakeStep: {
      path: STEP_STAKE_SUI_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEP_STAKE_SUI_PATH, options),
    },

    unstakeSuccess: {
      path: STEP_UNSTAKE_SUI_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEP_UNSTAKE_SUI_PATH, options),
    },
  },
  STAKE_SUI_PATH,
);

const Stake = loadComponent(() =>
  import('./screens/StakeSui').then(module => module.StakeSui),
);

const Unstake = loadComponent(() =>
  import('./screens/UnstakeSui').then(module => module.UnstakeSui),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeSuiSteps').then(module => module.StakeSuiSteps),
);

const UnstakeSuccess = loadComponent(() =>
  import('./screens/UnstakeSuiSuccess').then(
    module => module.UnstakeSuiSuccess,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={SUI_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={SUI_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={SUI_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={SUI_STAKING_NETWORKS}
          path={RoutesConfig.unstakeSuccess.path}
        >
          <DefaultLayout>
            <UnstakeSuccess />
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

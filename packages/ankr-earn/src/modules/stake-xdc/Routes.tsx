import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { XDC_STAKING_NETWORKS } from './const';

const STAKE_ROOT_PATH = `${StakeRoutes.main.path}xdc/`;
const UNSTAKE_ROOT_PATH = `${UNSTAKE_PATH}xdc/`;

const STAKE_SUCCESS_PATH = `${STAKE_ROOT_PATH}:txHash/`;
const UNSTAKE_SUCCESS_PATH = `${UNSTAKE_ROOT_PATH}:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_ROOT_PATH,
      generatePath: (): string => generatePath(STAKE_ROOT_PATH),
    },
    stakeSuccess: {
      path: STAKE_SUCCESS_PATH,
      generatePath: (txHash: string): string =>
        generatePath(STAKE_SUCCESS_PATH, { txHash }),
    },
    unstake: {
      path: UNSTAKE_ROOT_PATH,
      generatePath: (): string => generatePath(UNSTAKE_ROOT_PATH),
    },
    unstakeSuccess: {
      path: UNSTAKE_SUCCESS_PATH,
      generatePath: (txHash: string): string =>
        generatePath(UNSTAKE_SUCCESS_PATH, { txHash }),
    },
  },
  STAKE_ROOT_PATH,
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

const StakeSuccess = loadComponent(() =>
  import('./screens/StakeSuccess').then(module => module.StakeSuccess),
);

const Unstake = loadComponent(() =>
  import('./screens/Unstake').then(module => module.Unstake),
);

const UnstakeSuccess = loadComponent(() =>
  import('./screens/UnstakeSuccess').then(module => module.UnstakeSuccess),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={XDC_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={XDC_STAKING_NETWORKS}
          path={RoutesConfig.stakeSuccess.path}
        >
          <DefaultLayout>
            <StakeSuccess />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={XDC_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={XDC_STAKING_NETWORKS}
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

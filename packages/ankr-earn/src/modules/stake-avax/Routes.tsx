import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { AVAX_STAKING_NETWORKS } from './const';
import { TAvaxSyntToken } from './types';

const ROOT = `${StakeRoutes.main.path}avax/`;
const STAKE_AVAX_PATH = `${ROOT}?token=:token?`;
const STAKE_STEP_AVAX_PATH = `${ROOT}:tokenOut/:txHash/`;
const UNSTAKE_AVAX_PATH = `${UNSTAKE_PATH}avax/`;
const STEP_UNSTAKE_AVAX_PATH = `${UNSTAKE_AVAX_PATH}:token/:txHash/`;
const UNSTAKE_AVAX_BY_TOKEN_PATH = `${UNSTAKE_AVAX_PATH}?token=:token?`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TAvaxSyntToken) => {
        return token
          ? generatePath(STAKE_AVAX_PATH, { token })
          : generatePath(ROOT);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    unstake: {
      path: UNSTAKE_AVAX_PATH,
      generatePath: (token?: TAvaxSyntToken) => {
        return token
          ? generatePath(UNSTAKE_AVAX_BY_TOKEN_PATH, { token })
          : generatePath(UNSTAKE_AVAX_PATH);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    stakeSteps: {
      path: STAKE_STEP_AVAX_PATH,
      generatePath: (options: { tokenOut: TAvaxSyntToken; txHash: string }) =>
        generatePath(STAKE_STEP_AVAX_PATH, options),
    },

    unstakeSuccess: {
      path: STEP_UNSTAKE_AVAX_PATH,
      generatePath: (token: TAvaxSyntToken, txHash: string) =>
        generatePath(STEP_UNSTAKE_AVAX_PATH, { token, txHash }),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/StakeAvalanche').then(module => module.StakeAvalanche),
);

const Unstake = loadComponent(() =>
  import('./screens/UnstakeAvalanche').then(module => module.UnstakeAvalanche),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeAvalancheSteps').then(
    module => module.StakeAvalancheSteps,
  ),
);

const UnstakeSuccess = loadComponent(() =>
  import('./screens/UnstakeAvalancheSuccess').then(
    module => module.UnstakeAvalancheSuccess,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={AVAX_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={AVAX_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <DefaultLayout>
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={AVAX_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={AVAX_STAKING_NETWORKS}
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

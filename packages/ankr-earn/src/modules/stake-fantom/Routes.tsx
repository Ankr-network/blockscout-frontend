import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { FANTOM_STAKING_NETWORKS } from './const';
import { TFtmSyntToken } from './types/TFtmSyntToken';

const ROOT = `${StakeRoutes.main.path}fantom/`;
const STAKE_FANTOM_PATH = `${ROOT}?token=:token?`;
const STEP_STAKE_FANTOM_PATH = `${ROOT}:tokenOut/:txHash/`;
const UNSTAKE_FANTOM_PATH = `${UNSTAKE_PATH}fantom/`;
const UNSTAKE_FANTOM_BY_TOKEN_PATH = `${UNSTAKE_FANTOM_PATH}?token=:token?`;
const STEP_UNSTAKE_FANTOM_PATH = `${UNSTAKE_FANTOM_PATH}:token/:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TFtmSyntToken) => {
        return token
          ? generatePath(STAKE_FANTOM_PATH, { token })
          : generatePath(ROOT);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    unstake: {
      path: UNSTAKE_FANTOM_PATH,
      generatePath: (token?: TFtmSyntToken) => {
        return token
          ? generatePath(UNSTAKE_FANTOM_BY_TOKEN_PATH, { token })
          : generatePath(UNSTAKE_FANTOM_PATH);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    stakeStep: {
      path: STEP_STAKE_FANTOM_PATH,
      generatePath: (options: { txHash: string; tokenOut: TFtmSyntToken }) =>
        generatePath(STEP_STAKE_FANTOM_PATH, options),
    },

    unstakeSuccess: {
      path: STEP_UNSTAKE_FANTOM_PATH,
      generatePath: () => generatePath(STEP_UNSTAKE_FANTOM_PATH),
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

const UnstakeSuccess = loadComponent(() =>
  import('./screens/UnstakeFantomSuccess').then(
    module => module.UnstakeFantomSuccess,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
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

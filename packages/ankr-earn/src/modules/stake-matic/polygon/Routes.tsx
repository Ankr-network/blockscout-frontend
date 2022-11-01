import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { MATIC_ON_POLYGON_STAKING_NETWORKS } from 'modules/stake-matic/common/const';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

/**
 * TODO Use a common route path here (MATIC on Polygon)
 */
const ROOT = `${StakeRoutes.main.path}matic/polygon/`;
const STAKE_MATIC_PATH = `${ROOT}?token=:token?`;
const STAKE_STEP_MATIC_PATH = `${ROOT}:tokenOut/:txHash/`;
const UNSTAKE_MATIC_PATH = `${UNSTAKE_PATH}matic/polygon/`;
const STEP_UNSTAKE_MATIC_PATH = `${UNSTAKE_MATIC_PATH}:token/:txHash`;
const UNSTAKE_MATIC_BY_TOKEN_PATH = `${UNSTAKE_MATIC_PATH}?token=:token?`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TMaticSyntToken): string =>
        token ? generatePath(STAKE_MATIC_PATH, { token }) : generatePath(ROOT),
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    stakeStep: {
      path: STAKE_STEP_MATIC_PATH,
      generatePath: (tokenOut: TMaticSyntToken, txHash: string): string =>
        generatePath(STAKE_STEP_MATIC_PATH, {
          tokenOut,
          txHash,
        }),
    },

    unstake: {
      path: UNSTAKE_MATIC_PATH,
      generatePath: (token?: TMaticSyntToken): string =>
        token
          ? generatePath(UNSTAKE_MATIC_BY_TOKEN_PATH, { token })
          : generatePath(UNSTAKE_MATIC_PATH),
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    unstakeSuccess: {
      path: STEP_UNSTAKE_MATIC_PATH,
      generatePath: (token: TMaticSyntToken, txHash: string) =>
        generatePath(STEP_UNSTAKE_MATIC_PATH, { token, txHash }),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

const StakeStep = loadComponent(() =>
  import('./screens/StakeStep').then(module => module.StakeStep),
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
          availableNetworks={MATIC_ON_POLYGON_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_ON_POLYGON_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
        >
          <DefaultLayout>
            <StakeStep />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_ON_POLYGON_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_ON_POLYGON_STAKING_NETWORKS}
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

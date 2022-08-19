import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { featuresConfig, UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import {
  MATIC_ON_ETH_STAKING_NETWORKS,
  MATIC_PROVIDER_ID,
} from 'modules/stake-matic/common/const';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

/**
 * TODO Use a common route path here (MATIC on Polygon)
 */
const ETH_NETWORK_PATH = featuresConfig.maticPolygonStaking ? 'eth/' : '';

const ROOT = `${StakeRoutes.main.path}matic/${ETH_NETWORK_PATH}`;
const STAKE_MATIC_PATH = `${ROOT}?token=:token?`;
const UNSTAKE_MATIC_PATH = `${UNSTAKE_PATH}matic/${ETH_NETWORK_PATH}`;
const UNSTAKE_MATIC_BY_TOKEN_PATH = `${UNSTAKE_MATIC_PATH}?token=:token?`;
const STEP_STAKE_MATIC_PATH = `${ROOT}:tokenOut/:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TMaticSyntToken) => {
        return token
          ? generatePath(STAKE_MATIC_PATH, { token })
          : generatePath(ROOT);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },
    unstake: {
      path: UNSTAKE_MATIC_PATH,
      generatePath: (token?: TMaticSyntToken) => {
        return token
          ? generatePath(UNSTAKE_MATIC_BY_TOKEN_PATH, { token })
          : generatePath(UNSTAKE_MATIC_PATH);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },
    stakeStep: {
      path: STEP_STAKE_MATIC_PATH,
      generatePath: (tokenOut: TMaticSyntToken, txHash: string) =>
        generatePath(STEP_STAKE_MATIC_PATH, { tokenOut, txHash }),
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
          availableNetworks={MATIC_ON_ETH_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={MATIC_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_ON_ETH_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={MATIC_PROVIDER_ID}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MATIC_ON_ETH_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
          providerId={MATIC_PROVIDER_ID}
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

import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { SSV_STAKING_NETWORKS } from './const';
import { TSSVToken } from './types';

const ROOT = `${StakeRoutes.main.path}ethereum-ssv/`;
const STAKE_PATH = `${ROOT}?token=:token?`;
const STAKE_STEP_PATH = `${ROOT}:tokenOut/:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TSSVToken): string =>
        token ? generatePath(STAKE_PATH, { token }) : generatePath(ROOT),
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },
    stakeStep: {
      path: STAKE_STEP_PATH,
      generatePath: (tokenOut: TSSVToken, txHash: string): string =>
        generatePath(STAKE_STEP_PATH, {
          tokenOut,
          txHash,
        }),
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

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={SSV_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={SSV_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
        >
          <DefaultLayout>
            <StakeStep />
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

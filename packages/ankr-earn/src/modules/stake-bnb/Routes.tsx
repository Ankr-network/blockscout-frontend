import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { BINANCE_WRITE_PROVIDER_ID, BNB_STAKING_NETWORKS } from './const';
import { TBnbSyntToken } from './types';

const ROOT = `${StakeRoutes.main.path}bnb/`;
const STAKE_BNB_PATH = `${ROOT}?token=:token?`;
const STEP_STAKE_BNB_PATH = `${ROOT}:tokenOut/:txHash/`;
const UNSTAKE_BNB_PATH = `${UNSTAKE_PATH}bnb/`;
const UNSTAKE_BNB_BY_TOKEN_PATH = `${UNSTAKE_BNB_PATH}?token=:token?`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TBnbSyntToken) => {
        return token
          ? generatePath(STAKE_BNB_PATH, { token })
          : generatePath(ROOT);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    unstake: {
      path: UNSTAKE_BNB_PATH,
      generatePath: (token?: TBnbSyntToken) => {
        return token
          ? generatePath(UNSTAKE_BNB_BY_TOKEN_PATH, { token })
          : generatePath(UNSTAKE_BNB_PATH);
      },
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },

    stakeSteps: {
      path: STEP_STAKE_BNB_PATH,
      generatePath: () => generatePath(STEP_STAKE_BNB_PATH),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/StakeBinance').then(module => module.StakeBinance),
);

const Unstake = loadComponent(() =>
  import('./screens/UnstakeBinance').then(module => module.UnstakeBinance),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeBinanceSteps').then(
    module => module.StakeBinanceSteps,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={BINANCE_WRITE_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={BINANCE_WRITE_PROVIDER_ID}
        >
          <DefaultLayout>
            <Unstake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
          providerId={BINANCE_WRITE_PROVIDER_ID}
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

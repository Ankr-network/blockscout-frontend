import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { BNB_STAKING_NETWORKS } from './const';
import { TBnbSyntToken } from './types';

const ROOT = `${StakeRoutes.main.path}bnb/`;
const STAKE_BNB_PATH = `${ROOT}?token=:token?`;
const STEP_STAKE_BNB_PATH = `${ROOT}:tokenOut/:txHash/`;
const UNSTAKE_BNB_PATH = `${UNSTAKE_PATH}bnb/`;
const STEP_UNSTAKE_BNB_PATH = `${UNSTAKE_BNB_PATH}:token/:txHash`;
const STEP_FLASH_UNSTAKE_BNB_PATH = `${UNSTAKE_BNB_PATH}instant/:token/:txHash`;
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

    unstakeSuccess: {
      path: STEP_UNSTAKE_BNB_PATH,
      generatePath: (token: TBnbSyntToken, txHash: string) =>
        generatePath(STEP_UNSTAKE_BNB_PATH, { token, txHash }),
    },

    flashUnstakeSuccess: {
      path: STEP_FLASH_UNSTAKE_BNB_PATH,
      generatePath: (token: TBnbSyntToken, txHash: string) =>
        generatePath(STEP_FLASH_UNSTAKE_BNB_PATH, { token, txHash }),
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

const UnstakeSuccess = loadComponent(() =>
  import('./screens/UnstakeBinanceSuccess').then(
    module => module.UnstakeBinanceSuccess,
  ),
);

const FlashUnstakeSuccess = loadComponent(() =>
  import('./screens/FlashUnstakeBinanceSuccess').then(
    module => module.FlashUnstakeBinanceSuccess,
  ),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <DefaultLayout>
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.unstakeSuccess.path}
        >
          <DefaultLayout>
            <UnstakeSuccess />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={RoutesConfig.flashUnstakeSuccess.path}
        >
          <DefaultLayout>
            <FlashUnstakeSuccess />
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

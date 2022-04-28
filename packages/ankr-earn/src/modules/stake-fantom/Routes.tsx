import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { FANTOM_PROVIDER_ID, FANTOM_STAKING_NETWORKS } from './const';
import { TFtmSyntToken } from './types/TFtmSyntToken';

const ROOT = `${StakeRoutes.main.path}fantom/`;
const STAKE_FANTOM_PATH = `${ROOT}?token=:token?`;
const UNSTAKE_FANTOM_PATH = `${UNSTAKE_PATH}fantom/`;
const UNSTAKE_FANTOM_BY_TOKEN_PATH = `${UNSTAKE_FANTOM_PATH}?token=:token?`;
const STEP_STAKE_FANTOM_PATH = `${ROOT}:txHash/:tokenOut/`;

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

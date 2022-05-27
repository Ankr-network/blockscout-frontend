import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { AVALANCHE_WRITE_PROVIDER_ID, AVAX_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}avax/`;
const UNSTAKE_AVAX_PATH = `${UNSTAKE_PATH}avax/`;
const STAKE_AVAX_PATH = ROOT;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_AVAX_PATH,
      generatePath: () => generatePath(STAKE_AVAX_PATH),
    },
    unstake: {
      path: UNSTAKE_AVAX_PATH,
      generatePath: () => generatePath(UNSTAKE_AVAX_PATH),
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

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={AVAX_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={AVALANCHE_WRITE_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={AVAX_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={AVALANCHE_WRITE_PROVIDER_ID}
        >
          <DefaultLayout>
            <Unstake />
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

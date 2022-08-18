import { Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { getRoutes as getStakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { getRoutes as getStakeMaticPolygonRoutes } from 'modules/stake-matic/polygon/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import {
  MATIC_ON_ETH_STAKING_NETWORKS,
  MATIC_ON_POLYGON_STAKING_NETWORKS,
  MATIC_PROVIDER_ID,
} from './const';

const ROOT = `${StakeRoutes.main.path}matic/`;
const UNSTAKE_MATIC_PATH = `${UNSTAKE_PATH}matic/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
    },
    unstake: {
      path: UNSTAKE_MATIC_PATH,
    },
  },
  ROOT,
);

const NetworkChooser = loadComponent(() =>
  import('./screens/NetworkChooser').then(module => module.NetworkChooser),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.stake.path, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={[
            ...MATIC_ON_ETH_STAKING_NETWORKS,
            ...MATIC_ON_POLYGON_STAKING_NETWORKS,
          ]}
          path={RoutesConfig.stake.path}
          providerId={MATIC_PROVIDER_ID}
        >
          <NetworkChooser />
        </GuardETHRoute>

        {getStakeMaticEthRoutes()}

        {getStakeMaticPolygonRoutes()}

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

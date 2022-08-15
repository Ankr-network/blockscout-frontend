import { Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { getRoutes as getStakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { getRoutes as getStakeMaticPolygonRoutes } from 'modules/stake-matic/polygon/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

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
        <Route exact path={RoutesConfig.stake.path}>
          <NetworkChooser />
        </Route>

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

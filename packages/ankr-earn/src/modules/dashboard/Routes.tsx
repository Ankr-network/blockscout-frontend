import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  GNO_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
  STAKING_PATH,
  XDC_NETWORK_BY_ENV,
} from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}dashboard/`;

const Dashboard = loadComponent(() =>
  import('./screens/Dashboard').then(module => module.Dashboard),
);

export const RoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
  },
  ROOT,
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={[
            ETH_NETWORK_BY_ENV,
            AVAX_NETWORK_BY_ENV,
            BSC_NETWORK_BY_ENV,
            FTM_NETWORK_BY_ENV,
            POLYGON_NETWORK_BY_ENV,
            GNO_NETWORK_BY_ENV,
            XDC_NETWORK_BY_ENV,
          ]}
          isOpenConnectInstantly={false}
          path={RoutesConfig.dashboard.path}
        >
          <DefaultLayout>
            <Dashboard />
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

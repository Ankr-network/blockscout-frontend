import compact from 'lodash/compact';
import { generatePath } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  STAKING_PATH,
} from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}switch/`;
const SUCCESS = `${ROOT}:from/:to/:txHash`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
    success: {
      path: SUCCESS,
      generatePath: () => generatePath(SUCCESS),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

const TransactionStep = loadComponent(() =>
  import('./screens/TransactionStep').then(module => module.TransactionStep),
);

const AVAILABLE_NETWORKS = compact([
  ETH_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  AVAX_NETWORK_BY_ENV,
]);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.main.path}>
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </Route>

        <GuardETHRoute
          exact
          availableNetworks={AVAILABLE_NETWORKS}
          isOpenedConnectModal={false}
          path={RoutesConfig.success.path}
        >
          <DefaultLayout>
            <TransactionStep />
          </DefaultLayout>
        </GuardETHRoute>
      </Switch>
    </Route>
  );
}

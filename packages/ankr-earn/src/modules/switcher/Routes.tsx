import compact from 'lodash/compact';
import { generatePath } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { AvailableWriteProviders } from 'provider';

import { GuardRoute } from 'modules/auth/common/components/GuardRoute';
import {
  BSC_NETWORK_BY_ENV,
  STAKING_PATH,
  ETH_NETWORK_BY_ENV,
  featuresConfig,
  FTM_NETWORK_BY_ENV,
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
  featuresConfig.switcherFantom && FTM_NETWORK_BY_ENV,
]);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <GuardRoute
          exact
          availableNetworks={AVAILABLE_NETWORKS}
          path={RoutesConfig.main.path}
          providerId={AvailableWriteProviders.ethCompatible}
        >
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={AVAILABLE_NETWORKS}
          path={RoutesConfig.success.path}
          providerId={AvailableWriteProviders.ethCompatible}
        >
          <DefaultLayout>
            <TransactionStep />
          </DefaultLayout>
        </GuardRoute>
      </Switch>
    </Route>
  );
}

import loadable from '@loadable/component';
import { generatePath } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { AvailableWriteProviders } from 'provider';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import {
  EARN_PATH,
  ETH_NETWORK_BY_ENV,
  featuresConfig,
} from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

const ROOT = `${EARN_PATH}switch/`;
const SUCCESS = `${ROOT}success/:txHash/:swapOption`;

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

const Main = loadable(
  async () => import('./screens/Main').then(module => module.Main),
  { fallback: <QueryLoadingAbsolute /> },
);

const Success = loadable(
  async () => import('./screens/Success').then(module => module.Success),
  { fallback: <QueryLoadingAbsolute /> },
);

const TransactionStep = loadable(
  async () =>
    import('./screens/TransactionStep').then(module => module.TransactionStep),
  { fallback: <QueryLoadingAbsolute /> },
);

const AVAILABLE_NETWORKS = [ETH_NETWORK_BY_ENV];

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

        {featuresConfig.progressStep && (
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
        )}

        {!featuresConfig.progressStep && (
          <GuardRoute
            exact
            availableNetworks={AVAILABLE_NETWORKS}
            path={RoutesConfig.success.path}
            providerId={AvailableWriteProviders.ethCompatible}
          >
            <DefaultLayout>
              <Success />
            </DefaultLayout>
          </GuardRoute>
        )}
      </Switch>
    </Route>
  );
}

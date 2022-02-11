import loadable from '@loadable/component';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { EARN_PATH, ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { AvailableWriteProviders } from 'provider/providerManager/types';
import { generatePath } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

const ROOT = `${EARN_PATH}eth2-swap/`;
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

const AVAILABLE_NETWORKS = [ETH_NETWORK_BY_ENV];

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <GuardRoute
          availableNetworks={AVAILABLE_NETWORKS}
          providerId={AvailableWriteProviders.ethCompatible}
          path={RoutesConfig.main.path}
          exact
        >
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          availableNetworks={AVAILABLE_NETWORKS}
          providerId={AvailableWriteProviders.ethCompatible}
          path={RoutesConfig.success.path}
          exact
        >
          <DefaultLayout>
            <Success />
          </DefaultLayout>
        </GuardRoute>
      </Switch>
    </Route>
  );
}

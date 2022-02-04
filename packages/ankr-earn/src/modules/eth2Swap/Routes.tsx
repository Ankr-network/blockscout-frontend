import loadable from '@loadable/component';
import { generatePath } from 'react-router';
import { Switch } from 'react-router-dom';

import { currentEnv, EARN_PATH } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import {
  AvailableProviders,
  BlockchainNetworkId,
} from 'provider/providerManager/types';

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

const AVAILABLE_NETWORKS = [
  currentEnv === Env.Production
    ? BlockchainNetworkId.mainnet
    : BlockchainNetworkId.goerli,
];

export function getRoutes() {
  return (
    <Switch>
      <GuardRoute
        availableNetworks={AVAILABLE_NETWORKS}
        providerId={AvailableProviders.ethCompatible}
        path={RoutesConfig.main.path}
        exact
      >
        <DefaultLayout>
          <Main />
        </DefaultLayout>
      </GuardRoute>

      <GuardRoute
        availableNetworks={AVAILABLE_NETWORKS}
        providerId={AvailableProviders.ethCompatible}
        path={RoutesConfig.success.path}
        exact
      >
        <DefaultLayout>
          <Success />
        </DefaultLayout>
      </GuardRoute>
    </Switch>
  );
}

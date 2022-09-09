import { generatePath, Route, Switch } from 'react-router-dom';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
  STAKING_PATH,
} from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}calc/`;

const AVAILABLE_NETWORKS = [
  ETH_NETWORK_BY_ENV,
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  POLYGON_NETWORK_BY_ENV,
];

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

export const RoutesConfig = createRouteConfig(
  {
    main: {
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
          availableNetworks={AVAILABLE_NETWORKS}
          path={ROOT}
          providerId={AvailableWriteProviders.ethCompatible}
        >
          <DefaultLayout>
            <Main />
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

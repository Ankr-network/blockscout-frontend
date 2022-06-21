import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ANKR_PROVIDER_ID, ANKR_STAKING_NETWORKS } from './const';

const ROOT = `${STAKING_PATH}ankr-stake/`;
const ANKR_PROVIDERS_PATH = `${ROOT}providers/`;
const STAKE_PATH = `${ROOT}stake/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },

    providers: {
      path: ANKR_PROVIDERS_PATH,
      generatePath: () => generatePath(ANKR_PROVIDERS_PATH),
    },

    stake: {
      path: STAKE_PATH,
      generatePath: () => generatePath(STAKE_PATH),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

const Providers = loadComponent(() =>
  import('./screens/Providers').then(module => module.Providers),
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        {/* todo: add guard route */}

        <Route exact path={RoutesConfig.main.path}>
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </Route>

        <Route exact path={RoutesConfig.providers.path}>
          <DefaultLayout>
            <Providers />
          </DefaultLayout>
        </Route>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
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

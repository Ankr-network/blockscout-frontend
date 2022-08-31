import { generatePath, Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { ETH_PROVIDER_ID, ETH_STAKING_NETWORKS } from 'modules/stake-eth/const';

const ROOT = `/test/`;
const TEST_STAKE_PATH = `${ROOT}eth-stake-without-claim/`;
const NOTIFICATIONS_PATH = `${ROOT}notifications/`;
const ANKR_FAUCET_PATH = `${ROOT}ankr-faucet/`;
const DEV_PATH = `${ROOT}dev/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },

    stakeWithoutClaim: {
      path: TEST_STAKE_PATH,
      generatePath: () => generatePath(TEST_STAKE_PATH),
    },

    notifications: {
      path: NOTIFICATIONS_PATH,
      generatePath: () => generatePath(NOTIFICATIONS_PATH),
    },

    ankrFaucet: {
      path: ANKR_FAUCET_PATH,
      generatePath: () => generatePath(ANKR_FAUCET_PATH),
    },

    /**
     * temporary added for https://ankrnetwork.atlassian.net/browse/STAKAN-1810
     */
    devPage: {
      path: DEV_PATH,
      generatePath: () => generatePath(DEV_PATH),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

const TestingStake = loadComponent(() =>
  import('./screens/StakeWithoutClaim').then(
    module => module.StakeWithoutClaim,
  ),
);

const Notifications = loadComponent(() =>
  import('./screens/Notifications').then(module => module.Notifications),
);

const AnkrFaucet = loadComponent(() =>
  import('./screens/AnkrFaucet').then(module => module.AnkrFaucet),
);

const DevPage = loadComponent(() =>
  import('./screens/DevPage').then(module => module.DevPage),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.main.path}>
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </Route>

        <Route exact path={RoutesConfig.devPage.path}>
          <DefaultLayout>
            <DevPage />
          </DefaultLayout>
        </Route>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.stakeWithoutClaim.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <TestingStake />
          </DefaultLayout>
        </GuardETHRoute>

        <Route exact path={RoutesConfig.notifications.path}>
          <DefaultLayout>
            <Notifications />
          </DefaultLayout>
        </Route>

        <GuardETHRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.ankrFaucet.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <AnkrFaucet />
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

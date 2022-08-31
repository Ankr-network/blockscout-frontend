import { generatePath, Route, Switch } from 'react-router';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

import { MGNO_PROVIDER_ID, MGNO_STAKING_NETWORKS } from './const';

const ROOT = `/mgno-stake/`;
const STAKE_PATH = `${ROOT}stake/`;
const STAKE_WITH_PROVIDER_PATH = `${STAKE_PATH}?provider=:provider?`;
const STEPS_STAKE_PATH = `${STAKE_PATH}steps/:txHash/`;
const PROVIDERS_PATH = `${ROOT}providers/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },

    providers: {
      path: PROVIDERS_PATH,
      generatePath: () => generatePath(PROVIDERS_PATH),
    },

    stake: {
      path: STAKE_PATH,
      generatePath: (provider?: string) => {
        return provider
          ? generatePath(STAKE_WITH_PROVIDER_PATH, { provider })
          : generatePath(STAKE_PATH);
      },
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    stakeSteps: {
      path: STEPS_STAKE_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_STAKE_PATH, options),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeSteps').then(module => module.StakeSteps),
);

const Providers = loadComponent(() =>
  import('./screens/Providers').then(module => module.Providers),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={MGNO_STAKING_NETWORKS}
          path={RoutesConfig.main.path}
          providerId={MGNO_PROVIDER_ID}
        >
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MGNO_STAKING_NETWORKS}
          path={RoutesConfig.providers.path}
          providerId={MGNO_PROVIDER_ID}
        >
          <DefaultLayout>
            <Providers />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MGNO_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={MGNO_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={MGNO_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
          providerId={MGNO_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>
      </Switch>
    </Route>
  );
}

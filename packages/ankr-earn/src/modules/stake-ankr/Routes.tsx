import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ANKR_PROVIDER_ID, ANKR_STAKING_NETWORKS } from './const';

const ROOT = `${STAKING_PATH}ankr-stake/`;
const ANKR_PROVIDERS_PATH = `${ROOT}providers/`;
const STAKE_PATH = `${ROOT}stake/`;
const STAKE_MORE_PATH = `${ROOT}stake-more/`;
const STAKE_MORE_WITH_PROVIDER_PATH = `${STAKE_MORE_PATH}?provider=:provider?`;
const RESTAKE_PATH = `${ROOT}restake/`;
const RESTAKE_WITH_PROVIDER_PATH = `${RESTAKE_PATH}?provider=:provider?`;
const CLAIM_PATH = `${ROOT}claim/`;
const CLAIM_WITH_PROVIDER_PATH = `${CLAIM_PATH}?provider=:provider?`;
const UNSTAKE_PATH = `${ROOT}unstake/`;
const UNSTAKE_WITH_PROVIDER_PATH = `${UNSTAKE_PATH}?provider=:provider?`;
const STAKE_WITH_PROVIDER_PATH = `${STAKE_PATH}?provider=:provider?`;
const STEPS_STAKE_PATH = `${STAKE_PATH}steps/:txHash/`;
const STEPS_STAKE_MORE_PATH = `${STAKE_MORE_PATH}steps/:txHash/`;
const SELECT_PROVIDER_PATH = `${STAKE_PATH}select-provider/`;

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
      generatePath: () => generatePath(STEPS_STAKE_PATH),
    },

    stakeMore: {
      path: STAKE_MORE_PATH,
      generatePath: (provider: string) =>
        generatePath(STAKE_MORE_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    stakeMoreSteps: {
      path: STEPS_STAKE_MORE_PATH,
      generatePath: () => generatePath(STEPS_STAKE_MORE_PATH),
    },

    restake: {
      path: RESTAKE_PATH,
      generatePath: (provider: string) =>
        generatePath(RESTAKE_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    claim: {
      path: CLAIM_PATH,
      generatePath: (provider: string) =>
        generatePath(CLAIM_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    unstake: {
      path: UNSTAKE_PATH,
      generatePath: (provider: string) =>
        generatePath(UNSTAKE_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    selectProvider: {
      path: SELECT_PROVIDER_PATH,
      generatePath: () => generatePath(SELECT_PROVIDER_PATH),
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

const Restake = loadComponent(() =>
  import('./screens/Restake').then(module => module.Restake),
);

const Claim = loadComponent(() =>
  import('./screens/Claim').then(module => module.Claim),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeSteps').then(module => module.StakeSteps),
);

const StakeMore = loadComponent(() =>
  import('./screens/StakeMore').then(module => module.StakeMore),
);

const Unstake = loadComponent(() =>
  import('./screens/Unstake').then(module => module.Unstake),
);

const SelectProvider = loadComponent(() =>
  import('./screens/SelectProvider').then(module => module.SelectProvider),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.main.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.providers.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <Providers />
          </DefaultLayout>
        </GuardETHRoute>

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

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.stakeMore.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeMore />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.restake.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <Restake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claim.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <Claim />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={[
            RoutesConfig.stakeSteps.path,
            RoutesConfig.stakeMoreSteps.path,
          ]}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <Unstake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.selectProvider.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <SelectProvider />
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

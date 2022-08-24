import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

import { ANKR_PROVIDER_ID, ANKR_STAKING_NETWORKS } from './const';

const ROOT = `${STAKING_PATH}ankr-stake/`;
const ANKR_PROVIDERS_PATH = `${ROOT}providers/`;
const STAKE_PATH = `${ROOT}stake/`;
const RESTAKE_PATH = `${ROOT}restake/`;
const RESTAKE_WITH_PROVIDER_PATH = `${RESTAKE_PATH}?provider=:provider?`;
const CLAIM_ALL_UNSTAKES_PATH = `${ROOT}claim-all-unstakes/`;
const CLAIM_UNSTAKES_PATH = `${ROOT}claim-unstakes/`;
const CLAIM_UNSTAKES_WITH_PROVIDER_PATH = `${CLAIM_UNSTAKES_PATH}?provider=:provider?`;
const CLAIM_ALL_REWARDS_PATH = `${ROOT}claim-all-rewards/`;
const CLAIM_REWARDS_PATH = `${ROOT}claim-rewards/`;
const CLAIM_REWARDS_WITH_PROVIDER_PATH = `${CLAIM_REWARDS_PATH}?provider=:provider?`;
const UNSTAKE_PATH = `${ROOT}unstake/`;
const UNSTAKE_WITH_PROVIDER_PATH = `${UNSTAKE_PATH}?provider=:provider?`;
const STAKE_WITH_PROVIDER_PATH = `${STAKE_PATH}?provider=:provider?`;
const STEPS_STAKE_PATH = `${STAKE_PATH}steps/:txHash/`;
const STEPS_UNSTAKE_PATH = `${UNSTAKE_PATH}steps/:txHash/`;
const STEPS_CLAIM_UNSTAKES_PATH = `${CLAIM_UNSTAKES_PATH}steps/:txHash/`;
const STEPS_CLAIM_REWARDS_PATH = `${CLAIM_REWARDS_PATH}steps/:txHash/`;
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
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_STAKE_PATH, options),
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

    claimUnstakes: {
      path: CLAIM_UNSTAKES_PATH,
      generatePath: (provider: string) =>
        generatePath(CLAIM_UNSTAKES_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    claimAllUnstakes: {
      path: CLAIM_ALL_UNSTAKES_PATH,
      generatePath: () => generatePath(CLAIM_ALL_UNSTAKES_PATH),
    },

    claimRewards: {
      path: CLAIM_REWARDS_PATH,
      generatePath: (provider: string) =>
        generatePath(CLAIM_REWARDS_WITH_PROVIDER_PATH, { provider }),
      useParams: () => {
        const queryProvider = useQueryParams().get('provider');

        return {
          provider: queryProvider ?? undefined,
        };
      },
    },

    claimAllRewards: {
      path: CLAIM_ALL_REWARDS_PATH,
      generatePath: () => generatePath(CLAIM_ALL_REWARDS_PATH),
    },

    claimUnstakesSteps: {
      path: STEPS_CLAIM_UNSTAKES_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_CLAIM_UNSTAKES_PATH, options),
    },

    claimRewardsSteps: {
      path: STEPS_CLAIM_REWARDS_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_CLAIM_REWARDS_PATH, options),
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

    unstakeSteps: {
      path: STEPS_UNSTAKE_PATH,
      generatePath: (options: { txHash: string }) =>
        generatePath(STEPS_UNSTAKE_PATH, options),
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

const ClaimUnstakes = loadComponent(() =>
  import('./screens/ClaimUnstakes').then(module => module.ClaimUnstakes),
);

const ClaimAllUnstakes = loadComponent(() =>
  import('./screens/ClaimAllUnstakes').then(module => module.ClaimAllUnstakes),
);

const ClaimRewards = loadComponent(() =>
  import('./screens/ClaimRewards').then(module => module.ClaimRewards),
);

const ClaimAllRewards = loadComponent(() =>
  import('./screens/ClaimAllRewards').then(module => module.ClaimAllRewards),
);

const ClaimSteps = loadComponent(() =>
  import('./screens/ClaimSteps').then(module => module.ClaimSteps),
);

const StakeSteps = loadComponent(() =>
  import('./screens/StakeSteps').then(module => module.StakeSteps),
);

const UnstakeSteps = loadComponent(() =>
  import('./screens/UnstakeSteps').then(module => module.UnstakeSteps),
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
          path={RoutesConfig.claimUnstakes.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <ClaimUnstakes />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimAllUnstakes.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <ClaimAllUnstakes />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimRewards.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <ClaimRewards />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimAllRewards.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <ClaimAllRewards />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <StakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.unstakeSteps.path}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <UnstakeSteps />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={[
            RoutesConfig.claimRewardsSteps.path,
            RoutesConfig.claimUnstakesSteps.path,
          ]}
          providerId={ANKR_PROVIDER_ID}
        >
          <DefaultLayout>
            <ClaimSteps />
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

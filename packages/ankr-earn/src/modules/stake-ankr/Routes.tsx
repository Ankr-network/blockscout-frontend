import { Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { TimerWorker } from './components/TimerWorker';
import { ANKR_PROVIDER_ID, ANKR_STAKING_NETWORKS } from './const';
import { RoutesConfig } from './RoutesConfig';

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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
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

            <TimerWorker />
          </DefaultLayout>
        </GuardETHRoute>

        <Route>
          <DefaultLayout>
            <PageNotFound />

            <TimerWorker />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

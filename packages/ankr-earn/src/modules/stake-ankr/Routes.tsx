import { Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { TimerWorker } from './components/TimerWorker';
import { ANKR_STAKING_NETWORKS } from './const';
import { RoutesConfig } from './RoutesConfig';
import { MigrationGuard } from './screens/MigrationGuard';

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
        >
          <MigrationGuard>
            <Main />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.providers.path}
        >
          <MigrationGuard>
            <Providers />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <MigrationGuard>
            <Stake />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.restake.path}
        >
          <MigrationGuard>
            <Restake />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimUnstakes.path}
        >
          <MigrationGuard>
            <ClaimUnstakes />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimAllUnstakes.path}
        >
          <MigrationGuard>
            <ClaimAllUnstakes />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimRewards.path}
        >
          <MigrationGuard>
            <ClaimRewards />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.claimAllRewards.path}
        >
          <MigrationGuard>
            <ClaimAllRewards />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.stakeSteps.path}
        >
          <MigrationGuard>
            <StakeSteps />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.unstakeSteps.path}
        >
          <MigrationGuard>
            <UnstakeSteps />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={[
            RoutesConfig.claimRewardsSteps.path,
            RoutesConfig.claimUnstakesSteps.path,
          ]}
        >
          <MigrationGuard>
            <ClaimSteps />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
        >
          <MigrationGuard>
            <Unstake />

            <TimerWorker />
          </MigrationGuard>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={ANKR_STAKING_NETWORKS}
          path={RoutesConfig.selectProvider.path}
        >
          <MigrationGuard>
            <SelectProvider />

            <TimerWorker />
          </MigrationGuard>
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

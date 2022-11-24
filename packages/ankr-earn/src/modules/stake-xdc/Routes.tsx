import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

import { XDC_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}xdc/`;
const STAKE_STEP_PATH = `${ROOT}:txHash/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (): string => generatePath(ROOT),
    },
    stakeStep: {
      path: STAKE_STEP_PATH,
      generatePath: (txHash: string): string =>
        generatePath(STAKE_STEP_PATH, { txHash }),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

const StakeStep = loadComponent(() =>
  import('./screens/StakeStep').then(module => module.StakeStep),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={XDC_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardETHRoute>

        <GuardETHRoute
          exact
          availableNetworks={XDC_STAKING_NETWORKS}
          path={RoutesConfig.stakeStep.path}
        >
          <DefaultLayout>
            <StakeStep />
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

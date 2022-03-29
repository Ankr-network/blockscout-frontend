import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { UNSTAKE_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { FANTOM_PROVIDER_ID, FANTOM_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}fantom/`;
const STAKE_FANTOM_PATH = ROOT;
const UNSTAKE_FANTOM_PATH = `${UNSTAKE_PATH}fantom/`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_FANTOM_PATH,
      generatePath: () => generatePath(STAKE_FANTOM_PATH),
    },
    unstake: {
      path: UNSTAKE_FANTOM_PATH,
      generatePath: () => generatePath(UNSTAKE_FANTOM_PATH),
    },
  },
  ROOT,
);

const Stake = loadable(
  async () =>
    import('./screens/StakeFantom').then(module => module.StakeFantom),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const Unstake = loadable(
  async () =>
    import('./screens/UnstakeFantom').then(module => module.UnstakeFantom),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={FANTOM_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          exact
          availableNetworks={FANTOM_STAKING_NETWORKS}
          path={RoutesConfig.unstake.path}
          providerId={FANTOM_PROVIDER_ID}
        >
          <DefaultLayout verticalAlign="center">
            <Unstake />
          </DefaultLayout>
        </GuardRoute>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

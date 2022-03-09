import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { featuresConfig, UNSTAKE_PATH } from 'modules/common/const';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { AVALANCHE_WRITE_PROVIDER_ID, AVAX_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}avax/`;
const UNSTAKE_AVAX_PATH = `${UNSTAKE_PATH}avax/`;
const STAKE_AVAX_PATH = ROOT;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_AVAX_PATH,
      generatePath: () => generatePath(STAKE_AVAX_PATH),
    },
    unstake: {
      path: UNSTAKE_AVAX_PATH,
      generatePath: () => generatePath(UNSTAKE_AVAX_PATH),
    },
  },
  ROOT,
);

const Stake = loadable(
  () =>
    import('./screens/StakeAvalanche').then(module => module.StakeAvalanche),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const Unstake = loadable(
  () =>
    import('./screens/UnstakeAvalanche').then(
      module => module.UnstakeAvalanche,
    ),
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
          availableNetworks={AVAX_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={AVALANCHE_WRITE_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        {featuresConfig.isActiveAVAXUnstaking && (
          <GuardRoute
            exact
            availableNetworks={AVAX_STAKING_NETWORKS}
            path={RoutesConfig.unstake.path}
            providerId={AVALANCHE_WRITE_PROVIDER_ID}
          >
            <DefaultLayout>
              <Unstake />
            </DefaultLayout>
          </GuardRoute>
        )}

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

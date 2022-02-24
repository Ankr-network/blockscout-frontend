import loadable from '@loadable/component';
import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { createRouteConfig } from '../router/utils/createRouteConfig';

import { ETH_PROVIDER_ID, ETH_STAKING_NETWORKS } from './const';

const ROOT = `${StakeRoutes.main.path}ethereum/`;
const STAKE_ETH_PATH = ROOT;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_ETH_PATH,
      generatePath: () => generatePath(STAKE_ETH_PATH),
    },
  },
  ROOT,
);

const Stake = loadable(
  async () =>
    import('./screens/StakeEthereum').then(module => module.StakeEthereum),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardRoute
          exact
          availableNetworks={ETH_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={ETH_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
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

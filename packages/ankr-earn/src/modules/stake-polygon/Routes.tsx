import loadable from '@loadable/component';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { currentEnv, UNSTAKE_PATH } from 'modules/common/const';
import { BlockchainNetworkId, Env } from 'modules/common/types';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';
import { POLYGON_PROVIDER_ID } from './const';

const ROOT = `${StakeRoutes.main.path}/MATIC`;
const STAKE_MATIC_PATH = ROOT;
const UNSTAKE_MATIC_PATH = `${UNSTAKE_PATH}/MATIC`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: STAKE_MATIC_PATH,
      generatePath: () => generatePath(STAKE_MATIC_PATH),
    },
    unstake: {
      path: UNSTAKE_MATIC_PATH,
      generatePath: () => generatePath(UNSTAKE_MATIC_PATH),
    },
  },
  ROOT,
);

const Stake = loadable(
  async () =>
    import('./screens/StakePolygon').then(module => module.StakePolygon),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

const Unstake = loadable(
  async () =>
    import('./screens/UnstakePolygon').then(module => module.UnstakePolygon),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function getRoutes() {
  const availableNetworks = [
    currentEnv === Env.Production
      ? BlockchainNetworkId.mainnet
      : BlockchainNetworkId.goerli,
  ];
  return (
    <Route path={[RoutesConfig.root, RoutesConfig.unstake.path]}>
      <Switch>
        <GuardRoute
          providerId={POLYGON_PROVIDER_ID}
          path={RoutesConfig.stake.path}
          availableNetworks={availableNetworks}
          exact
        >
          <DefaultLayout>
            <Stake />
          </DefaultLayout>
        </GuardRoute>

        <GuardRoute
          providerId={POLYGON_PROVIDER_ID}
          path={RoutesConfig.unstake.path}
          availableNetworks={availableNetworks}
          exact
        >
          <DefaultLayout>
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

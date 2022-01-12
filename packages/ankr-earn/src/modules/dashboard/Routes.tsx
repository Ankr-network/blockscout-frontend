import loadable from '@loadable/component';
import { GuardRoute } from 'modules/auth/components/GuardRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { currentEnv } from 'modules/common/const';
import { BlockchainNetworkId, Env } from 'modules/common/types';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';
import { generatePath, Route, Switch } from 'react-router-dom';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `/dashboard`;

const Dashboard = loadable(
  async () => import('./screens/Dashboard').then(module => module.Dashboard),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export const RoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
  },
  ROOT,
);

export function getRoutes() {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <GuardRoute
          exact
          openConnectInstantly
          providerId={POLYGON_PROVIDER_ID}
          availableNetworks={[
            currentEnv === Env.Production
              ? BlockchainNetworkId.mainnet
              : BlockchainNetworkId.goerli,
          ]}
          path={ROOT}
        >
          <DefaultLayout>
            <Dashboard />
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

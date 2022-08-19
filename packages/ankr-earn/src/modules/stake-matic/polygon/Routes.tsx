import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import {
  MATIC_ON_POLYGON_STAKING_NETWORKS,
  MATIC_PROVIDER_ID,
} from 'modules/stake-matic/common/const';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

/**
 * TODO Use a common route path here (MATIC on Polygon)
 */
const ROOT = `${StakeRoutes.main.path}matic/polygon/`;
const STAKE_MATIC_PATH = `${ROOT}?token=:token?`;

export const RoutesConfig = createRouteConfig(
  {
    stake: {
      path: ROOT,
      generatePath: (token?: TMaticSyntToken) =>
        token ? generatePath(STAKE_MATIC_PATH, { token }) : generatePath(ROOT),
      useParams: () => ({
        token: useQueryParams().get('token') ?? undefined,
      }),
    },
  },
  ROOT,
);

const Stake = loadComponent(() =>
  import('./screens/Stake').then(module => module.Stake),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.root]}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={MATIC_ON_POLYGON_STAKING_NETWORKS}
          path={RoutesConfig.stake.path}
          providerId={MATIC_PROVIDER_ID}
        >
          <DefaultLayout>
            <Stake />
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

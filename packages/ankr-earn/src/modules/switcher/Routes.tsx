import compact from 'lodash/compact';
import { generatePath } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import {
  AVAX_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  STAKING_PATH,
} from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}switch/`;
const SWITCH_PATH = `${ROOT}?from=:from`;
const SUCCESS = `${ROOT}:from/:to/:txHash`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: (from?: string) => {
        if (from) {
          return generatePath(SWITCH_PATH, { from });
        }
        return generatePath(ROOT);
      },
      useParams: () => {
        const queryParams = useQueryParams();

        return {
          from: queryParams.get('from'),
        };
      },
    },
    success: {
      path: SUCCESS,
      generatePath: () => generatePath(SUCCESS),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

const TransactionStep = loadComponent(() =>
  import('./screens/TransactionStep').then(module => module.TransactionStep),
);

const AVAILABLE_NETWORKS = compact([
  ETH_NETWORK_BY_ENV,
  BSC_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
  AVAX_NETWORK_BY_ENV,
]);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.main.path}>
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </Route>

        <GuardETHRoute
          exact
          availableNetworks={AVAILABLE_NETWORKS}
          isOpenConnectInstantly={false}
          path={RoutesConfig.success.path}
        >
          <DefaultLayout>
            <TransactionStep />
          </DefaultLayout>
        </GuardETHRoute>
      </Switch>
    </Route>
  );
}

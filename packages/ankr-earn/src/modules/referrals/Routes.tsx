import { generatePath, Route, Switch } from 'react-router-dom';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import {
  BINANCE_WRITE_PROVIDER_ID,
  BNB_STAKING_NETWORKS,
} from 'modules/stake-bnb/const';

import { ReferralGuard } from './components/ReferralGuard';

const ROOT = `${STAKING_PATH}referrals/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
  },
  ROOT,
);

const Main = loadComponent(() =>
  import('./screens/Main').then(module => module.Main),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <GuardETHRoute
          exact
          availableNetworks={BNB_STAKING_NETWORKS}
          path={ROOT}
          providerId={BINANCE_WRITE_PROVIDER_ID}
        >
          <ReferralGuard>
            <DefaultLayout>
              <Main />
            </DefaultLayout>
          </ReferralGuard>
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

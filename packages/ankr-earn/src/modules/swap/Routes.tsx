import { generatePath } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { GuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute';
import { BSC_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const ROOT = `/swap/:token/:txHash`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: (token: Token, txHash: string) =>
        generatePath(ROOT, { token, txHash }),
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
          availableNetworks={[BSC_NETWORK_BY_ENV]}
          path={RoutesConfig.main.path}
          providerId={AvailableWriteProviders.ethCompatible}
        >
          <DefaultLayout>
            <Main />
          </DefaultLayout>
        </GuardETHRoute>
      </Switch>
    </Route>
  );
}

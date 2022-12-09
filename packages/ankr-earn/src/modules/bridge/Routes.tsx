import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { PageNotFound } from '../common/components/PageNotFound';

import { RoutesConfig } from './RoutesConfig';
import { BridgeWalletGuard } from './screens/BridgeWalletGuard';
import { Restore } from './screens/Restore';

const BridgeMainPage = loadComponent(() =>
  import('./screens/BridgeMainPage').then(module => module.BridgeMainPage),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={RoutesConfig.root}>
      <Switch>
        <Route exact path={RoutesConfig.main.path}>
          <DefaultLayout>
            <BridgeWalletGuard>
              <BridgeMainPage />
            </BridgeWalletGuard>
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.restore.path}>
          <DefaultLayout>
            <BridgeWalletGuard>
              <Restore />
            </BridgeWalletGuard>
          </DefaultLayout>
        </Route>

        <Route>
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        </Route>
      </Switch>
    </Route>
  );
}

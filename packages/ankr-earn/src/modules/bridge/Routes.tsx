import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { PageNotFound } from '../common/components/PageNotFound';

import { RoutesConfig } from './RoutesConfig';
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
            <BridgeMainPage />
          </DefaultLayout>
        </Route>

        <Route path={RoutesConfig.restore.path}>
          <DefaultLayout>
            <Restore />
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

import { Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';

const ROOT = `${StakeRoutes.main.path}matic/`;

/**
 *  TODO For development only. Remove it (MATIC on Polygon)
 */
const TMP_PATH = `${ROOT}network-chooser/`;

export const RoutesConfig = createRouteConfig(
  {
    networkChooser: {
      path: TMP_PATH,
    },
  },
  ROOT,
);

const NetworkChooser = loadComponent(() =>
  import('./screens/NetworkChooser').then(module => module.NetworkChooser),
);

export function getRoutes(): JSX.Element {
  return (
    <Route path={[RoutesConfig.networkChooser.path]}>
      <Switch>
        <Route exact path={RoutesConfig.networkChooser.path}>
          <NetworkChooser />
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

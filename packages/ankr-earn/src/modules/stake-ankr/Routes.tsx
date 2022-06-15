import { generatePath, Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';

import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}ankr-stake/`;

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
    <Route path={[RoutesConfig.root]}>
      <Switch>
        {/* todo: add guard route */}

        <Route path={RoutesConfig.main.path}>
          <DefaultLayout>
            <Main />
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

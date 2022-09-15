import { generatePath, Route, Switch } from 'react-router-dom';

import { PageNotFound } from 'modules/common/components/PageNotFound';
import { STAKING_PATH } from 'modules/common/const';
import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

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
        <Route exact path={ROOT}>
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

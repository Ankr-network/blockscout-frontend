import { generatePath } from 'react-router';
import { Route } from 'react-router-dom';

import { loadComponent } from 'modules/common/utils/loadComponent';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const ROOT = `/stake/`;

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
    <Route exact path={RoutesConfig.main.path}>
      <DefaultLayout>
        <Main />
      </DefaultLayout>
    </Route>
  );
}

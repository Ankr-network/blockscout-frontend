import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_EXPLORER = '/explorer/';

export const ExplorerRoutesConfig = createRouteConfig(
  {
    requestExplorer: {
      path: PATH_EXPLORER,
      generatePath: () => PATH_EXPLORER,
      breadcrumbs: 'explorer.request-explorer.breadcrumbs',
    },
  },
  PATH_EXPLORER,
);

const LoadableRequestExplorerContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/RequestExplorer').then(module => module.RequestExplorer),
  {
    fallback: <Spinner />,
  },
);

export function RequestExplorerRoutes() {
  return (
    <>
      <Route
        exact
        path={ExplorerRoutesConfig.requestExplorer.path}
        component={LoadableRequestExplorerContainer}
      />
    </>
  );
}

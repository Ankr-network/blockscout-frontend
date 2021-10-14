import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { QueryLoadingAbsolute } from 'modules/common/components/QueryLoading/QueryLoading';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_PROVIDERS = '/providers';

export const ProvidersRoutesConfig = createRouteConfig(
  {
    providers: {
      path: PATH_PROVIDERS,
      generatePath: () => PATH_PROVIDERS,
    },
  },
  PATH_PROVIDERS,
);

const LoadableProvidersContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/ProvidersList').then(module => module.ProvidersList),
  {
    fallback: <QueryLoadingAbsolute />,
  },
);

export function ProvidersRoutes() {
  return (
    <>
      <Route
        exact
        path={ProvidersRoutesConfig.providers.path}
        component={LoadableProvidersContainer}
      />
    </>
  );
}

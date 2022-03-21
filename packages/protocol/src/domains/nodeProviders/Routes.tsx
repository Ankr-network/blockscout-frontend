import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const PATH_PROVIDERS = '/providers/';
export const PATH_PROVIDERS_CHAINS = `${PATH_PROVIDERS}chains/`;
export const PATH_ADD_ENDPOINT = `${PATH_PROVIDERS_CHAINS}:chainId`;
export const PATH_PROVIDER_ENDPOINT = `${PATH_PROVIDERS}endpoints/:chainId`;

export const ProvidersRoutesConfig = createRouteConfig(
  {
    providers: {
      path: PATH_PROVIDERS,
      generatePath: () => PATH_PROVIDERS,
      breadcrumbs: 'providers.breadcrumbs',
    },
  },
  PATH_PROVIDERS,
);

const LoadableProvidersContainer: LoadableComponent<any> = loadable(
  async () =>
    import('./screens/ProvidersList/ProvidersNodesList').then(
      module => module.ProvidersNodesList,
    ),
  {
    fallback: <Spinner />,
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

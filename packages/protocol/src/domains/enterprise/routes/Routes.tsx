import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { EnterpriseRoutesConfig } from './routesConfig';

const LoadableChainsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/EnterpriseChainsListPage').then(
      module => module.EnterpriseChainsListPage,
    ),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/EnterpriseChainItemPage').then(
      module => module.EnterpriseChainItemPage,
    ),
  {
    fallback: <OverlaySpinner />,
  },
);

export function EnterpriseChainsRoutes() {
  return (
    <Route
      exact
      path={EnterpriseRoutesConfig.chains.path}
      component={LoadableChainsContainer}
    />
  );
}

export function EnterpriseChainDetailsRoutes() {
  return (
    <Route
      exact
      path={EnterpriseRoutesConfig.chainDetails.path}
      component={LoadableChainDetailsContainer}
    />
  );
}

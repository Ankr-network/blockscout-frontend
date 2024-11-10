import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { EnterpriseRoutesConfig } from './routesConfig';
import { GuardAuthEnterpriseRoute } from '../components/GuardAuthEnterpriseRoute';

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
    <GuardAuthEnterpriseRoute>
      <Route
        exact
        path={EnterpriseRoutesConfig.chains.path}
        component={LoadableChainsContainer}
      />
    </GuardAuthEnterpriseRoute>
  );
}

export function EnterpriseChainDetailsRoutes() {
  return (
    <GuardAuthEnterpriseRoute>
      <Route
        component={LoadableChainDetailsContainer}
        exact
        path={EnterpriseRoutesConfig.chainDetails.path}
      />
    </GuardAuthEnterpriseRoute>
  );
}

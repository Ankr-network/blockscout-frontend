import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { EnterpriseRoutesConfig } from './routesConfig';

const LoadableChainsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Chains').then(module => module.Chains),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/ChainItem').then(module => module.ChainItem),
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

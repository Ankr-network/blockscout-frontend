import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { ChainsRoutesConfig } from './routesConfig';

const LoadableChainsContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/ChainsListPage').then(module => module.ChainsListPage),
  {
    fallback: <OverlaySpinner />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/ChainPage').then(module => module.ChainPage),
  {
    fallback: <OverlaySpinner />,
  },
);

export function ChainsRoutes() {
  return (
    <Route
      exact
      path={ChainsRoutesConfig.chains.path}
      component={LoadableChainsContainer}
    />
  );
}

export function ChainDetailsRoutes() {
  return (
    <Route
      exact
      path={ChainsRoutesConfig.chainDetails.path}
      component={LoadableChainDetailsContainer}
    />
  );
}

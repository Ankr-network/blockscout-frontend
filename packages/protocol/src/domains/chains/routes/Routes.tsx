import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { OverlaySpinner } from '@ankr.com/ui';
import { ChainsRoutesConfig } from './routesConfig';

const LoadableAddEndpointContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/AddEndpoint').then(module => module.AddEndpoint),
  {
    fallback: <OverlaySpinner />,
  },
);

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

export function ChainPrivateRoutes() {
  return (
    <Route
      exact
      path={ChainsRoutesConfig.addEndpoint.path}
      component={LoadableAddEndpointContainer}
    />
  );
}

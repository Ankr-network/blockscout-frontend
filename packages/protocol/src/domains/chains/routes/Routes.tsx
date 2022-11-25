import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { ChainsRoutesConfig } from './routesConfig';

const LoadableAddEndpointContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/AddEndpoint').then(module => module.AddEndpoint),
  {
    fallback: <Spinner />,
  },
);

const LoadableChainsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Chains').then(module => module.Chains),
  {
    fallback: <Spinner />,
  },
);

const LoadableChainDetailsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/ChainItem').then(module => module.ChainItem),
  {
    fallback: <Spinner />,
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

import React from 'react';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { Spinner } from 'ui';
import { MMChainsRoutesConfig } from './routesConfig';

const LoadableMMChainsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/MMChains').then(module => module.MMChains),
  {
    fallback: <Spinner />,
  },
);

export function MMChainsRoutes() {
  return (
    <>
      <Route
        exact
        path={MMChainsRoutesConfig.mmChains.path}
        component={LoadableMMChainsContainer}
      />
    </>
  );
}

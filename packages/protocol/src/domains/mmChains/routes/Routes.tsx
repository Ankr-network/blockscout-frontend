import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { MMChainsRoutesConfig } from './routesConfig';

const LoadableMMChainsContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Chains').then(module => module.Chains),
  {
    fallback: <OverlaySpinner />,
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

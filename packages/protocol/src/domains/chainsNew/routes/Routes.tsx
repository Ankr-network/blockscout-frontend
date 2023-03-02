import { OverlaySpinner } from '@ankr.com/ui';
import loadable, { LoadableComponent } from '@loadable/component';
import { Route } from 'react-router';
import { ChainsNewRoutesConfig } from './routesConfig';

const LoadableChainsNewContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/ChainsNew').then(module => module.ChainsNew),
  {
    fallback: <OverlaySpinner />,
  },
);

export function ChainsNewRoutes() {
  return (
    <Route
      exact
      path={ChainsNewRoutesConfig.chiansNew.path}
      component={LoadableChainsNewContainer}
    />
  );
}

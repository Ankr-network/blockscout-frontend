import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';

import { AdvancedApiRoutesConfig } from './routesConfig';

const LoadableAdvancedApiContainer: LoadableComponent<any> = loadable(
  async () =>
    import('../screens/AdvancedApiPage').then(module => module.AdvancedApiPage),
  {
    fallback: <OverlaySpinner />,
  },
);

export function AdvancedApiRoutes() {
  return (
    <Route
      exact
      path={AdvancedApiRoutesConfig.advancedApi.path}
      component={LoadableAdvancedApiContainer}
    />
  );
}

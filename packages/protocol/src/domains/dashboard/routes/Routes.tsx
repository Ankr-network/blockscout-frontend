import { Route } from 'react-router-dom';
import loadable, { LoadableComponent } from '@loadable/component';

import { OverlaySpinner } from '@ankr.com/ui';
import { DashboardRoutesConfig } from './routesConfig';

const LoadableDashboardContainer: LoadableComponent<any> = loadable(
  async () => import('../screens/Dashboard').then(module => module.Dashboard),
  {
    fallback: <OverlaySpinner />,
  },
);

export function DashboardRoutes() {
  return (
    <>
      <Route
        exact
        path={DashboardRoutesConfig.dashboard.path}
        component={LoadableDashboardContainer}
      />
    </>
  );
}

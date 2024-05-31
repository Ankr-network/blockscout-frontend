import loadable, { LoadableComponent } from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';

import { MaintenanceRoutesConfig } from './routesConfig';

const LoadableMaintenanceContainer: LoadableComponent<any> = loadable(
  async () => import('../screen').then(module => module.MaintenancePage),
  {
    fallback: <OverlaySpinner />,
  },
);

export function MaintenanceRoutes() {
  return (
    <Route
      exact
      path={MaintenanceRoutesConfig.maintenance.path}
      render={() => <LoadableMaintenanceContainer />}
    />
  );
}

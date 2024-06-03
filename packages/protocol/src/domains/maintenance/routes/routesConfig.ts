import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const MAINTENANCE_PATH = '/maintenance/';

export const MaintenanceRoutesConfig = createRouteConfig(
  {
    maintenance: {
      path: MAINTENANCE_PATH,
      generatePath: () => MAINTENANCE_PATH,
    },
  },
  MAINTENANCE_PATH,
);

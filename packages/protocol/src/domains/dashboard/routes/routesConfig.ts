import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const DASHBOARD_PATH = '/dashboard/';

export const DashboardRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: DASHBOARD_PATH,
      generatePath: () => DASHBOARD_PATH,
      breadcrumbs: 'main-analytics.breadcrumbs',
    },
  },
  DASHBOARD_PATH,
);

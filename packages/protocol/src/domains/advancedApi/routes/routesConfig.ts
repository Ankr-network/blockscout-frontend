import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const ADVANCED_API_PATH = '/advanced-api';

export const AdvancedApiRoutesConfig = createRouteConfig(
  {
    advancedApi: {
      path: ADVANCED_API_PATH,
      generatePath: () => ADVANCED_API_PATH,
      breadcrumbs: 'advanced-api.breadcrumbs',
    },
  },
  ADVANCED_API_PATH,
);

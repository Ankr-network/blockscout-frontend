import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const INDEX_PATH = '/enterprise/';

export const EnterpriseRoutesConfig = createRouteConfig(
  {
    chains: {
      path: INDEX_PATH,
      generatePath: () => INDEX_PATH,
      breadcrumbs: 'chains.breadcrumbs',
    },
  },
  INDEX_PATH,
);

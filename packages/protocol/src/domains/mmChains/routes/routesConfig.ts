import { INDEX_PATH } from 'routes/constants';

import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const INDEX_MM_PATH = `${INDEX_PATH}mm/`;

export const MMChainsRoutesConfig = createRouteConfig(
  {
    mmChains: {
      path: INDEX_MM_PATH,
      generatePath: () => INDEX_MM_PATH,
      breadcrumbs: 'chains.breadcrumbs',
    },
  },
  INDEX_PATH,
);

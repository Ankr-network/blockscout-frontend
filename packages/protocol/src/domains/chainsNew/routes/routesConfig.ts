import { INDEX_PATH } from 'domains/chains/routes';
import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const CHAINS_NEW_PATH = `${INDEX_PATH}new-chains/`;

export const ChainsNewRoutesConfig = createRouteConfig(
  {
    chiansNew: {
      path: CHAINS_NEW_PATH,
      generatePath: () => CHAINS_NEW_PATH,
      breadcrumbs: 'chains.breadcrumbs',
    },
  },
  CHAINS_NEW_PATH,
);

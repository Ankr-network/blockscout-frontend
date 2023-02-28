import { createRouteConfig } from '@ankr.com/utils';

const PATH_ADMIN = '/admin';

export const AdminRoutesConfig = createRouteConfig(
  {
    admin: {
      path: PATH_ADMIN,
      generatePath: () => PATH_ADMIN,
    },
  },

  PATH_ADMIN,
);

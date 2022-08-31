import { generatePath } from 'react-router';

import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `/bridge/`;
const RESTORE = `${ROOT}restore/`;

export const RoutesConfig = createRouteConfig(
  {
    main: {
      path: ROOT,
      generatePath: () => generatePath(ROOT),
    },
    restore: {
      path: RESTORE,
      generatePath: () => generatePath(RESTORE),
    },
  },
  ROOT,
);

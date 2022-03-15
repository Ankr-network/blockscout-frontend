import { generatePath } from 'react-router';

import { EARN_PATH } from '../common/const';
import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${EARN_PATH}bridge/`;
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

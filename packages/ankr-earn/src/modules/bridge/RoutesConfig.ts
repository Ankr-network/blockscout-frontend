import { generatePath } from 'react-router';

import { STAKING_PATH } from '../common/const';
import { createRouteConfig } from '../router/utils/createRouteConfig';

const ROOT = `${STAKING_PATH}bridge/`;
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

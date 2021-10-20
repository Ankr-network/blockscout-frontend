import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

const PATH_STAKING = '/staking';

export const StakingRoutesConfig = createRouteConfig(
  {
    staking: {
      path: PATH_STAKING,
      generatePath: () => PATH_STAKING,
    },
  },
  PATH_STAKING,
);

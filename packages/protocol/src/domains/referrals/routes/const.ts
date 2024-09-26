import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const REFERRALS_PATH = '/referrals/';

export const REFERRALS_PATHS = [REFERRALS_PATH];

export const referralsRoutesConfig = createRouteConfig(
  {
    referrals: {
      path: REFERRALS_PATH,
      generatePath: () => REFERRALS_PATH,
      breadcrumbs: 'referrals.breadcrumbs',
    },
  },
  REFERRALS_PATH,
);

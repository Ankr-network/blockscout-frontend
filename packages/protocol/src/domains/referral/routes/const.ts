import { createRouteConfig } from 'modules/router/utils/createRouteConfig';

export const REFERRAL_PATH = '/referral/';

export const REFERRAL_PATHS = [REFERRAL_PATH];

export const referralRoutesConfig = createRouteConfig(
  {
    referral: {
      path: REFERRAL_PATH,
      generatePath: () => REFERRAL_PATH,
      breadcrumbs: 'referral.breadcrumbs',
    },
  },
  REFERRAL_PATH,
);

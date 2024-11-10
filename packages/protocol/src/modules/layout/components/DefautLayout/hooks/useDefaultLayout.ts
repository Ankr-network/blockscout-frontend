import { useRouteMatch } from 'react-router';

import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { referralsRoutesConfig } from 'domains/referrals/routes';
import { PricingRoutesConfig } from 'domains/pricing/Routes';

export const useDefaultLayout = () => {
  const isDashboardPage = Boolean(
    useRouteMatch(DashboardRoutesConfig.dashboard.path),
  );

  const isReferralsPage = Boolean(
    useRouteMatch(referralsRoutesConfig.referrals.path),
  );

  const isPricingPage = Boolean(
    useRouteMatch(PricingRoutesConfig.pricing.path),
  );

  return { isDashboardPage, isPricingPage, isReferralsPage };
};

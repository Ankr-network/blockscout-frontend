import loadable from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';

import { referralRoutesConfig } from './const';

const ReferralPage = loadable(
  () => import('../screens/ReferralPage').then(module => module.ReferralPage),
  { fallback: <OverlaySpinner /> },
);

export const ReferralRoutes = () => {
  return (
    <Route
      component={ReferralPage}
      exact
      path={referralRoutesConfig.referral.path}
    />
  );
};

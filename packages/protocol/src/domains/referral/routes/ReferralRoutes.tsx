import loadable from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';

import topBanner from 'domains/referral/assets/top-banner.png';
import { preloadImage } from 'modules/common/utils/preloadImage';

import { referralRoutesConfig } from './const';

const ReferralPage = loadable(
  async () => {
    const module = await import('../screens/ReferralPage');

    await preloadImage({ src: topBanner });

    return module.ReferralPage;
  },
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

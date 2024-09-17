import loadable from '@loadable/component';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route } from 'react-router-dom';

import topBanner from 'domains/referrals/assets/top-banner.png';
import { preloadImage } from 'modules/common/utils/preloadImage';

import { referralsRoutesConfig } from './const';

const ReferralsPage = loadable(
  async () => {
    const module = await import('../screens/ReferralsPage');

    await preloadImage({ src: topBanner });

    return module.ReferralsPage;
  },
  { fallback: <OverlaySpinner /> },
);

export const ReferralsRoutes = () => {
  return (
    <Route
      component={ReferralsPage}
      exact
      path={referralsRoutesConfig.referrals.path}
    />
  );
};

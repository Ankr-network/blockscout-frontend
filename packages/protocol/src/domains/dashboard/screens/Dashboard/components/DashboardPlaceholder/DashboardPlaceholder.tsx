import { t, tHTML } from '@ankr.com/common';

import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { RoutePlaceholder } from 'modules/common/components/RoutePlaceholder';

import bgLg from './assets/bg-lg.png';
import bgLgDark from './assets/bg-lg-dark.png';
import bgSm from './assets/bg-sm.png';
import bgSmDark from './assets/bg-sm-dark.png';

export const DashboardPlaceholder = () => (
  <RoutePlaceholder
    bgLg={bgLg}
    bgLgDark={bgLgDark}
    bgSm={bgSm}
    bgSmDark={bgSmDark}
    breadcrumbs={t(DashboardRoutesConfig.dashboard.breadcrumbs)}
    title={tHTML('dashboard.placeholder.title')}
    shouldSkipRedirect
  />
);

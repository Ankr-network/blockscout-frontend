import React from 'react';

import { ClockIcon } from 'uiKit/Icons/ClockIcon';
import { BoxIcon } from 'uiKit/Icons/BoxIcon';
import { StakingIcon } from 'uiKit/Icons/StakingIcon';
import { LabelIcon } from 'uiKit/Icons/LabelIcon';
import { PaperIcon } from 'uiKit/Icons/PaperIcon';
import { SuccessIcon } from 'uiKit/Icons/SuccessIcon';

import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { DashboardRoutesConfig } from 'domains/dashboard/Routes';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { PATH_PLAN } from 'domains/plan/Routes';
import { PATH_PROVIDERS } from 'domains/nodeProviders/Routes';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useLocaleMemo } from '../../../i18n/utils/useLocaleMemo';

export const MainNavigation = () => {
  const { credentials } = useAuth();

  const items = useLocaleMemo(
    (): NavigationItem[] => [
      {
        label: t('main-navigation.private-rpcs'),
        StartIcon: ClockIcon,
        href: DashboardRoutesConfig.dashboard.generatePath(),
      },
      {
        label: t('main-navigation.public-rpcs'),
        StartIcon: BoxIcon,
        href: ChainsRoutesConfig.chains.generatePath(),
      },
      {
        label: t('main-navigation.staking'),
        StartIcon: StakingIcon,
        isDisabled: true,
        href: '/staking',
      },
      {
        label: t('main-navigation.plan'),
        StartIcon: LabelIcon,
        href: PATH_PLAN,
        EndIcon: credentials ? SuccessIcon : undefined,
      },
      {
        label: t('main-navigation.protocol'),
        StartIcon: PaperIcon,
        href: PATH_PROVIDERS,
      },
    ],
    [credentials],
  );

  return <Navigation items={items} />;
};

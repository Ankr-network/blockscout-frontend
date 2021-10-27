import React from 'react';

import { ClockIcon } from 'uiKit/Icons/ClockIcon';
import { BoxIcon } from 'uiKit/Icons/BoxIcon';
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
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

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
        label: t('main-navigation.plan'),
        StartIcon: LabelIcon,
        href: PlanRoutesConfig.plan.generatePath(),
        EndIcon: credentials ? SuccessIcon : undefined,
      },
      {
        label: t('main-navigation.protocol'),
        StartIcon: PaperIcon,
        href: ProvidersRoutesConfig.providers.generatePath(),
      },
    ],
    [credentials],
  );

  return <Navigation items={items} />;
};

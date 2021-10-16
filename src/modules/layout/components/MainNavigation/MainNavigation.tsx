import React, { useMemo } from 'react';

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
import { PATH_DASHBOARD } from 'domains/dashboard/Routes';
import { PATH_CHAINS } from 'domains/chains/Routes';
import { PATH_PLAN } from 'domains/plan/Routes';
import { PATH_PROVIDERS } from 'domains/nodeProviders/Routes';
import { useAuth } from 'modules/auth/hooks/useAuth';

export const MainNavigation = () => {
  const { hasAccount } = useAuth();

  const items = useMemo(
    (): NavigationItem[] => [
      {
        label: t('main-navigation.dashboard'),
        StartIcon: ClockIcon,
        href: PATH_DASHBOARD,
      },
      {
        label: t('main-navigation.public-rpcs'),
        StartIcon: BoxIcon,
        href: PATH_CHAINS,
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
        EndIcon: hasAccount ? SuccessIcon : undefined,
      },
      {
        label: t('main-navigation.protocol'),
        StartIcon: PaperIcon,
        href: PATH_PROVIDERS,
      },
    ],
    [hasAccount],
  );

  return <Navigation items={items} />;
};

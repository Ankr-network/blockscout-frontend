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
import { IS_PRIVATE } from 'store';

export const MainNavigation = () => {
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
        label: t('main-navigation.pro'),
        StartIcon: LabelIcon,
        isDisabled: true,
        href: '/pro',
        EndIcon: IS_PRIVATE ? SuccessIcon : undefined,
      },
      {
        label: t('main-navigation.protocol'),
        StartIcon: PaperIcon,
        isDisabled: true,
        href: '/protocol',
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

import React, { useMemo } from 'react';

import { ClockIcon } from 'uiKit/Icons/ClockIcon';
import { BoxIcon } from 'uiKit/Icons/BoxIcon';
import { StakingIcon } from 'uiKit/Icons/StakingIcon';
import { LabelIcon } from 'uiKit/Icons/LabelIcon';
import { PaperIcon } from 'uiKit/Icons/PaperIcon';
import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { PATH_CHAINS } from 'domains/chains/Routes';

export const MainNavigation = () => {
  const items = useMemo(
    (): NavigationItem[] => [
      {
        label: t('main-navigation.dashboard'),
        Icon: ClockIcon,
        href: '/dashboard',
        isDisabled: true,
      },
      {
        label: t('main-navigation.public-rpcs'),
        Icon: BoxIcon,
        href: PATH_CHAINS,
      },
      {
        label: t('main-navigation.staking'),
        Icon: StakingIcon,
        isDisabled: true,
        href: '/staking',
      },
      {
        label: t('main-navigation.pro'),
        Icon: LabelIcon,
        isDisabled: true,
        href: '/pro',
      },
      {
        label: t('main-navigation.protocol'),
        Icon: PaperIcon,
        isDisabled: true,
        href: '/protocol',
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

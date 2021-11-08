import React from 'react';

import { DiamondIcon } from 'uiKit/Icons/DiamondIcon';
import { BoxIcon } from 'uiKit/Icons/BoxIcon';
import { PaperIcon } from 'uiKit/Icons/PaperIcon';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';

export const MainNavigation = () => {
  const items = useLocaleMemo(
    (): NavigationItem[] => [
      {
        label: t('main-navigation.public-rpcs'),
        StartIcon: BoxIcon,
        href: ChainsRoutesConfig.chains.generatePath(),
      },
      {
        label: t('main-navigation.plan'),
        StartIcon: DiamondIcon,
        href: PlanRoutesConfig.plan.generatePath(),
      },
      {
        label: t('main-navigation.protocol'),
        StartIcon: PaperIcon,
        href: ProvidersRoutesConfig.providers.generatePath(),
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

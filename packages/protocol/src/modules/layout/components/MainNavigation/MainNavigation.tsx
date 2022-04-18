import React from 'react';

import { ReactComponent as DiamondIcon } from 'uiKit/Icons/diamond.svg';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as PaperIcon } from 'uiKit/Icons/paper.svg';
import { ReactComponent as StatIcon } from 'uiKit/Icons/stat.svg';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExplorerRoutesConfig } from 'domains/explorer/Routes';

export const ANKR_SCAN_LINK = 'https://ankrscan.io/';

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
      {
        label: t('main-navigation.ankr-scan'),
        StartIcon: StatIcon,
        href: ANKR_SCAN_LINK,
      },
      {
        label: t('main-navigation.account-details'),
        StartIcon: DiamondIcon,
        href: AccountRoutesConfig.accountDetails.generatePath(),
      },
      {
        label: t('main-navigation.request-explorer'),
        StartIcon: BoxIcon,
        href: ExplorerRoutesConfig.requestExplorer.generatePath(),
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

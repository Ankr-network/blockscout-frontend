import React from 'react';

import { ReactComponent as DiamondIcon } from 'uiKit/Icons/diamond.svg';
import { ReactComponent as BoxIcon } from 'uiKit/Icons/box.svg';
import { ReactComponent as PaperIcon } from 'uiKit/Icons/paper.svg';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ExplorerRoutesConfig } from 'domains/explorer/Routes';
import { isDashboardActive } from './MainNavigationUtils';

export const HAS_REQUEST_EXPLORER = false;

export const MainNavigation = () => {
  const items = useLocaleMemo((): NavigationItem[] => {
    const links = [
      {
        label: t('main-navigation.dashboard'),
        StartIcon: BoxIcon,
        href: ChainsRoutesConfig.chains.generatePath(),
        isActive: isDashboardActive,
      },
      {
        label: t('main-navigation.account-details'),
        StartIcon: DiamondIcon,
        href: AccountRoutesConfig.accountDetails.generatePath(),
      },
      {
        label: t('main-navigation.protocol'),
        StartIcon: PaperIcon,
        href: ProvidersRoutesConfig.providers.generatePath(),
      },
    ];

    if (HAS_REQUEST_EXPLORER) {
      links.push({
        label: t('main-navigation.request-explorer'),
        StartIcon: BoxIcon,
        href: ExplorerRoutesConfig.requestExplorer.generatePath(),
      });
    }

    return links;
  }, []);

  return <Navigation items={items} />;
};

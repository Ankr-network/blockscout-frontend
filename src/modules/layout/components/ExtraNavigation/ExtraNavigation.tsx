import React, { useMemo } from 'react';

import { FileIcon } from 'uiKit/Icons/FileIcon';
import { ChatIcon } from 'uiKit/Icons/ChatIcon';
import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { useIsSMDown } from 'modules/themes/useTheme';
import { StatIcon } from 'uiKit/Icons/StatIcon';
import { ANKR_SCAN_LINK } from '../MainNavigation';

export const ExtraNavigation = () => {
  const isMobile = useIsSMDown();

  const items = useMemo((): NavigationItem[] => {
    const mainItems = [
      {
        label: t('extra-navigation.docs'),
        StartIcon: FileIcon,
        href: 'https://docs.ankr.com/ankr-protocol/about',
      },
      {
        label: t('extra-navigation.faq'),
        StartIcon: ChatIcon,
        href: 'https://docs.ankr.com/ankr-protocol/faqs',
      },
    ];

    if (isMobile) {
      mainItems.unshift({
        label: t('main-navigation.ankr-scan'),
        StartIcon: StatIcon,
        href: ANKR_SCAN_LINK,
      });
    }

    return mainItems;
  }, [isMobile]);

  return <Navigation items={items} />;
};

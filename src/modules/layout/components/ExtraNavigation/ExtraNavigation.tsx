import React, { useMemo } from 'react';

import { ReactComponent as FileIcon } from 'uiKit/Icons/file.svg';
import { ReactComponent as ChatIcon } from 'uiKit/Icons/chat.svg';
import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { useIsSMDown } from 'modules/themes/useTheme';
import { ReactComponent as StatIcon } from 'uiKit/Icons/stat.svg';
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

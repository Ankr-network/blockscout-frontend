import React, { useMemo } from 'react';

import { ReactComponent as FileIcon } from 'uiKit/Icons/file.svg';
import { ReactComponent as ChatIcon } from 'uiKit/Icons/chat.svg';
import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { useIsSMDown } from 'ui';
import { ReactComponent as StatIcon } from 'uiKit/Icons/stat.svg';
import { ANKR_SCAN_LINK } from '../MainNavigation';

const HAS_FAQ_LINK = false;

export const ExtraNavigation = () => {
  const isMobile = useIsSMDown();

  const items = useMemo((): NavigationItem[] => {
    const mainItems = [
      {
        label: t('extra-navigation.docs'),
        StartIcon: FileIcon,
        href: 'https://www.ankr.com/docs/staking/overview/',
      },
    ];

    if (HAS_FAQ_LINK) {
      mainItems.unshift({
        label: t('extra-navigation.faq'),
        StartIcon: ChatIcon,
        href: 'https://docs.ankr.com/ankr-protocol/faqs',
      });
    }

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

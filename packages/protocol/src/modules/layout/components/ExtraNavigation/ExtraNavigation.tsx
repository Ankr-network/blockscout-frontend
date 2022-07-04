import React, { useMemo } from 'react';

import { ReactComponent as FileIcon } from 'uiKit/Icons/file.svg';
import { ReactComponent as ChatIcon } from 'uiKit/Icons/chat.svg';
import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';

const HAS_FAQ_LINK = false;

export const ExtraNavigation = () => {
  const items = useMemo((): NavigationItem[] => {
    const mainItems = [
      {
        label: t('extra-navigation.docs'),
        StartIcon: FileIcon,
        href: 'https://www.ankr.com/docs/build-blockchain/overview',
      },
    ];

    if (HAS_FAQ_LINK) {
      mainItems.unshift({
        label: t('extra-navigation.faq'),
        StartIcon: ChatIcon,
        href: 'https://docs.ankr.com/ankr-protocol/faqs',
      });
    }

    return mainItems;
  }, []);

  return <Navigation items={items} />;
};

import React, { useMemo } from 'react';

import { FileIcon } from 'uiKit/Icons/FileIcon';
import { ChatIcon } from 'uiKit/Icons/ChatIcon';
import { t } from 'modules/i18n/utils/intl';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';

export const ExtraNavigation = () => {
  const items = useMemo(
    (): NavigationItem[] => [
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
    ],
    [],
  );

  return <Navigation items={items} />;
};

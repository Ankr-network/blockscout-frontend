import React, { useMemo } from 'react';

import { FileIcon } from 'uiKit/Icons/FileIcon';
import { ChatIcon } from 'uiKit/Icons/ChatIcon';
import { HeadphonesIcon } from 'uiKit/Icons/HeadphonesIcon';
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
        Icon: FileIcon,
        href: '/docs',
        isDisabled: true,
      },
      {
        label: t('extra-navigation.faq'),
        Icon: ChatIcon,
        href: '/faq',
        isDisabled: true,
      },
      {
        label: t('extra-navigation.support'),
        Icon: HeadphonesIcon,
        href: '/support',
        isDisabled: true,
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

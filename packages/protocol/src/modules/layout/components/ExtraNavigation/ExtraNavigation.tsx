import { useMemo } from 'react';

import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { t } from 'modules/i18n/utils/intl';
import { ReactComponent as ChatIcon } from 'uiKit/Icons/chat.svg';
import { ReactComponent as FileIcon } from 'uiKit/Icons/file.svg';
import { SettingsIcon } from 'uiKit/Icons/SettingsIcon';

const HAS_FAQ_LINK = false;

export const ExtraNavigation = () => {
  const items = useMemo((): NavigationItem[] => {
    const mainItems: NavigationItem[] = [
      {
        label: t('extra-navigation.docs'),
        StartIcon: FileIcon,
        href: 'https://www.ankr.com/docs/build-blockchain/overview',
      },
      {
        label: t('extra-navigation.settings'),
        StartIcon: SettingsIcon,
        href: UserSettingsRoutesConfig.settings.generatePath(),
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

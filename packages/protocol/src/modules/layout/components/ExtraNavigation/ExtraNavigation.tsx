import { useMemo } from 'react';

import { ReactComponent as ChatIcon } from 'uiKit/Icons/chat.svg';
import { t } from 'modules/i18n/utils/intl';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { FAQ_URL } from '../MainNavigation/MainNavigationUtils';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/setting.svg';

const HAS_FAQ_LINK = false;

export const ExtraNavigation = () => {
  const items = useMemo((): NavigationItem[] => {
    const mainItems: NavigationItem[] = [
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
        href: FAQ_URL,
      });
    }

    return mainItems;
  }, []);

  return <Navigation items={items} />;
};

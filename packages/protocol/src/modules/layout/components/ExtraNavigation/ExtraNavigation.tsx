import { useMemo } from 'react';

import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { ReactComponent as ActiveSettingsIcon } from 'uiKit/Icons/activeSetting.svg';
import { ReactComponent as SettingsIcon } from 'uiKit/Icons/setting.svg';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { t } from 'modules/i18n/utils/intl';

export const ExtraNavigation = () => {
  const items = useMemo(
    (): NavigationItem[] => [
      {
        label: t('extra-navigation.settings'),
        StartIcon: SettingsIcon,
        ActiveIcon: ActiveSettingsIcon,
        href: UserSettingsRoutesConfig.settings.generatePath(),
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

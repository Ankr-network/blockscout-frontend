import { useMemo } from 'react';

import {
  Navigation,
  NavigationItem,
} from 'modules/common/components/Navigation';
import { Gear } from '@ankr.com/ui';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { t } from '@ankr.com/common';

export const ExtraNavigation = () => {
  const items = useMemo(
    (): NavigationItem[] => [
      {
        label: t('extra-navigation.settings'),
        StartIcon: Gear,
        ActiveIcon: Gear,
        href: UserSettingsRoutesConfig.settings.generatePath(),
      },
    ],
    [],
  );

  return <Navigation items={items} />;
};

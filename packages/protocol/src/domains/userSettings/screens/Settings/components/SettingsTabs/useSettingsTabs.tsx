import { useMemo } from 'react';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { GeneralSettings } from '../GeneralSettings';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { GroupSettings } from '../GroupSettings';
import { t } from '@ankr.com/common';

export enum SettingsTabID {
  General = 'General',
  Group = 'Group',
}

export const useSettingsTabs = () => {
  const rawTabs: Tab<SettingsTabID>[] = useMemo(() => {
    const tabs = [
      {
        id: SettingsTabID.General,
        content: <GeneralSettings />,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.general')}
          />
        ),
      },
      {
        id: SettingsTabID.Group,
        content: <GroupSettings />,
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={t('user-settings.settings-tab.my-company')}
          />
        ),
      },
    ];

    return tabs;
  }, []);

  return useTabs({
    initialTabID: SettingsTabID.General,
    tabs: rawTabs,
  });
};

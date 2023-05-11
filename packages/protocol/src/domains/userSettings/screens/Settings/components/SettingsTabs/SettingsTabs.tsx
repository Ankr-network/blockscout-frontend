import { useSettingsTabs } from './useSettingsTabs';
import { TabsManager } from 'uiKit/TabsManager';
import { useSettingsTabsStyles } from './useSettingsTabsStyles';

export enum SettingsTabID {
  General = 'General',
  Group = 'Group',
}

export const SettingsTabs = () => {
  const { classes } = useSettingsTabsStyles();

  const [tabs, selectedTab] = useSettingsTabs();

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
    />
  );
};

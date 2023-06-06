import { useSettingsTabs } from './useSettingsTabs';
import { TabsManager } from 'uiKit/TabsManager';
import { useSettingsTabsStyles } from './useSettingsTabsStyles';

export const SettingsTabs = () => {
  const { classes } = useSettingsTabsStyles();

  const [tabs, selectedTab] = useSettingsTabs({
    disabledClassName: classes.disabled,
  });

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
    />
  );
};

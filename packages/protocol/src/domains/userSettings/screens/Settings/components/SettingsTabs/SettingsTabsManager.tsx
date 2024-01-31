import { TabsManager } from 'uiKit/TabsManager';
import { ESettingsContentType } from 'domains/userSettings/types';

import { CreateTeamButton } from '../CreateTeamButton';
import { useSettingsTabs } from './useSettingsTabs';
import { useSettingsTabsStyles } from './useSettingsTabsStyles';

export const SettingsTabsManager = () => {
  const { classes } = useSettingsTabsStyles();

  const { tabs, selectedTab } = useSettingsTabs();

  const isCreateTeamButtonVisible =
    selectedTab?.id === ESettingsContentType.Teams;

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
      additionalContent={
        isCreateTeamButtonVisible && (
          <CreateTeamButton className={classes.createTeamButton} />
        )
      }
    />
  );
};

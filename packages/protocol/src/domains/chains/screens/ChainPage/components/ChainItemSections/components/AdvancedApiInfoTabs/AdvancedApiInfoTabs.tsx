import { Paper } from '@mui/material';

import { TabsManager } from 'uiKit/TabsManager';
import { useTabs } from 'modules/common/hooks/useTabs';

import { useAdvancedApiInfoTabsContent } from './useAdvancedApiInfoTabsContent';
import { useAdvancedApiInfoTabsStyles } from './useAdvancedApiInfoTabsStyles';

export const AdvancedApiInfoTabs = () => {
  const { classes } = useAdvancedApiInfoTabsStyles();

  const tabs = useAdvancedApiInfoTabsContent();

  const [sections, section] = useTabs({
    tabs,
  });

  return (
    <Paper className={classes.advancedApiInfoTabsPaper}>
      <TabsManager
        className={classes.advancedApiInfoTabs}
        classNameTabsInner={classes.advancedApiInfoTabsInner}
        selectedTab={section}
        tabs={sections}
      />
    </Paper>
  );
};

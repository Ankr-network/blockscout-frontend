import { Box } from '@material-ui/core';
import { TabsManager } from 'uiKit/TabsManager';
import { useTopUpTabsStyles } from './LibraryTabsStyles';
import { Tabs } from 'modules/common/hooks/useTabs';

export interface ILibraryTabsProps {
  className?: string;
  tabs: Tabs[0];
  selectedTab: Tabs[1];
}

export const LibraryTabs = ({
  selectedTab,
  tabs,
  className,
}: ILibraryTabsProps) => {
  const classes = useTopUpTabsStyles();

  return (
    <Box className={className}>
      <TabsManager
        selectedTab={selectedTab}
        tabs={tabs}
        className={classes.root}
        allowSingleTab
      />
    </Box>
  );
};

import { Box, Orientation } from '@material-ui/core';
import { Tabs } from 'modules/common/hooks/useTabs';
import { TabsManager } from 'uiKit/TabsManager';
import { useTopUpTabsStyles } from './LibraryTabsStyles';

export interface ILibraryTabsProps {
  className?: string;
  tabs: Tabs[0];
  selectedTab: Tabs[1];
  orientation?: Orientation;
}

export const LibraryTabs = ({
  selectedTab,
  tabs,
  className,
  orientation,
}: ILibraryTabsProps) => {
  const classes = useTopUpTabsStyles();

  return (
    <Box className={className}>
      <TabsManager
        selectedTab={selectedTab}
        tabs={tabs}
        className={classes.root}
        allowSingleTab
        orientation={orientation}
      />
    </Box>
  );
};

import { useLibraryTabs } from './LibraryTabsUtils';
import { TabsManager } from 'uiKit/TabsManager';
import { useTopUpTabsStyles } from './LibraryTabsStyles';
import { EndpointGroup } from 'modules/endpoints/types';

interface ILibraryTabsProps {
  group: EndpointGroup;
}

export const LibraryTabs = ({ group }: ILibraryTabsProps) => {
  const classes = useTopUpTabsStyles();

  const [tabs, selectedTab] = useLibraryTabs(group);

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.root}
    />
  );
};

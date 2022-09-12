import { EVMMethod, LibraryID } from 'domains/requestComposer/constants';
import { EndpointGroup } from 'modules/endpoints/types';
import { TabsManager } from 'uiKit/TabsManager';
import { useMethodsTabsStyles } from './useMethodsTabsStyles';
import { useMethodsTabsUtils } from './useMethodsTabsUtils';

interface IMethodsTabsProps {
  group: EndpointGroup;
  title: EVMMethod;
  args: string[];
  libraryID: LibraryID;
}

export const MethodsTabs = ({
  group,
  title,
  args,
  libraryID,
}: IMethodsTabsProps) => {
  const classes = useMethodsTabsStyles();

  const [tabs, selectedTab] = useMethodsTabsUtils(
    group,
    title,
    args,
    libraryID,
  );

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.methodsTab}
    />
  );
};

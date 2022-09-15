import { Tabs } from 'modules/common/hooks/useTabs';
import { TabsManager } from 'uiKit/TabsManager';
import { useMethodsTabsStyles } from './useMethodsTabsStyles';

interface IMethodsTabsProps {
  tabs: Tabs[0];
  selectedTab: Tabs[1];
}

export const MethodsTabs = ({ tabs, selectedTab }: IMethodsTabsProps) => {
  const classes = useMethodsTabsStyles();

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.methodsTab}
    />
  );
};

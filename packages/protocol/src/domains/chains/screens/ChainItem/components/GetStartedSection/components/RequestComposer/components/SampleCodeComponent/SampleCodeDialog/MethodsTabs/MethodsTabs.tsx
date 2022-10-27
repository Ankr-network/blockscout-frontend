import { ITabProps } from 'modules/common/hooks/useTabs';
import { TabsManager } from 'uiKit/TabsManager';
import { useMethodsTabsStyles } from './useMethodsTabsStyles';

export const MethodsTabs = ({ tabs, selectedTab }: ITabProps) => {
  const classes = useMethodsTabsStyles();

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.methodsTab}
    />
  );
};

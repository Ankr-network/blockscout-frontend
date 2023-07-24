import { ITabProps } from 'modules/common/hooks/useTabs';
import { TabsManager } from 'uiKit/TabsManager';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useMethodsTabsStyles } from './useMethodsTabsStyles';

export const MethodsTabs = ({ tabs, selectedTab }: ITabProps) => {
  const { isLightTheme } = useThemes();
  const { classes } = useMethodsTabsStyles(isLightTheme);

  return (
    <TabsManager
      selectedTab={selectedTab}
      tabs={tabs}
      className={classes.methodsTab}
    />
  );
};

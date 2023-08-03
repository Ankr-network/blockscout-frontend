import { TabsManager } from 'uiKit/TabsManager';
import { Tab } from 'modules/common/hooks/useTabs';

import { useSecondaryTabsStyles } from './SecondaryTabsStyles';

export interface SecondaryTabsProps<TabID> {
  className?: string;
  selectedTab?: Tab<TabID>;
  tabs: Tab<TabID>[];
  visible?: boolean;
}

export function SecondaryTabs<TabID>({
  className,
  selectedTab,
  tabs,
  visible = true,
}: SecondaryTabsProps<TabID>) {
  const { classes, cx } = useSecondaryTabsStyles();

  return visible ? (
    <TabsManager
      allowSingleTab
      className={cx(className, classes.secondaryTabs)}
      selectedTab={selectedTab}
      tabs={tabs}
    />
  ) : null;
}

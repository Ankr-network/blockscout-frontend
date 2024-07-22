import { TabsManager } from 'uiKit/TabsManager';
import { useTabs } from 'modules/common/hooks/useTabs';

import { Technology } from '../../types';
import { tabs, getTitle } from './const';
import { useSnippetTechnologyTabsStyles } from './useSnippetTechnologyTabsStyles';

export interface TabsProps {
  setTechnology: (technology: Technology) => void;
  isTitleHidden?: boolean;
}

export const SnippetTechnologyTabs = ({
  isTitleHidden,
  setTechnology,
}: TabsProps) => {
  const [processedTabs, selectedTab] = useTabs({
    tabs,
    onTabSelect: setTechnology,
  });

  const { classes } = useSnippetTechnologyTabsStyles();

  return (
    <TabsManager<Technology>
      selectedTab={selectedTab}
      tabs={processedTabs}
      title={
        isTitleHidden ? undefined : (
          <div className={classes.title}>{getTitle()}</div>
        )
      }
      classNameTabsInner={classes.classNameTabsInner}
      classNameTabsWrapper={classes.classNameTabsWrapper}
      classNameTab={classes.classNameTab}
    />
  );
};

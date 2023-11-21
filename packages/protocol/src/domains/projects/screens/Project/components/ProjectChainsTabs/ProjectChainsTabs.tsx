import { TabsManager } from 'uiKit/TabsManager';

import { AddChainsButton } from './components/AddChainsButton';
import { useProjectChainsTabsScroll } from './hooks/useProjectChainsTabsScroll';
import { useProjectChainsTabsStyles } from './useProjectChainsTabsStyles';
import { useProjectChainsContext } from '../../hooks/useProjectChainsContext';

export const ProjectChainsTabs = () => {
  const { projectChainsTabs, selectedProjectChainsTab } =
    useProjectChainsContext();

  const {
    refTabsInner,
    refTabsScrollWrapper,
    scrollForwardBtn,
    scrollBackBtn,
    onScroll,
  } = useProjectChainsTabsScroll(
    projectChainsTabs,
    selectedProjectChainsTab?.id,
  );

  const { classes } = useProjectChainsTabsStyles();

  return (
    <TabsManager<string>
      additionalContent={
        <>
          {scrollForwardBtn}
          <AddChainsButton />
        </>
      }
      allowSingleTab
      className={classes.tabsRoot}
      classNameTabsWrapper={classes.tabsWrapper}
      classNameTabsInner={classes.tabsInner}
      onScrollTabsInner={onScroll}
      refTabsInner={refTabsInner}
      refTabsScrollWrapper={refTabsScrollWrapper}
      scrollBackBtn={scrollBackBtn}
      selectedTab={selectedProjectChainsTab}
      tabs={projectChainsTabs}
    />
  );
};

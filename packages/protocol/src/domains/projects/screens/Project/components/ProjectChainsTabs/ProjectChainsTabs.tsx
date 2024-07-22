import { TabsManager } from 'uiKit/TabsManager';

import { ConfigureChainsButton } from './components/ConfigureChainsButton';
import { useProjectChainsTabsScroll } from './hooks/useProjectChainsTabsScroll';
import { useProjectChainsTabsStyles } from './useProjectChainsTabsStyles';
import { useProjectChainsContext } from '../../hooks/useProjectChainsContext';

export const ProjectChainsTabs = () => {
  const { projectChainsTabs, selectedProjectChainsTab } =
    useProjectChainsContext();

  const {
    onScroll,
    refTabsInner,
    refTabsScrollWrapper,
    scrollBackBtn,
    scrollForwardBtn,
  } = useProjectChainsTabsScroll(selectedProjectChainsTab?.id);

  const { classes } = useProjectChainsTabsStyles();

  return (
    <TabsManager<string>
      additionalContent={
        <>
          {scrollForwardBtn}
          <ConfigureChainsButton />
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

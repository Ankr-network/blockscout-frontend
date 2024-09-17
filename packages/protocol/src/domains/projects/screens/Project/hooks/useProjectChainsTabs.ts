import { useCallback, useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useTabs } from 'modules/common/hooks/useTabs';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { getProjectChainsTabs } from '../utils/getProjectChainsTabs';
import { useNewTabSelection } from './useNewTabSelection';

export interface UseProjectChainsTabsParams {
  projectChains: Chain[];
}

export const useProjectChainsTabs = ({
  projectChains,
}: UseProjectChainsTabsParams) => {
  const { isLightTheme } = useThemes();
  const { chainId } = ProjectsRoutesConfig.project.useParams();

  const tabs = useMemo(
    () => getProjectChainsTabs(projectChains, isLightTheme),
    [projectChains, isLightTheme],
  );

  const initialTabID = chainId || tabs[0]?.id;

  const { setChainId } = ProjectsRoutesConfig.project.useParams();
  const onTabSelect = useCallback(id => setChainId(id), [setChainId]);

  const [
    projectChainsTabs,
    selectedProjectChainsTab,
    handleSelectProjectChainsTab,
  ] = useTabs({
    tabs,
    initialTabID,
    onTabSelect,
  });

  useNewTabSelection({ handleSelectProjectChainsTab, projectChains });

  return {
    projectChainsTabs,
    selectedProjectChainsTab,
    selectedProjectChainsTabId: selectedProjectChainsTab?.id,
  };
};

import { useMemo } from 'react';

import { filterChainsByPaths } from 'modules/chains/utils/filterChainsByPaths';

import { ProjectChainsContextValue } from '../types';
import { useProjectData } from './useProjectData';
import { useProjectPaths } from './useProjectPaths';
import { useProjectChainsTabs } from './useProjectChainsTabs';

export const useProjectChains = (): ProjectChainsContextValue => {
  const { chains, isLoading, projectBlockchains, whitelist } = useProjectData();

  const paths = useProjectPaths({ chains, projectBlockchains, whitelist });

  const projectChains = useMemo(
    () => filterChainsByPaths({ chains, paths }),
    [chains, paths],
  );

  const {
    projectChainsTabs,
    selectedProjectChainsTab,
    selectedProjectChainsTabId,
  } = useProjectChainsTabs({ projectChains });

  return {
    chains,
    isLoading,
    paths,
    projectChains,
    projectChainsTabs,
    selectedProjectChainsTab,
    selectedProjectChainsTabId,
  };
};

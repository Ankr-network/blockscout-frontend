import { useMemo } from 'react';

import { filterChainsByPaths } from 'modules/chains/utils/filterChainsByPaths';

import { ProjectChainsContextValue } from '../types';
import { useProjectData } from './useProjectData';
import { useProjectPaths } from './useProjectPaths';
import { useProjectChainsTabs } from './useProjectChainsTabs';

export const useProjectChains = (
  userEndpointToken?: string,
): ProjectChainsContextValue => {
  const { chains, isLoading, projectBlockchains } =
    useProjectData(userEndpointToken);

  const paths = useProjectPaths({ chains, projectBlockchains });

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

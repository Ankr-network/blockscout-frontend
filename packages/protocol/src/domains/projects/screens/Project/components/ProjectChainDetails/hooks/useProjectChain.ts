import { useMemo } from 'react';

import { fallbackChain } from 'domains/dashboard/screens/Dashboard/const';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';
import { selectChainById } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectChainsContext } from 'domains/projects/screens/Project/hooks/useProjectChainsContext';

export const useProjectChain = () => {
  const { chains, paths, selectedProjectChainsTabId } =
    useProjectChainsContext();

  // TODO: check that we are really need this fallback
  // https://ankrnetwork.atlassian.net/browse/MRPC-3930
  const chainFallBackFromStore = useAppSelector(state =>
    selectChainById(state, selectedProjectChainsTabId!),
  );

  const chain = useMemo(() => {
    const currentChain = chains.find(({ id }) => {
      return id === selectedProjectChainsTabId;
    });

    if (currentChain) {
      return currentChain;
    }

    if (chainFallBackFromStore) {
      return chainFallBackFromStore;
    }

    return fallbackChain;
  }, [chainFallBackFromStore, chains, selectedProjectChainsTabId]);

  const projectChain = useMemo(
    () => filterChainByPaths({ chain, paths }),
    [chain, paths],
  );

  return { projectChain };
};

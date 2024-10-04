import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { updateSelectedPaths } from './useSelectedProjectChainsPaths';
import { useProjectChainsContext } from './useProjectChainsContext';

interface UseSelectedProjectChainPathsParams {
  allCurrentChainPaths: ChainPath[];
}

export const useSelectedNetworksPaths = ({
  allCurrentChainPaths,
}: UseSelectedProjectChainPathsParams) => {
  const { paths: projectChainsPaths } = useProjectChainsContext();

  const currentChainSelectedPaths = useMemo(() => {
    return allCurrentChainPaths.filter(path =>
      projectChainsPaths.includes(path),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we don't need to update this on every allCurrentChainPaths change
  }, [projectChainsPaths]);

  const [selectedNetworksPaths, setSelectedNetworksPaths] = useState<
    ChainPath[]
  >(currentChainSelectedPaths);

  useEffect(() => {
    setSelectedNetworksPaths(currentChainSelectedPaths);
  }, [currentChainSelectedPaths]);

  const handleUpdateNetworksPaths = useCallback(
    (newPaths: ChainPath | ChainPath[]) => {
      setSelectedNetworksPaths(selectedPaths =>
        updateSelectedPaths(selectedPaths, newPaths, false),
      );
    },
    [],
  );

  const handleResetNetworksSelection = useCallback(
    () => setSelectedNetworksPaths(projectChainsPaths),
    [projectChainsPaths],
  );

  return {
    handleResetNetworksSelection,
    handleUpdateNetworksPaths,
    selectedNetworksPaths,
  };
};

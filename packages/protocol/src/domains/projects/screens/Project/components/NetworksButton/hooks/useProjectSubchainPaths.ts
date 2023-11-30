import { useMemo } from 'react';

import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectChainsContext } from 'domains/projects/screens/Project/hooks/useProjectChainsContext';
import { useProjectNetworksPaths } from 'domains/projects/screens/Project/hooks/useProjectNetworksPaths';

export interface UseSubchainPathsParams {
  onAddSubchainsSuccess: () => void;
}

export const useProjectSubchainPaths = ({
  onAddSubchainsSuccess,
}: UseSubchainPathsParams) => {
  const {
    handleAddChainsToProject,
    handleResetNetworksSelection,
    handleUpdateNetworksPaths,
    isAddingChainsToProject,
    selectedNetworksPaths,
  } = useProjectNetworksPaths({ onAddChainsSuccess: onAddSubchainsSuccess });

  const { selectedProjectChainsTabId } = useProjectChainsContext();

  const allSubchainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, selectedProjectChainsTabId!),
  );

  const selectedProjectSubchainPaths = useMemo(
    () => selectedNetworksPaths.filter(path => allSubchainPaths.includes(path)),
    [allSubchainPaths, selectedNetworksPaths],
  );

  return {
    allSubchainPaths,
    handleAddChainsToProject,
    handleResetNetworksSelection,
    handleUpdateNetworksPaths,
    isAddingChainsToProject,
    selectedProjectSubchainPaths,
  };
};

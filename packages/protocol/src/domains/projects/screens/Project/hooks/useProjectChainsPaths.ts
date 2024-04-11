import { useAddChainsToProjectHandler } from './useAddChainsToProjectHandler';
import { useSelectedProjectChainsPaths } from './useSelectedProjectChainsPaths';

export interface UseProjectChainPathsParams {
  onAddChainsSuccess: () => void;
}

export const useProjectChainsPaths = ({
  onAddChainsSuccess,
}: UseProjectChainPathsParams) => {
  const {
    handleResetProjectChainsSelection,
    handleSelectProjectChainsPaths,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
    selectedProjectChainsPaths,
    setIsSelectedAll,
    isSelectedAll,
  } = useSelectedProjectChainsPaths();

  const { handleAddChainsToProject, isAddingChainsToProject } =
    useAddChainsToProjectHandler({
      onAddChainsSuccess,
      isSelectedAll,
      selectedProjectChainsPaths,
    });

  return {
    handleAddChainsToProject,
    handleResetProjectChainsSelection,
    handleSelectProjectChainsPaths,
    setIsSelectedAll,
    isAddingChainsToProject,
    selectedProjectChainsPaths,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
  };
};

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
    handleSelectAllSubchainPaths,
    handleSelectProjectChainsPaths,
    handleUnselectAllSubchainPaths,
    selectedProjectChainsPaths,
    setSelectedProjectChainsPaths,
  } = useSelectedProjectChainsPaths();

  const { handleAddChainsToProject, isAddingChainsToProject } =
    useAddChainsToProjectHandler({
      onAddChainsSuccess,
      selectedProjectChainsPaths,
    });

  return {
    handleAddChainsToProject,
    handleResetProjectChainsSelection,
    handleSelectProjectChainsPaths,
    isAddingChainsToProject,
    selectedProjectChainsPaths,
    setSelectedProjectChainsPaths,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
  };
};

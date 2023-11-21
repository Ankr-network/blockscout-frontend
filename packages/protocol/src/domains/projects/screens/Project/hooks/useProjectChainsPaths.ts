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
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
  };
};

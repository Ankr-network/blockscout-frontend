import { useCallback } from 'react';

import { useProjectSidebar } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useProjectChainsPaths } from 'domains/projects/screens/Project/hooks/useProjectChainsPaths';

export const useAddChainsButton = () => {
  const {
    isOpened: isSidebarOpened,
    handleClose,
    handleOpen: handleSidebarOpen,
  } = useProjectSidebar();

  const {
    handleAddChainsToProject,
    handleResetProjectChainsSelection,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
    setIsSelectedAll,
    isAddingChainsToProject,
    selectedProjectChainsPaths,
  } = useProjectChainsPaths({ onAddChainsSuccess: handleClose });

  const onSidebarClose = useCallback(() => {
    handleResetProjectChainsSelection();
    handleClose();
  }, [handleClose, handleResetProjectChainsSelection]);

  return {
    handleAddChainsToProject,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
    setIsSelectedAll,
    handleSidebarOpen,
    isAddingChainsToProject,
    isSidebarOpened,
    onSidebarClose,
    selectedProjectChainsPaths,
  };
};

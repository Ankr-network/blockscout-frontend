import { useCallback } from 'react';

import { useProjectSidebar } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useProjectChainsPaths } from 'domains/projects/screens/Project/hooks/useProjectChainsPaths';

export const useAddChainsButton = () => {
  const {
    handleClose,
    handleOpen: handleSidebarOpen,
    isOpened: isSidebarOpened,
  } = useProjectSidebar();

  const {
    handleAddChainsToProject,
    handleResetProjectChainsSelection,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
    isAddingChainsToProject,
    selectedProjectChainsPaths,
    setIsSelectedAll,
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

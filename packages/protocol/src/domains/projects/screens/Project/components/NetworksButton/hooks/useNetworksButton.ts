import { useCallback } from 'react';

import { selectBlockchainBySubchainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectChainsContext } from 'domains/projects/screens/Project/hooks/useProjectChainsContext';
import { useProjectSidebar } from 'domains/projects/screens/Project/components/ProjectSidebar';

import { useProjectSubchainPaths } from './useProjectSubchainPaths';

export const useNetworksButton = () => {
  const { selectedProjectChainsTabId } = useProjectChainsContext();

  const chain = useAppSelector(state =>
    selectBlockchainBySubchainId(state, selectedProjectChainsTabId!),
  );

  const {
    handleClose,
    handleOpen: handleSidebarOpen,
    isOpened: isSidebarOpened,
  } = useProjectSidebar();

  const {
    allSubchainPaths,
    handleAddChainsToProject,
    handleResetNetworksSelection,
    handleUpdateNetworksPaths,
    isAddingChainsToProject,
    selectedProjectSubchainPaths,
  } = useProjectSubchainPaths({ onAddSubchainsSuccess: handleClose });

  const onSidebarClose = useCallback(() => {
    handleResetNetworksSelection();
    handleClose();
  }, [handleClose, handleResetNetworksSelection]);

  return {
    allSubchainPaths,
    handleAddChainsToProject,
    handleUpdateNetworksPaths,
    handleSidebarOpen,
    isAddingChainsToProject,
    isSidebarOpened,
    onSidebarClose,
    selectedProjectSubchainPaths,
    chain,
  };
};

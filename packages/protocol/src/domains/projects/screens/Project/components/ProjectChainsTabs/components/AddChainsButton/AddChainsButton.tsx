import { Button } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AddChainsForm } from 'domains/projects/screens/Project/components/AddChainsForm';
import { ProjectSidebar } from 'domains/projects/screens/Project/components/ProjectSidebar';

import { useAddChainsButtonStyles } from './useAddChainsButtonStyles';
import { useAddChainsButton } from './hooks/useAddChainsButton';

export const AddChainsButton = () => {
  const {
    handleAddChainsToProject,
    handleSelectAllSubchainPaths,
    handleSidebarOpen,
    handleUnselectAllSubchainPaths,
    isAddingChainsToProject,
    isSidebarOpened,
    onSidebarClose,
    selectedProjectChainsPaths,
  } = useAddChainsButton();

  const { classes } = useAddChainsButtonStyles();

  return (
    <>
      <Button
        classes={classes}
        onClick={handleSidebarOpen}
        startIcon={<Plus />}
        variant="text"
      >
        {t('project.endpoints.add-chains-button')}
      </Button>
      <ProjectSidebar
        hasFooter
        isConfirmationDisabled={selectedProjectChainsPaths.length === 0}
        isConfirming={isAddingChainsToProject}
        isOpened={isSidebarOpened}
        onCancelButtonClick={onSidebarClose}
        onClose={onSidebarClose}
        onConfirmButtonClick={handleAddChainsToProject}
      >
        <AddChainsForm
          selectAllSubChainPaths={handleSelectAllSubchainPaths}
          unSelectAllSubChainPaths={handleUnselectAllSubchainPaths}
          selectedChainPaths={selectedProjectChainsPaths}
        />
      </ProjectSidebar>
    </>
  );
};

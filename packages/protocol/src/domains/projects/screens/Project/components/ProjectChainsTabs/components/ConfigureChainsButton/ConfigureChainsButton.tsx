import { Button, ButtonProps } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { AddChainsForm } from 'domains/projects/screens/Project/components/AddChainsForm';
import { ProjectSidebar } from 'domains/projects/screens/Project/components/ProjectSidebar';

import { useConfigureChainsButtonStyles } from './useConfigureChainsButtonStyles';
import { useConfigureChainsButton } from './hooks/useConfigureChainsButton';

interface IConfigureChainsButtonProps {
  classNames?: Record<string, string>;
  buttonProps?: ButtonProps;
  buttonText?: string;
}

export const ConfigureChainsButton = ({
  buttonProps,
  buttonText,
  classNames,
}: IConfigureChainsButtonProps) => {
  const {
    handleAddChainsToProject,
    handleSelectAllSubchainPaths,
    handleSidebarOpen,
    handleUnselectAllSubchainPaths,
    isAddingChainsToProject,
    isSidebarOpened,
    onSidebarClose,
    selectedProjectChainsPaths,
    setIsSelectedAll,
  } = useConfigureChainsButton();

  const { classes } = useConfigureChainsButtonStyles();

  return (
    <>
      <Button
        classes={classNames || classes}
        onClick={handleSidebarOpen}
        startIcon={<Plus />}
        variant="text"
        {...buttonProps}
      >
        {buttonText || t('project.endpoints.add-chains-button')}
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
          setIsSelectedAll={setIsSelectedAll}
          selectedChainPaths={selectedProjectChainsPaths}
        />
      </ProjectSidebar>
    </>
  );
};

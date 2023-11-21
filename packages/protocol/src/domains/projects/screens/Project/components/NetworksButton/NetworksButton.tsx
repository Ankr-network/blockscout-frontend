import { Button } from '@mui/material';
import { Gear } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ConfigureNetworksForm } from '../ConfigureNetworksForm';
import { ProjectSidebar } from '../ProjectSidebar';
import { useNetworksButton } from './hooks/useNetworksButton';
import { useNetworksButtonStyles } from './useNetworkButtonStyles';

export const NetworksButton = () => {
  const {
    allSubchainPaths,
    chain,
    handleAddChainsToProject,
    handleSidebarOpen,
    handleUpdateNetworksPaths,
    isAddingChainsToProject,
    isSidebarOpened,
    onSidebarClose,
    selectedProjectSubchainPaths,
  } = useNetworksButton();

  const { classes } = useNetworksButtonStyles();

  if (!chain || allSubchainPaths.length <= 1) {
    return null;
  }

  return (
    <>
      <Button
        className={classes.root}
        onClick={handleSidebarOpen}
        size="small"
        startIcon={<Gear />}
        variant="outlined"
      >
        {t('project.chain-details.networks-button')}
      </Button>
      <ProjectSidebar
        hasFooter
        isConfirmationDisabled={selectedProjectSubchainPaths.length === 0}
        isConfirming={isAddingChainsToProject}
        isOpened={isSidebarOpened}
        onCancelButtonClick={onSidebarClose}
        onClose={onSidebarClose}
        onConfirmButtonClick={handleAddChainsToProject}
      >
        <ConfigureNetworksForm
          allSubchainPaths={allSubchainPaths}
          chain={chain}
          handleUpdateNetworksPaths={handleUpdateNetworksPaths}
          selectedSubchainPaths={selectedProjectSubchainPaths}
        />
      </ProjectSidebar>
    </>
  );
};

import { useCallback, useMemo, useState } from 'react';

import { useJwtTokenManagerStyles } from './useJwtTokenManagerStyles';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useDialog } from 'modules/common/hooks/useDialog';
import { AddProjectDialog } from '../AddProjectDialog';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { DeleteProjectDialog } from '../DeleteProjectDialog';
import { ViewProjectDialog } from '../ViewProjectDialog.tsx';
import { JwtTokenManagerSkeleton } from './JwtTokenManagerSkeleton';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { AddProject } from '../AddProject';
import { UserEndpointsScrollbarWrapper } from 'modules/common/components/UserEndpointsScrollbar';

const CAN_ADD_PROJECT_FROM_JWT_MANAGER = false;

export const JwtTokenManager = () => {
  const { classes } = useJwtTokenManagerStyles();

  const { tokenIndex: selectedProjectIndex, handleSelectTokenIndex } =
    useSelectTokenIndex();

  const [openedProjectIndex, setOpenedProjectIndex] =
    useState(selectedProjectIndex);

  const {
    isLoading,
    hasConnectWalletMessage,
    shouldShowTokenManager,
    allowedAddProjectTokenIndex,
    jwtTokens,
    enableAddProject: canAddProject,
  } = useJwtTokenManager();

  const {
    isOpened: isAddProjectDialogOpened,
    onOpen: onOpenAddProjectDialog,
    onClose: onAddProjectDialogClose,
  } = useDialog();

  const {
    isOpened: isDeleteProjectOpened,
    onOpen: onDeleteProjectOpen,
    onClose: onDeleteProjectClose,
  } = useDialog();

  const {
    isOpened: isViewProjectOpened,
    onOpen: onProjectOpen,
    onClose: onProjectClose,
  } = useDialog();

  const handleDeleteProjectOpen = useCallback(() => {
    onProjectClose();
    onDeleteProjectOpen();
  }, [onProjectClose, onDeleteProjectOpen]);

  const openedProject = useMemo(
    () => jwtTokens.find(item => item.index === openedProjectIndex),
    [jwtTokens, openedProjectIndex],
  );

  const handleDeleteProjectSuccess = useCallback(() => {
    if (openedProjectIndex === selectedProjectIndex) {
      handleSelectTokenIndex(PRIMARY_TOKEN_INDEX);
    }
  }, [openedProjectIndex, selectedProjectIndex, handleSelectTokenIndex]);

  if (isLoading) return <JwtTokenManagerSkeleton />;

  if (!shouldShowTokenManager) return null;

  const shouldConnectWallet =
    hasConnectWalletMessage && selectedProjectIndex === PRIMARY_TOKEN_INDEX;

  return (
    <div className={classes.root}>
      <UserEndpointsScrollbarWrapper
        jwtTokens={jwtTokens}
        selectedProjectIndex={selectedProjectIndex}
        handleSelectTokenIndex={handleSelectTokenIndex}
        setOpenedProjectIndex={setOpenedProjectIndex}
        onProjectOpen={onProjectOpen}
      >
        {CAN_ADD_PROJECT_FROM_JWT_MANAGER &&
          jwtTokens.length > 0 &&
          canAddProject && (
            <GuardUserGroup blockName={BlockWithPermission.JwtManagerRead}>
              <AddProject onOpen={onOpenAddProjectDialog} />
            </GuardUserGroup>
          )}
      </UserEndpointsScrollbarWrapper>

      <AddProjectDialog
        allowedAddProjectTokenIndex={allowedAddProjectTokenIndex}
        isOpen={isAddProjectDialogOpened}
        handleClose={onAddProjectDialogClose}
      />
      <DeleteProjectDialog
        open={isDeleteProjectOpened}
        tokenIndex={openedProjectIndex}
        onSuccess={handleDeleteProjectSuccess}
        onClose={onDeleteProjectClose}
      />
      <ViewProjectDialog
        shouldConnectWallet={shouldConnectWallet}
        endpointToken={openedProject?.userEndpointToken}
        tokenIndex={openedProject?.index}
        isOpened={isViewProjectOpened}
        onClose={onProjectClose}
        handleDeleteProjectOpen={handleDeleteProjectOpen}
      />
    </div>
  );
};

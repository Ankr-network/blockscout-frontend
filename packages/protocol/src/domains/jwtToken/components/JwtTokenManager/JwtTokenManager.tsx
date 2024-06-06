import { useCallback, useMemo, useState } from 'react';

import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { UserEndpointsScrollbarWrapper } from 'modules/common/components/UserEndpointsScrollbar';
import { UserEndpointDialog } from 'modules/common/components/UserEndpointDialog.tsx';

import { AddProjectDialog } from '../AddProjectDialog';
import { DeleteProjectDialog } from '../DeleteProjectDialog';
import { JwtTokenManagerSkeleton } from './JwtTokenManagerSkeleton';
import { AddProject } from '../AddProject';
import { useJwtTokenManagerStyles } from './useJwtTokenManagerStyles';

const CAN_ADD_PROJECT_FROM_JWT_MANAGER = false;

export const JwtTokenManager = () => {
  const { classes } = useJwtTokenManagerStyles();

  const { handleSelectTokenIndex, tokenIndex: selectedProjectIndex } =
    useSelectTokenIndex();

  const [openedProjectIndex, setOpenedProjectIndex] =
    useState(selectedProjectIndex);

  const {
    allowedAddProjectTokenIndex,
    enableAddProject: canAddProject,
    hasConnectWalletMessage,
    isLoading,
    jwtTokens,
    shouldShowTokenManager,
  } = useJwtTokenManager();

  const {
    isOpened: isAddProjectDialogOpened,
    onClose: onAddProjectDialogClose,
    onOpen: onOpenAddProjectDialog,
  } = useDialog();

  const {
    isOpened: isDeleteProjectOpened,
    onClose: onDeleteProjectClose,
    onOpen: onDeleteProjectOpen,
  } = useDialog();

  const {
    isOpened: isViewProjectOpened,
    onClose: onProjectClose,
    onOpen: onProjectOpen,
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
      <UserEndpointDialog
        shouldConnectWallet={shouldConnectWallet}
        endpointToken={openedProject?.userEndpointToken}
        tokenIndex={openedProject?.index}
        name={openedProject?.name}
        isOpened={isViewProjectOpened}
        onClose={onProjectClose}
        handleDeleteProjectOpen={handleDeleteProjectOpen}
      />
    </div>
  );
};

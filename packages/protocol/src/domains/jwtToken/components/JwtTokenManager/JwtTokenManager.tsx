import { useCallback, useMemo, useState } from 'react';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { UserEndpointDialog } from 'modules/common/components/UserEndpointDialog.tsx';
import { UserEndpointsScrollbarWrapper } from 'modules/common/components/UserEndpointsScrollbar';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';

import { AddProject } from '../AddProject';
import { AddProjectDialog } from '../AddProjectDialog';
import { DeleteProjectDialog } from '../DeleteProjectDialog';
import { JwtTokenManagerSkeleton } from './JwtTokenManagerSkeleton';
import { useJwtTokenManagerStyles } from './useJwtTokenManagerStyles';

const CAN_ADD_PROJECT_FROM_JWT_MANAGER = false;

export const JwtTokenManager = () => {
  const { classes } = useJwtTokenManagerStyles();

  const { handleSelectTokenIndex, tokenIndex: selectedProjectIndex } =
    useSelectTokenIndex();

  const [openedProjectIndex, setOpenedProjectIndex] =
    useState(selectedProjectIndex);

  const { hasConnectWalletMessage } = useAuth();

  const {
    allowedAddProjectTokenIndex,
    enableAddProject: canAddProject,
    jwts,
    jwtsLoading,
    shouldShowTokenManager,
  } = useJWTsManager();

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
    () => jwts.find(({ index }) => index === openedProjectIndex),
    [jwts, openedProjectIndex],
  );

  const handleDeleteProjectSuccess = useCallback(() => {
    if (openedProjectIndex === selectedProjectIndex) {
      handleSelectTokenIndex(PRIMARY_TOKEN_INDEX);
    }
  }, [openedProjectIndex, selectedProjectIndex, handleSelectTokenIndex]);

  if (jwtsLoading) return <JwtTokenManagerSkeleton />;

  if (!shouldShowTokenManager) return null;

  const shouldConnectWallet =
    hasConnectWalletMessage && selectedProjectIndex === PRIMARY_TOKEN_INDEX;

  return (
    <div className={classes.root}>
      <UserEndpointsScrollbarWrapper
        jwtTokens={jwts}
        selectedProjectIndex={selectedProjectIndex}
        handleSelectTokenIndex={handleSelectTokenIndex}
        setOpenedProjectIndex={setOpenedProjectIndex}
        onProjectOpen={onProjectOpen}
      >
        {CAN_ADD_PROJECT_FROM_JWT_MANAGER && jwts.length > 0 && canAddProject && (
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

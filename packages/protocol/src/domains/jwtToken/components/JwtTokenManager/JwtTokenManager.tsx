import { useCallback, useState } from 'react';

import { useJwtTokenManagerStyles } from './useJwtTokenManagerStyles';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useDialog } from 'modules/common/hooks/useDialog';
import { AddProjectDialog } from '../AddProjectDialog';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';
import { DeleteProjectDialog } from '../DeleteProjectDialog';
import { ViewProjectDialog } from '../ViewProjectDialog.tsx';
import { JwtTokensScrollbar } from '../JwtTokensScrollbar';
import { JwtTokenManagerSkeleton } from './JwtTokenManagerSkeleton';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';

export const JwtTokenManager = () => {
  const { classes } = useJwtTokenManagerStyles();

  const { tokenIndex: selectedTokenIndex, handleTokenIndexSelect } =
    useSelectTokenIndex();

  const [viewTokenIndex, setViewTokenIndex] = useState(selectedTokenIndex);

  const {
    isLoading,
    hasConnectWalletMessage,
    shouldShowTokenManager,
    allowedAddProjectTokenIndex,
    jwtTokens,
    enableAddProject,
  } = useJwtTokenManager();

  const shouldConnectWallet =
    hasConnectWalletMessage && viewTokenIndex === PRIMARY_TOKEN_INDEX;

  const { isOpened, onOpen, onClose } = useDialog();

  const {
    isOpened: isDeleteProjectOpened,
    onOpen: onOpenDeleteProject,
    onClose: onCloseDeleteProject,
  } = useDialog();

  const {
    isOpened: isViewProjectOpened,
    onOpen: onOpenViewProject,
    onClose: onCloseViewProject,
  } = useDialog();

  const handleDeleteProject = useCallback(() => {
    onCloseViewProject();
    onOpenDeleteProject();
  }, [onCloseViewProject, onOpenDeleteProject]);

  if (isLoading) return <JwtTokenManagerSkeleton />;

  if (!shouldShowTokenManager) return null;

  return (
    <div className={classes.root}>
      <JwtTokensScrollbar
        jwtTokens={jwtTokens}
        selectedTokenIndex={selectedTokenIndex}
        onOpen={onOpen}
        setViewTokenIndex={setViewTokenIndex}
        onOpenViewProject={onOpenViewProject}
        handleTokenIndexSelect={handleTokenIndexSelect}
        enableAddProject={enableAddProject}
      />
      <AddProjectDialog
        allowedAddProjectTokenIndex={allowedAddProjectTokenIndex}
        isOpen={isOpened}
        handleClose={onClose}
      />
      <DeleteProjectDialog
        viewTokenIndex={viewTokenIndex}
        selectedTokenIndex={selectedTokenIndex}
        setSelectedIndex={handleTokenIndexSelect}
        open={isDeleteProjectOpened}
        onClose={onCloseDeleteProject}
      />
      <ViewProjectDialog
        shouldConnectWallet={shouldConnectWallet}
        token={jwtTokens.find(item => item.index === viewTokenIndex)}
        isOpened={isViewProjectOpened}
        onClose={onCloseViewProject}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

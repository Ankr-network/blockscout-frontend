import { useCallback, useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { useDialog } from 'modules/common/hooks/useDialog';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

export const useProjectName = (
  userEndpointToken: string,
  tokenIndex: number,
) => {
  const { hasConnectWalletMessage } = useAuth();

  const shouldConnectWallet =
    hasConnectWalletMessage && tokenIndex === PRIMARY_TOKEN_INDEX;

  const copyText = useMemo(
    () => shrinkAddress(userEndpointToken),
    [userEndpointToken],
  );

  const {
    isOpened: isViewProjectDialogOpened,
    onOpen: onOpenViewProjectDialog,
    onClose: onCloseViewProjectDialog,
  } = useDialog();

  const {
    isOpened: isDeleteProjectDialogOpened,
    onOpen: onOpenDeleteProjectDialog,
    onClose: onCloseDeleteProjectDialog,
  } = useDialog();

  const handleDeleteProjectOpen = useCallback(() => {
    onCloseViewProjectDialog();
    onOpenDeleteProjectDialog();
  }, [onCloseViewProjectDialog, onOpenDeleteProjectDialog]);

  return {
    copyText,
    shouldConnectWallet,
    isViewProjectDialogOpened,
    onCloseViewProjectDialog,
    handleDeleteProjectOpen,
    onOpenViewProjectDialog,
    isDeleteProjectDialogOpened,
    onCloseDeleteProjectDialog,
  };
};

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDialog } from 'modules/common/hooks/useDialog';
import {
  selectProjectsSettings,
  setProjectsSettings,
} from 'domains/projects/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useProjects } from 'domains/projects/hooks/useProjects';

export const useWelcomeDialog = (onCreateNewProject: () => void) => {
  const { isOpened, onOpen, onClose } = useDialog();

  const dispatch = useDispatch();

  const { address } = useAuth();

  const { isLoadingAllWhitelists, allWhitelists } = useProjects();

  const projectSettings = useSelector(selectProjectsSettings);

  useEffect(() => {
    if (
      !projectSettings[address] &&
      !isLoadingAllWhitelists &&
      allWhitelists &&
      allWhitelists.length === 1
    ) {
      onOpen();
    }
  }, [address, isLoadingAllWhitelists, allWhitelists, onOpen, projectSettings]);

  const handleCloseWelcomeModal = useCallback(() => {
    dispatch(setProjectsSettings({ address, shouldShowWelcomeDialog: true }));
    onClose();
  }, [onClose, address, dispatch]);

  const handleCreateNewProjectClick = useCallback(() => {
    onCreateNewProject();
    handleCloseWelcomeModal();
  }, [handleCloseWelcomeModal, onCreateNewProject]);

  return {
    isOpened,
    handleCreateNewProjectClick,
    handleSkipClick: handleCloseWelcomeModal,
  };
};

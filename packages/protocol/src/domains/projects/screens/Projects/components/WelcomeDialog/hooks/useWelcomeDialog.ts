import { useCallback, useEffect, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useProjects } from 'domains/projects/hooks/useProjects';

import { useWelcomeDialogSettings } from './useWelcomeDialogSettings';

export const useWelcomeDialog = () => {
  const { isOpened, onClose, onOpen } = useDialog();
  const { setSettings, wasWelcomeDialogShown } = useWelcomeDialogSettings();
  const { allWhitelists, isLoadingAllWhitelists } = useProjects({
    skipFetchingProjects: false,
  });

  useEffect(() => {
    const hasProjects =
      !isLoadingAllWhitelists && allWhitelists && allWhitelists.length > 1;

    if (hasProjects && !wasWelcomeDialogShown) {
      setSettings();
    }
  }, [
    isLoadingAllWhitelists,
    allWhitelists,
    setSettings,
    wasWelcomeDialogShown,
  ]);

  const shouldOpenDialog = useMemo(() => {
    return (
      !wasWelcomeDialogShown &&
      !isLoadingAllWhitelists &&
      allWhitelists &&
      allWhitelists.length === 1
    );
  }, [isLoadingAllWhitelists, allWhitelists, wasWelcomeDialogShown]);

  useEffect(() => {
    if (shouldOpenDialog) {
      onOpen();
    }
  }, [shouldOpenDialog, onOpen]);

  const handleCloseWelcomeModal = useCallback(() => {
    setSettings();
    onClose();
  }, [onClose, setSettings]);

  const handleCreateNewProjectClick = useCallback(() => {
    handleCloseWelcomeModal();
  }, [handleCloseWelcomeModal]);

  return {
    isOpened,
    handleCreateNewProjectClick,
    handleSkipClick: handleCloseWelcomeModal,
  };
};

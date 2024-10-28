import { useCallback, useEffect } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useProjectsWhitelists } from 'domains/projects/hooks/useProjectsWhitelists';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useWelcomeDialogSettings } from './useWelcomeDialogSettings';

export const useWelcomeDialog = () => {
  const { isOpened, onClose, onOpen } = useDialog();
  const { setSettings, wasWelcomeDialogShown } = useWelcomeDialogSettings();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isLoading: jwtsLoading, jwtTokens: jwts } = useJwtTokenManager();

  const hasNoJWTs = jwts.length === 0;
  const skipFetching = hasNoJWTs || jwtsLoading;

  const { loading: projectsWhitelistsLoading, projectsWhitelists } =
    useProjectsWhitelists({ group, projects: jwts, skipFetching });

  const hasProjects =
    !projectsWhitelistsLoading && projectsWhitelists.length > 1;

  useEffect(() => {
    if (hasProjects && !wasWelcomeDialogShown) {
      setSettings();
    }
  }, [hasProjects, setSettings, wasWelcomeDialogShown]);

  const shouldOpenDialog =
    !wasWelcomeDialogShown &&
    !projectsWhitelistsLoading &&
    projectsWhitelists.length === 1;

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

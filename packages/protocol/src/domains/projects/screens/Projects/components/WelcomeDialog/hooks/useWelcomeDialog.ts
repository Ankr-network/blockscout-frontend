import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useDialog } from 'modules/common/hooks/useDialog';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import {
  selectProjectsSettings,
  setProjectsSettings,
} from 'domains/projects/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useProjects } from 'domains/projects/hooks/useProjects';

export const useWelcomeDialog = () => {
  const { isOpened, onOpen, onClose } = useDialog();

  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleCreateNewProjectClick = useCallback(() => {
    dispatch(setProjectsSettings({ address, shouldShowWelcomeDialog: true }));
    history.push(ProjectsRoutesConfig.newProject.generatePath());
  }, [history, dispatch, address]);

  const handleSkipClick = useCallback(() => {
    dispatch(setProjectsSettings({ address, shouldShowWelcomeDialog: true }));
    onClose();
  }, [onClose, address, dispatch]);

  return {
    isOpened,
    handleCreateNewProjectClick,
    handleSkipClick,
  };
};

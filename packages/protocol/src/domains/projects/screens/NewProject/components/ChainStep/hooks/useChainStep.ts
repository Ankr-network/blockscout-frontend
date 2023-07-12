import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-final-form';
import { t } from '@ankr.com/common';

import { ChainStepFields } from 'domains/projects/store';
import { useAddProject } from 'domains/jwtToken/hooks/useAddProject';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

export const useChainStep = () => {
  const { change, getState } = useForm<NewProjectFormValues>();

  const { tokenIndex: projectTokenIndex } = getState().values;

  const savedTokenIndex = useRef(projectTokenIndex);

  const { isLoading, allowedAddProjectTokenIndex, enableAddProject } =
    useJwtTokenManager(true);

  const currentTokenIndex =
    savedTokenIndex.current || allowedAddProjectTokenIndex;

  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !enableAddProject) {
      dispatch(
        NotificationActions.showNotification({
          message: t('projects.new-project.notifications.limit'),
          severity: 'error',
        }),
      );

      push(ProjectsRoutesConfig.projects.generatePath());
    }
  }, [
    isLoading,
    allowedAddProjectTokenIndex,
    push,
    dispatch,
    enableAddProject,
  ]);

  const { projectName } = useAddProject(currentTokenIndex);

  useEffect(() => {
    change(ChainStepFields.projectName, projectName);
    change(ChainStepFields.tokenIndex, currentTokenIndex);
  }, [change, projectName, currentTokenIndex]);

  return {
    isLoading,
  };
};

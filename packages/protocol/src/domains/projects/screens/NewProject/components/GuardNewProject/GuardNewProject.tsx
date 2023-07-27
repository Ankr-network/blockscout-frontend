import { useHistory } from 'react-router';
import { useCallback, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';

interface GuardNewProjectProps {
  children: ReactNode;
}

export const GuardNewProject = ({ children }: GuardNewProjectProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { project } = useProjectConfig();
  const { enableAddProject, isLoaded } = useJwtTokenManager(true);

  const showNotification = useCallback(() => {
    dispatch(
      NotificationActions.showNotification({
        message: t('projects.new-project.notifications.limit'),
        severity: 'error',
      }),
    );
  }, [dispatch]);

  const hasAccess =
    enableAddProject ||
    typeof project[NewProjectStep.Chain]?.tokenIndex === 'number';

  useEffect(() => {
    if (!hasAccess && isLoaded) {
      history.replace(ProjectsRoutesConfig.projects.generatePath());

      showNotification();
    }
  }, [hasAccess, showNotification, history, isLoaded]);

  return isLoaded && hasAccess ? <>{children}</> : null;
};

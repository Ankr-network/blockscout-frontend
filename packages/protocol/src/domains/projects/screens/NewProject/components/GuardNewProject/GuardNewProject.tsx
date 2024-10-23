import { ReactNode, useCallback, useEffect } from 'react';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { OverlaySpinner } from '@ankr.com/ui';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useOnMount } from 'modules/common/hooks/useOnMount';

interface GuardNewProjectProps {
  children: ReactNode;
}

export const GuardNewProject = ({ children }: GuardNewProjectProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleResetConfig, project, projectStep } = useProjectConfig();
  const { enableAddProject, isLoaded } = useJwtTokenManager();

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
    typeof project[NewProjectStep.General]?.tokenIndex === 'number' ||
    projectStep === NewProjectStep.Chains ||
    projectStep === NewProjectStep.Whitelist;

  const isCheckedOut = project?.[NewProjectStep.Whitelist]?.isCheckedOut;

  useEffect(() => {
    if (!hasAccess && isLoaded) {
      history.replace(ProjectsRoutesConfig.projects.generatePath());

      showNotification();
    }
  }, [hasAccess, showNotification, history, isLoaded]);

  useOnMount(() => {
    if (isCheckedOut) {
      history.replace(ProjectsRoutesConfig.projects.generatePath());
      handleResetConfig();
    }
  });

  if (!hasAccess) {
    return <OverlaySpinner />;
  }

  return <>{children}</>;
};

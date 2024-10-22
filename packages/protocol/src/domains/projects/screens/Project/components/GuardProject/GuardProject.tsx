import { useHistory } from 'react-router';
import { useEffect, ReactNode } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';

import { useProjectBreadcrumbs } from '../../hooks/useProjectBreadcrumbs';

interface GuardProjectProps {
  children: ReactNode;
}

export const GuardProject = ({ children }: GuardProjectProps) => {
  const history = useHistory();
  const { isLoaded, project } = useSelectedProject();

  useEffect(() => {
    console.log({ GuardProjectUseEffect: true, project, isLoaded });
    if (!project && isLoaded) {
      history.replace(ProjectsRoutesConfig.projects.generatePath());
    }
  }, [project, history, isLoaded]);

  useProjectBreadcrumbs(project);

  return isLoaded && project ? <>{children}</> : <OverlaySpinner />;
};

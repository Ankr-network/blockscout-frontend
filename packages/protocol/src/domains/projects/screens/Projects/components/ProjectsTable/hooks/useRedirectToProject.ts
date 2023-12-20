import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { ProjectTable } from 'domains/projects/utils/getAllProjects';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

export const useRedirectToProject = () => {
  const { push } = useHistory();

  return useCallback(
    (rowData: ProjectTable) => {
      const { userEndpointToken } = rowData;

      if (rowData.projectStatus.draft) {
        return push(ProjectsRoutesConfig.newProject.generatePath());
      }

      return push(ProjectsRoutesConfig.project.generatePath(userEndpointToken));
    },
    [push],
  );
};

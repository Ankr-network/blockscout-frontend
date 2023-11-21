import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

export const useProjectBreadcrumbs = (jwtToken?: JwtManagerToken) => {
  const breadcrumbs = [
    {
      title: t(ProjectsRoutesConfig.projects.breadcrumbs),
      link: ProjectsRoutesConfig.projects.generatePath(),
    },
    {
      title: jwtToken ? jwtToken.name || renderProjectName(jwtToken.index) : '',
    },
  ];

  useSetBreadcrumbs(breadcrumbs);
};

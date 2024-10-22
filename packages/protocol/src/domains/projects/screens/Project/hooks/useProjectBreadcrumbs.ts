import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { BreadcrumbItem } from 'uiKit/Breadcrumbs';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

export const useProjectBreadcrumbs = (jwtToken?: JWT) => {
  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const initialBreadcrumbs: BreadcrumbItem[] = [
      {
        title: t(ProjectsRoutesConfig.projects.breadcrumbs),
        link: ProjectsRoutesConfig.projects.generatePath(),
      },
    ];

    if (jwtToken) {
      initialBreadcrumbs.push({
        title: jwtToken.name || renderProjectName(jwtToken.index),
      });
    }

    return initialBreadcrumbs;
  }, [jwtToken]);

  useSetBreadcrumbs(breadcrumbs);
};

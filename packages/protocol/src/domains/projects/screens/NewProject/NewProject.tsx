import { t } from '@ankr.com/common';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

import { NewProject } from './components/NewProject';
import { GuardNewProject } from './components/GuardNewProject';

export const NewProjectPage = () => {
  useSetBreadcrumbs([
    {
      title: t(ProjectsRoutesConfig.newProject.breadcrumbs),
    },
  ]);

  return (
    <GuardUserGroup
      shouldRedirect
      blockName={BlockWithPermission.JwtManagerWrite}
    >
      <GuardNewProject>
        <NewProject />
      </GuardNewProject>
    </GuardUserGroup>
  );
};

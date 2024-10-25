import { t } from '@ankr.com/common';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { Projects } from './components/Projects';

export const ProjectsPage = () => {
  useSetBreadcrumbs([
    {
      title: t(ProjectsRoutesConfig.projects.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  return (
    <GuardUserGroup
      shouldRedirect
      blockName={BlockWithPermission.JwtManagerRead}
      shouldHideAlert
    >
      <Projects />
    </GuardUserGroup>
  );
};

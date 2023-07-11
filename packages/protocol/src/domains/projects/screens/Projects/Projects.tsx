import { t } from '@ankr.com/common';

import { useProjects } from 'domains/projects/hooks/useProjects';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectAllProjects } from 'domains/projects/store';
import { Search } from 'modules/common/components/Search';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useAppSelector } from 'store/useAppSelector';
import { AddProjectButton } from './components/AddProjectButton';
import { ProjectHeader } from './components/ProjectHeader';
import { ProjectTable } from './components/ProjectTable';

export const Projects = () => {
  useSetBreadcrumbs([
    {
      title: t(ProjectsRoutesConfig.projects.breadcrumbs),
    },
  ]);

  const {
    isDevRole,
    canAddProject,
    isLoading,
    searchContent,
    setSearchContent,
  } = useProjects();

  const allProjects = useAppSelector(selectAllProjects);

  const hasProjectButton = !isDevRole && !isLoading && canAddProject;

  return (
    <>
      <ProjectHeader
        search={
          <Search
            searchContent={searchContent}
            setSearchContent={setSearchContent}
          />
        }
      />
      <ProjectTable
        searchContent={searchContent}
        data={allProjects}
        isLoading={isLoading}
      />
      {hasProjectButton && <AddProjectButton />}
    </>
  );
};

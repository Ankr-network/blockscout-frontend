import { useProjects } from 'domains/projects/hooks/useProjects';
import { selectAllProjects } from 'domains/projects/store';
import { Search } from 'modules/common/components/Search';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';

import { AddProjectButton } from '../AddProjectButton';
import { ProjectHeader } from '../ProjectHeader';
import { ProjectTable } from '../ProjectTable';

export const Projects = () => {
  const [searchContent, setSearchContent] = useSearch();

  const { canEditProject } = useProjectConfig();
  const { canAddProject, isLoading } = useProjects();
  const allProjects = useAppSelector(selectAllProjects);

  const hasProjectButton = (!isLoading && canAddProject) || canEditProject;

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
      {hasProjectButton && <AddProjectButton canEditProject={canEditProject} />}
    </>
  );
};

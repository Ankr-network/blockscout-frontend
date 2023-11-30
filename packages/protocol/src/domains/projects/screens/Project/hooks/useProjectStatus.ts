import { useEffect } from 'react';

import { useLazyFetchJwtTokenStatusQuery } from 'domains/jwtToken/action/fetchJwtTokenStatus';
import { ProjectStatus } from 'domains/projects/utils/getAllProjects';
import { useAppSelector } from 'store/useAppSelector';
import { selectProjectsStatuses } from 'domains/projects/store/WhitelistsSelector';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { selectIsInactiveStatus } from 'domains/auth/store';

interface UseProjectStatus {
  projectStatus: ProjectStatus;
  isLoading: boolean;
}

export const useProjectStatus = (): UseProjectStatus => {
  const allProjects = useAppSelector(selectProjectsStatuses);
  const [
    fetchTokenStatus,
    { data: projectStatusData = {} as ProjectStatus, isLoading, isFetching },
  ] = useLazyFetchJwtTokenStatusQuery();

  const { project, isLoaded } = useSelectedProject();

  const currentProject = allProjects.find(
    ({ userEndpointToken }) => userEndpointToken === project?.userEndpointToken,
  );
  const savedStatus = currentProject?.status;

  useEffect(() => {
    if (isLoaded && project && !savedStatus) {
      fetchTokenStatus({ userEndpointToken: project.userEndpointToken });
    }
  }, [isLoaded, project, fetchTokenStatus, savedStatus]);

  const projectStatus = savedStatus || projectStatusData;

  const isInactive = useAppSelector(selectIsInactiveStatus);

  if (isInactive) {
    return {
      projectStatus: {
        ...projectStatus,
        suspended: isInactive || projectStatus.suspended,
      },
      isLoading: isLoading || isFetching,
    };
  }

  return { projectStatus, isLoading: isLoading || isFetching };
};

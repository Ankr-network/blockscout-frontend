import { useMemo } from 'react';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectProjectsPageRequestsLoading } from 'domains/projects/store/WhitelistsSelector';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchJWTs } from 'domains/jwtToken/hooks/useFetchJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const { useParams } = ProjectsRoutesConfig.project;

export const useSelectedProject = () => {
  const { projectId: userEndpointToken } = useParams();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const {
    isLoading,
    jwts: projects,
    jwtsState: { isUninitialized },
  } = useFetchJWTs({ group });

  const isLoadingProjectsRequests = useAppSelector(
    selectProjectsPageRequestsLoading,
  );

  const project = useMemo(() => {
    if (userEndpointToken) {
      return projects.find(
        item =>
          item.userEndpointToken.toLowerCase() ===
          userEndpointToken.toLowerCase(),
      );
    }

    return undefined;
  }, [projects, userEndpointToken]);

  const isLoaded = !isUninitialized && !isLoading && !isLoadingProjectsRequests;

  return { isLoaded, project };
};

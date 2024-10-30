import { useEffect, useMemo } from 'react';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useLazyFetchAllJwtTokenRequestsQuery } from 'domains/jwtToken/action/getAllJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { selectProjectsPageRequestsLoading } from 'domains/projects/store/WhitelistsSelector';

const { useParams } = ProjectsRoutesConfig.project;

export const useSelectedProject = () => {
  const { projectId: userEndpointToken } = useParams();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetchAllJwtTokenRequests, { isLoading, isUninitialized }] =
    useLazyFetchAllJwtTokenRequestsQuery();

  const isLoadingProjectsRequests = useAppSelector(
    selectProjectsPageRequestsLoading,
  );

  useEffect(() => {
    const preferCacheValue = true;

    fetchAllJwtTokenRequests({ loading: false, group }, preferCacheValue);
  }, [fetchAllJwtTokenRequests, group]);

  const projects = useAppSelector(selectJwtTokens);

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

  return {
    project,
    userEndpointToken,
    isLoaded: !isUninitialized && !isLoading && !isLoadingProjectsRequests,
  };
};

import { useMemo } from 'react';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

const { useParams } = ProjectsRoutesConfig.project;

export const useSelectedProject = () => {
  const { projectId: userEndpointToken } = useParams();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const {
    jwts: projects,
    state: { isError, isSuccess },
  } = useJWTs({ group });

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

  const isLoaded = isError || isSuccess;

  return { isLoaded, project };
};

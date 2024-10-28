import { useMemo } from 'react';

import { ProjectStatus } from 'domains/projects/utils/getAllProjects';
import { selectIsInactiveStatus } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJWTStatus } from 'domains/jwtToken/hooks/useJWTStatus';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface UseProjectStatus {
  projectStatus: ProjectStatus;
  isLoading: boolean;
}

export const useProjectStatus = (): UseProjectStatus => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isLoaded, project } = useSelectedProject();

  const { jwtStatus: projectStatusData, loading: jwtStatusLoading } =
    useJWTStatus({
      group,
      skipFetching: Boolean(!project || !isLoaded),
      // We need to assert non null type to fit selector interface
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      userEndpointToken: project?.userEndpointToken!,
    });

  const { isFreePremium, loading: authLoading } = useAuth();

  const projectStatus = useMemo(() => {
    if (isFreePremium && !authLoading) {
      return {
        ...projectStatusData,
        suspended: false,
      };
    }

    return projectStatusData;
  }, [authLoading, isFreePremium, projectStatusData]);

  const isInactive = useAppSelector(selectIsInactiveStatus);

  if (isInactive) {
    return {
      projectStatus: {
        ...projectStatus,
        suspended: isInactive || projectStatus.suspended,
      },
      isLoading: jwtStatusLoading,
    };
  }

  return { projectStatus, isLoading: jwtStatusLoading || authLoading };
};

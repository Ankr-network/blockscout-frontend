import { useMemo } from 'react';

import { selectDraftUserEndpointToken } from 'domains/projects/store';
import { selectIsInactiveStatus } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useJWTStatus } from 'domains/jwtToken/hooks/useJWTStatus';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjectStatus = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const { isLoaded, project } = useSelectedProject();
  const isDraft = Boolean(
    project && project.userEndpointToken === draftUserEndpointToken,
  );

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

  return { projectStatus, isDraft, isLoading: jwtStatusLoading || authLoading };
};

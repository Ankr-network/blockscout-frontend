import { useEffect } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { chainsFetchProjectStatsFor1h } from 'domains/projects/actions/fetchProjectStatsFor1h';
import { chainsFetchProjectStatsFor24h } from 'domains/projects/actions/fetchProjectStatsFor24h';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjectStatsInitialization = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { projectId: userEndpointToken } =
    ProjectsRoutesConfig.project.useParams();

  const [fetchProjectStatsFor1h] = useQueryEndpoint(
    chainsFetchProjectStatsFor1h,
  );

  const [fetchProjectStatsFor24h] = useQueryEndpoint(
    chainsFetchProjectStatsFor24h,
  );

  useEffect(() => {
    if (userEndpointToken) {
      fetchProjectStatsFor1h({ userEndpointToken, group });
      fetchProjectStatsFor24h({ userEndpointToken, group });
    }
    // token is changing on group change, so group param is removed to avoid double fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjectStatsFor1h, fetchProjectStatsFor24h, userEndpointToken]);
};

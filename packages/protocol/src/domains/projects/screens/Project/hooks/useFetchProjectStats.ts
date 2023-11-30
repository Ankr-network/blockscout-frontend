import { useLayoutEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useLazyFetchLastMonthStatsQuery } from 'modules/stats/actions/fetchLastMonthStats';

export const useFetchProjectStats = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { projectId: userEndpointToken } =
    ProjectsRoutesConfig.project.useParams();

  const [fetchStats, { data: { stats = {} } = {}, isLoading }] =
    useLazyFetchLastMonthStatsQuery();

  useLayoutEffect(() => {
    fetchStats({
      userEndpointToken,
      group,
    });
  }, [fetchStats, group, userEndpointToken]);

  return { stats, isLoading };
};

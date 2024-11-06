import { PrivateStatsInterval } from 'multirpc-sdk';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { usePrivateStatsByToken } from 'modules/stats/hooks/usePrivateStatsByToken';

export const useFetchProjectStats = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { projectId: userEndpointToken } =
    ProjectsRoutesConfig.project.useParams();

  const {
    loading,
    privateStats: { stats = {} },
  } = usePrivateStatsByToken({
    group,
    interval: PrivateStatsInterval.MONTH,
    skipFetching: !userEndpointToken,
    token: userEndpointToken!,
  });

  return { loading, stats };
};

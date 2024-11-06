import { Timeframe } from '@ankr.com/chains-list';

import { selectCurrentProjectsPieChartData } from 'domains/dashboard/store/selectors/v1';
import { selectUserEndpointTokens } from 'domains/jwtToken/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';
import { useProjectsStats } from 'domains/dashboard/hooks/useProjectsStats';

export interface IUseProjectsDataProps {
  timeframe: Timeframe;
}

export const useProjectsData = ({ timeframe }: IUseProjectsDataProps) => {
  const { group, interval } = usePrivateStatsParams({ timeframe });

  const { jwts: projects, loading: projectsLoading } = useJWTs({ group });
  const hasProjects = projects.length > 0;
  const tokens = useAppSelector(state =>
    selectUserEndpointTokens(state, { group }),
  );

  const { loading: privateStatsLoading, privateStats } = usePrivateStats({
    group,
    interval,
  });

  const { loading: projectsStatsLoading } = useProjectsStats({
    group,
    interval,
    skipFetching: projectsLoading || !hasProjects,
    tokens,
  });

  const pieChartData = useAppSelector(state =>
    selectCurrentProjectsPieChartData(state, { group, interval }),
  );

  const totalRequests = privateStats.total_requests ?? 0;
  const loading =
    projectsLoading || privateStatsLoading || projectsStatsLoading;

  return { loading, pieChartData, totalRequests };
};

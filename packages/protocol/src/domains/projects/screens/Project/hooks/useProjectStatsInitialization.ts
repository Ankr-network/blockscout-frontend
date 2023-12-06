import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useFetchProjectChainsStatsFor1hQuery } from 'domains/projects/actions/fetchProjectChainsStatsFor1h';
import { useFetchProjectChainsStatsFor24hQuery } from 'domains/projects/actions/fetchProjectChainsStatsFor24h';
import { useFetchProjectTotalRequestsForLastTwoDaysQuery } from 'domains/projects/actions/fetchProjectTotalRequestsForLastTwoDays';
import { useFetchProjectTotalRequestsForLastTwoHoursQuery } from 'domains/projects/actions/fetchProjectTotalRequestsForLastTwoHours';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjectStatsInitialization = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { projectId: token } = ProjectsRoutesConfig.project.useParams();

  const statsParams = useMemo(
    () => (token ? { group, token } : skipToken),
    // token is changing on group change, so group param is removed to avoid
    // double fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token],
  );

  useFetchProjectTotalRequestsForLastTwoHoursQuery(statsParams);
  useFetchProjectTotalRequestsForLastTwoDaysQuery(statsParams);
  useFetchProjectChainsStatsFor1hQuery(statsParams);
  useFetchProjectChainsStatsFor24hQuery(statsParams);
};

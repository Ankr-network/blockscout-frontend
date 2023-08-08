import { useCallback, useEffect, useState } from 'react';

import { useFetchStatsByRangeMutation } from 'domains/projects/actions/fetchStatsByRange';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { Project, StatsData } from 'domains/projects/utils/getAllProjects';

import { useColumns } from './useColumns';

export const useProjectTable = (projectData: Project[]) => {
  const [fetchStatsByRangeQuery, { isLoading }] =
    useFetchStatsByRangeMutation();
  const [tableData, setTableData] = useState(projectData);

  const { selectedGroupAddress } = useSelectedUserGroup();

  const { jwtTokens } = useJwtTokenManager();
  const { columns } = useColumns(isLoading);

  const fetchStats = useCallback(async () => {
    const activityData = await Promise.all<StatsData>(
      jwtTokens.map(async jwtToken => {
        const data = await fetchStatsByRangeQuery({
          group: selectedGroupAddress,
          userEndpointToken: jwtToken.userEndpointToken,
        });

        // @ts-ignore
        const hasError = data.error;

        return {
          statsByRange: hasError ? {} : data,
          hasError,
        };
      }),
    );

    return activityData;
  }, [fetchStatsByRangeQuery, selectedGroupAddress, jwtTokens]);

  useEffect(() => {
    async function fetchData() {
      const statsDatas = await fetchStats();

      const result = projectData.map((item, index) => ({
        ...item,
        statsData: statsDatas[index],
      }));

      setTableData(result);
    }

    if (jwtTokens.length > 0) {
      fetchData();
    }
  }, [jwtTokens, fetchStats, projectData]);

  return { columns, tableData };
};

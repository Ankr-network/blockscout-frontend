import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import { selectAllTimeTotalRequestsNumber } from 'domains/dashboard/store/selectors/v1';
import { selectPrivateTotalStatsLoading } from 'modules/stats/actions/fetchPrivateTotalStats';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';

import { useTop10Stats } from './useTop10Stats';
import { useRequestsData } from './useRequestsData';
import { useRequestsDataBySelectedProject } from './useRequestsDataBySelectedProject';

export const useAllChainsData = (timeframe: Timeframe) => {
  const { group, selectedProject } = usePrivateStatsParams({ timeframe });

  const allTimeTotalRequestsNumber = useAppSelector(state =>
    selectAllTimeTotalRequestsNumber(state, { group }),
  );

  const totalStatsLoading = useAppSelector(state =>
    selectPrivateTotalStatsLoading(state, { group }),
  );

  const requestsData = useRequestsData({ timeframe });
  const requestsDataBySelectedProject = useRequestsDataBySelectedProject({
    timeframe,
  });

  const {
    loading: privateStatsLoading,
    requests,
    totalRequestsNumber,
  } = selectedProject ? requestsDataBySelectedProject : requestsData;

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  const {
    countries,
    ipRequests,
    loading: top10StatsLoading,
  } = useTop10Stats(timeframe);

  return {
    allTimeTotalRequestsNumber,
    countries,
    ipRequests,
    privateStatsLoading,
    requestsChartData,
    top10StatsLoading,
    totalRequestsNumber,
    totalStatsLoading,
  };
};

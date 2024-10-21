import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectAllTimeTotalRequestsNumber,
  selectTotalRequests,
  selectTotalRequestsNumber,
  selectTotalStatsLoading,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsLoading } from 'domains/chains/actions/private/fetchPrivateStats';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';

import { useTop10Stats } from './useTop10Stats';

export const useAllChainsData = (timeframe: Timeframe) => {
  const { privateStatsParams } = usePrivateStatsParams({ timeframe });

  const allTimeTotalRequestsNumber = useAppSelector(
    selectAllTimeTotalRequestsNumber,
  );
  const requests = useAppSelector(state =>
    selectTotalRequests(state, privateStatsParams),
  );

  const privateStatsLoading = useAppSelector(state =>
    selectPrivateStatsLoading(state, privateStatsParams),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumber(state, privateStatsParams),
  );

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  const {
    countries,
    ipRequests,
    isLoading: top10StatsLoading,
  } = useTop10Stats(timeframe);

  const totalStatsLoading = useAppSelector(selectTotalStatsLoading);

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

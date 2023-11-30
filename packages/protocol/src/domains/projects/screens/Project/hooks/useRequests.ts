import { useMemo } from 'react';

import { USAGE_SHORT_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';
import { useTimeframe } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useTimeframe';
import { Timeframe } from 'modules/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectProjectStatsFor1h,
  selectProjectStatsFor24h,
  selectProjectTotalRequestsFor1h,
  selectProjectTotalRequestsFor24h,
} from 'domains/projects/store';

export const useRequests = () => {
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: USAGE_SHORT_TIMEFRAME_LIST,
  });

  const { data: lastHourRequestsData, isLoading: isLoadingLastHourRequests } =
    useAppSelector(selectProjectStatsFor1h);

  const lastHourRequestsTotalCount = lastHourRequestsData?.total_requests || 0;

  const { data: lastDayRequestsData, isLoading: isLoadingLastDayRequests } =
    useAppSelector(selectProjectStatsFor24h);

  const lastDayRequestsTotalCount = lastDayRequestsData?.total_requests || 0;

  const lastHourRequests = useAppSelector(selectProjectTotalRequestsFor1h);
  const lastDayRequests = useAppSelector(selectProjectTotalRequestsFor24h);

  const requests =
    timeframe === Timeframe.Day ? lastDayRequests : lastHourRequests;

  const totalRequestsCount =
    timeframe === Timeframe.Day
      ? lastDayRequestsTotalCount
      : lastHourRequestsTotalCount;

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  return {
    timeframe,
    timeframeTabs,
    isLoading: isLoadingLastHourRequests || isLoadingLastDayRequests,
    requestsChartData,
    totalRequestsCount,
  };
};

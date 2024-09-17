import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { USAGE_SHORT_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectProjectTotalRequestsCountForLastDay,
  selectProjectTotalRequestsCountForLastHour,
  selectProjectTotalRequestsForLastDay,
  selectProjectTotalRequestsForLastHour,
  selectProjectTotalRequestsForLastTwoDaysLoading,
  selectProjectTotalRequestsForLastTwoHoursLoading,
  selectRelativeChangeForLastDay,
  selectRelativeChangeForLastHour,
} from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useTimeframe } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useTimeframe';

export const useRequests = () => {
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: USAGE_SHORT_TIMEFRAME_LIST,
  });

  const lastHourRequests = useAppSelector(
    selectProjectTotalRequestsForLastHour,
  );
  const lastHourRequestsCount = useAppSelector(
    selectProjectTotalRequestsCountForLastHour,
  );
  const lastHourRelativeChange = useAppSelector(
    selectRelativeChangeForLastHour,
  );
  const lastHourRequestsLoading = useAppSelector(
    selectProjectTotalRequestsForLastTwoHoursLoading,
  );

  const lastDayRequests = useAppSelector(selectProjectTotalRequestsForLastDay);
  const lastDayRequestsCount = useAppSelector(
    selectProjectTotalRequestsCountForLastDay,
  );
  const lastDayRelativeChange = useAppSelector(selectRelativeChangeForLastDay);
  const lastDayRequestsLoading = useAppSelector(
    selectProjectTotalRequestsForLastTwoDaysLoading,
  );

  const [requests, requestsCount, relativeChange] =
    timeframe === Timeframe.Day
      ? [lastDayRequests, lastDayRequestsCount, lastDayRelativeChange]
      : [lastHourRequests, lastHourRequestsCount, lastHourRelativeChange];

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  const isLoading = lastHourRequestsLoading || lastDayRequestsLoading;

  return {
    isLoading,
    relativeChange,
    requestsChartData,
    requestsCount,
    timeframe,
    timeframeTabs,
  };
};

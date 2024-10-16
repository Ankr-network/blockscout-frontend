import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { USAGE_SHORT_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectProjectTotalRequestsCountForLastDay,
  selectProjectTotalRequestsCountForLastHour,
  selectProjectTotalRequestsForLastDay,
  selectProjectTotalRequestsForLastHour,
  selectRelativeChangeForLastDay,
  selectRelativeChangeForLastHour,
} from 'domains/projects/store';
import { selectProjectTotalRequestsForLastTwoHoursLoading } from 'domains/projects/actions/fetchProjectTotalRequestsForLastTwoHours';
import { useAppSelector } from 'store/useAppSelector';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';
import { useProjectStatsParams } from 'modules/stats/hooks/useProjectStatsParams';
import { selectProjectTotalRequestsForLastTwoDaysLoading } from 'domains/projects/actions/fetchProjectTotalRequestsForLastTwoDays';

export const useRequests = () => {
  const { projectId: userEndpointToken } =
    ProjectsRoutesConfig.project.useParams();

  const { statsParams } = useProjectStatsParams(userEndpointToken);

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: USAGE_SHORT_TIMEFRAME_LIST,
  });

  const lastHourRequests = useAppSelector(state =>
    selectProjectTotalRequestsForLastHour(state, statsParams),
  );
  const lastHourRequestsCount = useAppSelector(state =>
    selectProjectTotalRequestsCountForLastHour(state, statsParams),
  );
  const lastHourRelativeChange = useAppSelector(state =>
    selectRelativeChangeForLastHour(state, statsParams),
  );
  const lastHourRequestsLoading = useAppSelector(state =>
    selectProjectTotalRequestsForLastTwoHoursLoading(state, statsParams),
  );

  const lastDayRequests = useAppSelector(state =>
    selectProjectTotalRequestsForLastDay(state, statsParams),
  );
  const lastDayRequestsCount = useAppSelector(state =>
    selectProjectTotalRequestsCountForLastDay(state, statsParams),
  );
  const lastDayRelativeChange = useAppSelector(state =>
    selectRelativeChangeForLastDay(state, statsParams),
  );
  const lastDayRequestsLoading = useAppSelector(state =>
    selectProjectTotalRequestsForLastTwoDaysLoading(state, statsParams),
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

import { StatsByRangeDuration, StatsByRangeTimeframe } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import {
  IFetchPrivateTotalStatsByRangeParams,
  selectPrivateTotalStatsByRangeLoading,
} from 'modules/stats/actions/fetchPrivateTotalStatsByRange';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { USAGE_SHORT_TIMEFRAME_LIST } from 'domains/chains/constants/timeframes';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectProjectTotalRequestsCountForCurrentPeriod,
  selectProjectTotalRequestsForCurrentPeriod,
  selectRelativeChange,
} from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTimeframe } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useTimeframe';

export const useRequests = () => {
  const { projectId: token } = ProjectsRoutesConfig.project.useParams();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: USAGE_SHORT_TIMEFRAME_LIST,
  });

  const queryParams2h: IFetchPrivateTotalStatsByRangeParams = {
    duration: StatsByRangeDuration.TWO_HOURS,
    group,
    timeframe: StatsByRangeTimeframe.HOUR,
    token,
  };

  const lastHourRequests = useAppSelector(state =>
    selectProjectTotalRequestsForCurrentPeriod(state, queryParams2h),
  );
  const lastHourRequestsCount = useAppSelector(state =>
    selectProjectTotalRequestsCountForCurrentPeriod(state, queryParams2h),
  );
  const lastHourRelativeChange = useAppSelector(state =>
    selectRelativeChange(state, queryParams2h),
  );

  const lastHourRequestsLoading = useAppSelector(state =>
    selectPrivateTotalStatsByRangeLoading(state, queryParams2h),
  );

  const queryParams2d: IFetchPrivateTotalStatsByRangeParams = {
    duration: StatsByRangeDuration.TWO_DAYS,
    group,
    timeframe: StatsByRangeTimeframe.HOUR,
    token,
  };

  const lastDayRequests = useAppSelector(state =>
    selectProjectTotalRequestsForCurrentPeriod(state, queryParams2d),
  );
  const lastDayRequestsCount = useAppSelector(state =>
    selectProjectTotalRequestsCountForCurrentPeriod(state, queryParams2d),
  );
  const lastDayRelativeChange = useAppSelector(state =>
    selectRelativeChange(state, queryParams2d),
  );
  const lastDayRequestsLoading = useAppSelector(state =>
    selectPrivateTotalStatsByRangeLoading(state, queryParams2d),
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

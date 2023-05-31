import { ProjectsStatsParams } from 'domains/dashboard/types';
import { Timeframe } from 'domains/chains/types';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';

export const getProjectsStatsParams = (
  timeframe: Timeframe,
  group?: string,
): ProjectsStatsParams => ({
  group,
  interval: timeframeToIntervalMap[timeframe],
});

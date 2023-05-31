import { skipToken } from '@reduxjs/toolkit/dist/query';

import { ProjectsStatsParams } from 'domains/dashboard/types';
import { Timeframe } from 'domains/chains/types';
import { getProjectsStatsParams } from './getProjectsStatsParams';

export interface AllProjectsStatsArgsParams {
  areProjectsLoading: boolean;
  group: ProjectsStatsParams['group'];
  timeframe: Timeframe;
}

export const getAllProjectsStatsArgs = ({
  areProjectsLoading,
  group,
  timeframe,
}: AllProjectsStatsArgsParams) =>
  areProjectsLoading ? skipToken : getProjectsStatsParams(timeframe, group);

import { PieChartData } from '@ankr.com/telemetry';

import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

import { ICurrentProjectsStats } from '../types';

export interface IGetProjectsPieChartDataParams {
  projectsStats: ICurrentProjectsStats[];
  totalRequests: number;
}

export const getProjectsPieChartData = ({
  projectsStats,
  totalRequests,
}: IGetProjectsPieChartDataParams) =>
  projectsStats
    .map<PieChartData>(({ index, name, stats }) => ({
      name: name || renderProjectName(index),
      value: (stats?.total_requests || 0) / (totalRequests || 1),
    }))
    .filter(({ value }) => value);

import { AllProjectsStats } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { ProjectsStats } from '../types';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

export const getProjectsStats = (projects: AllProjectsStats[], total: number) =>
  projects
    .map<ProjectsStats>(({ index, stats }) => ({
      name: renderProjectName(index),
      value: (stats?.total_requests ?? 0) / (total || 1),
    }))
    .filter(({ value }) => value);

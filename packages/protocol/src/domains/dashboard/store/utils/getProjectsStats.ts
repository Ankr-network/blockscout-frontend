import { AllProjectsStats } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

import { ProjectsStats } from '../types';

export const getProjectsStats = (projects: AllProjectsStats[], total: number) =>
  projects
    .map<ProjectsStats>(({ index, name, stats }) => ({
      name: name || renderProjectName(index),
      value: (stats?.total_requests || 0) / (total || 1),
    }))
    .filter(({ value }) => value);

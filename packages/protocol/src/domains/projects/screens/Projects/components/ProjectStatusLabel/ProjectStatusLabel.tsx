import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { ProjectStatus } from 'domains/projects/utils/getAllProjects';

import { useProjectStatusLabel } from './hooks/useProjectStatusLabel';
import { useProjectStatusLabelStyles } from './useProjectStatusLabelStyles';

export interface ProjectStatusLabelProps {
  data: ProjectStatus;
}

export const ProjectStatusLabel = ({ data }: ProjectStatusLabelProps) => {
  const { projectStatus } = useProjectStatusLabel(data);

  const { classes } = useProjectStatusLabelStyles(projectStatus);

  return (
    <Typography className={classes.root}>
      {t(`projects.list-project.${projectStatus}`)}
    </Typography>
  );
};

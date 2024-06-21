import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { ProjectStatus } from 'domains/projects/utils/getAllProjects';

import { useProjectStatusLabel } from './hooks/useProjectStatusLabel';
import { useProjectStatusLabelStyles } from './useProjectStatusLabelStyles';

export interface ProjectStatusLabelProps {
  data: ProjectStatus;
  className?: string;
}

export const ProjectStatusLabel = ({
  className,
  data,
}: ProjectStatusLabelProps) => {
  const { projectStatus } = useProjectStatusLabel(data);

  const { classes, cx } = useProjectStatusLabelStyles(projectStatus);

  return (
    <Typography className={cx(classes.projectStatusLabel, className)}>
      {t(`projects.list-project.${projectStatus}`)}
    </Typography>
  );
};

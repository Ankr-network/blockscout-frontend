import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  IUseProjectStatusLabelProps,
  useProjectStatusLabel,
} from './hooks/useProjectStatusLabel';
import { useProjectStatusLabelStyles } from './useProjectStatusLabelStyles';

export interface ProjectStatusLabelProps extends IUseProjectStatusLabelProps {
  className?: string;
}

export const ProjectStatusLabel = ({
  className,
  isDraft,
  status,
}: ProjectStatusLabelProps) => {
  const { projectStatusType } = useProjectStatusLabel({
    isDraft,
    status,
  });

  const { classes, cx } = useProjectStatusLabelStyles(projectStatusType);

  return (
    <Typography className={cx(classes.projectStatusLabel, className)}>
      {t(`projects.list-project.${projectStatusType}`)}
    </Typography>
  );
};

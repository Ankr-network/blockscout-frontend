import { Paper, Typography } from '@mui/material';
import { TriangleWarning as WarningIcon } from '@ankr.com/ui';
import { ReactElement } from 'react';

import { useProjectBannerStyles } from './useProjectBannerStyles';

interface ProjectBannerProps {
  message: string;
  className?: string;
  button?: ReactElement;
}

export const ProjectBanner = ({
  button,
  className,
  message,
}: ProjectBannerProps) => {
  const { classes, cx } = useProjectBannerStyles();

  return (
    <Paper className={cx(classes.root, className)}>
      <div className={classes.wrapper}>
        <WarningIcon className={classes.iconWarning} />
        <Typography className={classes.message} variant="body3">
          {message}
        </Typography>
      </div>
      {button && button}
    </Paper>
  );
};

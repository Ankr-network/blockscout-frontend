import { LinearProgress, Typography } from '@mui/material';

import { useProgressBarStyles } from './useProgressBarStyles';

interface IProgressBarProps {
  progress?: number;
  max?: number;
  progressLabel?: string;
  maxLabel?: string;
  className?: string;
}

export const ProgressBar = ({
  progress,
  max = 100,
  progressLabel,
  maxLabel,
  className,
}: IProgressBarProps) => {
  const { classes } = useProgressBarStyles();

  return (
    <div className={className}>
      <div className={classes.progressLabels}>
        {progressLabel && (
          <Typography variant="body3" color="textSecondary">
            {progressLabel}
          </Typography>
        )}
        {maxLabel && (
          <Typography variant="body3" color="textSecondary">
            {maxLabel}
          </Typography>
        )}
      </div>
      <LinearProgress
        variant="determinate"
        value={progress}
        valueBuffer={max}
      />
    </div>
  );
};

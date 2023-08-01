import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { intlRoot } from '../../const';
import { useProgressStyles } from './ProgressStyles';

export interface ProgressProps {
  requestsUsed: number;
}

export const Progress = ({ requestsUsed }: ProgressProps) => {
  const percent = requestsUsed * 100;

  const key =
    percent < 1 && percent !== 0
      ? `${intlRoot}.progress-title-less-one`
      : `${intlRoot}.progress-title`;

  const { classes } = useProgressStyles(requestsUsed);

  return (
    <>
      <Typography className={classes.title} component="div">
        {t(key, { percent })}
      </Typography>
      <div className={classes.background}>
        <div className={classes.progress} />
      </div>
    </>
  );
};

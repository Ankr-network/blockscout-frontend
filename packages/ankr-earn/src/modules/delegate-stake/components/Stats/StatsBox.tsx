import { Paper } from '@material-ui/core';
import { ReactNode } from 'react';

import { useStatsStyles } from './useStatsStyles';

interface IStats {
  children: ReactNode;
}

export const StatsBox = ({ children }: IStats): JSX.Element => {
  const classes = useStatsStyles();

  return (
    <Paper className={classes.statisticWrapper} variant="elevation">
      {children}
    </Paper>
  );
};

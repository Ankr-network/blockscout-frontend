import { Paper } from '@material-ui/core';
import { ReactNode } from 'react';

import { useStakeStatsStyles } from './useStakeStatsStyles';

interface IStakeStats {
  children: ReactNode;
}

export const StakeStatsBox = ({ children }: IStakeStats): JSX.Element => {
  const classes = useStakeStatsStyles();

  return (
    <Paper className={classes.statisticWrapper} variant="elevation">
      {children}
    </Paper>
  );
};

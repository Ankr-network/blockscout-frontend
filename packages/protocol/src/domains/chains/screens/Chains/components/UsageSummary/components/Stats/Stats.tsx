import React from 'react';

import { ChainBlock } from 'domains/chains/screens/Chains/components/ChainBlock';
import { Stats as StatsType } from '../../types';
import { totalTitle } from './const';
import { useStyles } from './StatsStyles';

export interface StatsProps {
  isLoading: boolean;
  stats: StatsType;
}

export const Stats = ({ isLoading, stats: { total } }: StatsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.stats}>
      <ChainBlock
        className={classes.stat}
        isLoading={isLoading}
        subtitle={totalTitle}
        value={total.toFormat()}
      />
    </div>
  );
};

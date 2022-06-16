import React from 'react';

import { ChainBlock } from 'domains/chains/screens/Chains/components/ChainBlock';
import { Stats as StatsType } from '../../types';
import { failoversTitle, successPercentTitle, totalTitle } from './const';
import { formatPercent } from './utils/formatPercent';
import { useStyles } from './StatsStyles';

export interface StatsProps {
  isLoading: boolean;
  stats: StatsType;
}

export const Stats = ({
  isLoading,
  stats: { failovers, successPercent, total },
}: StatsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.stats}>
      <ChainBlock
        className={classes.stat}
        isLoading={isLoading}
        subtitle={totalTitle}
        value={total.toFormat()}
      />
      <ChainBlock
        className={classes.stat}
        isLoading={isLoading}
        subtitle={failoversTitle}
        value={failovers.toFormat()}
      />
      <ChainBlock
        className={classes.stat}
        isLoading={isLoading}
        subtitle={successPercentTitle}
        value={formatPercent(successPercent)}
      />
    </div>
  );
};

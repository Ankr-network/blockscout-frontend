import { t } from '@ankr.com/common';

import { ChainBlock } from 'domains/chains/components/ChainBlock';

import { Stats as StatsType } from '../../types';
import { useStyles } from './StatsStyles';

const stats = 'chains.private-stats.stats';

export interface StatsProps {
  isLoading: boolean;
  stats: StatsType;
}

export const Stats = ({ isLoading, stats: { total } }: StatsProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.stats}>
      <ChainBlock
        isLoading={isLoading}
        subtitle={t(`${stats}.total`)}
        value={total.toFormat()}
      />
    </div>
  );
};

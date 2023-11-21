import { useMemo } from 'react';

import { Timeframe } from 'modules/chains/types';

import { useItemHeaderStyles } from './ItemHeaderStyles';
import { getLabelByTimeframe } from '../UsageDataSection/UsageDataSectionUtils';

export interface ItemHeaderProps {
  timeframe: Timeframe;
  title: string;
}

export const ItemHeader = ({ timeframe, title }: ItemHeaderProps) => {
  const { classes } = useItemHeaderStyles();

  const label = useMemo(() => getLabelByTimeframe(timeframe), [timeframe]);

  return (
    <div className={classes.itemHeader}>
      <div className={classes.title}>{title}</div>
      <div className={classes.timeframe}>{label}</div>
    </div>
  );
};

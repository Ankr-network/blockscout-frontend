import React from 'react';

import { StatsTimeframe } from 'domains/chains/types';
import { TimeframeSwitcher } from 'domains/chains/components/TimeframeSwitcher';
import { useStyles } from './UsageStatTitleStyles';

export interface UsageStatTitleProps {
  statsTimeframe: StatsTimeframe;
  switchStatsTimeframe: () => void;
  title: string;
}

export const UsageStatTitle = ({
  statsTimeframe,
  switchStatsTimeframe: onSwitch,
  title,
}: UsageStatTitleProps) => {
  const classes = useStyles();

  return (
    <div className={classes.usageStatTitle}>
      {title}
      <TimeframeSwitcher onSwitch={onSwitch} timeframe={statsTimeframe} />
    </div>
  );
};

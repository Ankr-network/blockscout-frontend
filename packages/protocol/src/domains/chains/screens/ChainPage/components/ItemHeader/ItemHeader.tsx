import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { Timeframe } from '@ankr.com/chains-list';

import { useItemHeaderStyles } from './useItemHeaderStyles';
import { getLabelByTimeframe } from '../UsageDataSection/UsageDataSectionUtils';

export interface ItemHeaderProps {
  className?: string;
  timeframe: Timeframe;
  title: string;
  isLabelHidden?: boolean;
}

export const ItemHeader = ({
  className,
  isLabelHidden,
  timeframe,
  title,
}: ItemHeaderProps) => {
  const { classes, cx } = useItemHeaderStyles();

  const label = useMemo(() => getLabelByTimeframe(timeframe), [timeframe]);

  return (
    <div className={cx(classes.itemHeader, className)}>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      {!isLabelHidden && <div className={classes.timeframe}>{label}</div>}
    </div>
  );
};

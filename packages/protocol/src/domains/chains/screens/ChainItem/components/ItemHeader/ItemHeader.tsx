import { Timeframe } from 'domains/chains/types';
import { timeframeToLabelMap } from '../UsageDataSection/const';
import { useItemHeaderStyles } from './ItemHeaderStyles';

export interface ItemHeaderProps {
  timeframe: Timeframe;
  title: string;
}

export const ItemHeader = ({ timeframe, title }: ItemHeaderProps) => {
  const classes = useItemHeaderStyles();

  return (
    <div className={classes.itemHeader}>
      <div className={classes.title}>{title}</div>
      <div className={classes.timeframe}>{timeframeToLabelMap[timeframe]}</div>
    </div>
  );
};

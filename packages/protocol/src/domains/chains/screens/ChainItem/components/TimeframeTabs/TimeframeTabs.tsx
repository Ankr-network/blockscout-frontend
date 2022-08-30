import classNames from 'classnames';

import { SecondaryTab, TabSize } from '../SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';
import { Timeframe } from 'domains/chains/types';
import { timeframeToLabelMap } from '../UsageDataSection/const';
import { useTimeframeTabsStyles } from './TimeframeTabsStyles';

export interface TimeframeTabsProps {
  className?: string;
  timeframe: Timeframe;
  tabs: Tab<Timeframe>[];
}

export const TimeframeTabs = ({
  className,
  tabs,
  timeframe,
}: TimeframeTabsProps) => {
  const classes = useTimeframeTabsStyles();

  return (
    <div className={classNames(className, classes.timeframeTabs)}>
      {tabs.map(({ id, onSelect }) => (
        <SecondaryTab
          className={classes.tab}
          isLast
          isSelected={id === timeframe}
          key={id}
          label={timeframeToLabelMap[id]}
          onClick={onSelect}
          size={TabSize.Small}
        />
      ))}
    </div>
  );
};

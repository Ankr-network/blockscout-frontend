import { SecondaryTab, TabSize } from '../SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';
import { Timeframe } from 'domains/chains/types';
import { timeframeToLabelMap } from '../UsageDataSection/const';
import { useTimeframeTabsStyles } from './TimeframeTabsStyles';

export interface TimeframeTabsProps {
  className?: string;
  disabled?: boolean;
  size?: TabSize;
  tabClassName?: string;
  tabs: Tab<Timeframe>[];
  timeframe: Timeframe;
}

export const TimeframeTabs = ({
  className,
  disabled,
  size = TabSize.Small,
  tabClassName,
  tabs,
  timeframe,
}: TimeframeTabsProps) => {
  const { classes, cx } = useTimeframeTabsStyles();

  return (
    <div className={cx(className, classes.timeframeTabs)}>
      {tabs.map(({ id, onSelect }) => (
        <SecondaryTab
          className={cx(classes.tab, tabClassName)}
          disabled={disabled}
          isLast
          isSelected={id === timeframe}
          key={id}
          label={timeframeToLabelMap[id]}
          onClick={onSelect}
          size={size}
        />
      ))}
    </div>
  );
};

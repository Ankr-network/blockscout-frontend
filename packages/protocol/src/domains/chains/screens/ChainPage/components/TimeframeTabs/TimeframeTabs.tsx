import { Timeframe } from '@ankr.com/chains-list';

import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';

import { useTimeframeTabsStyles } from './TimeframeTabsStyles';
import { getLabelByTimeframe } from '../UsageDataSection/UsageDataSectionUtils';

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
  const { classes, cx } = useTimeframeTabsStyles(size);

  return (
    <div className={cx(className, classes.timeframeTabs)}>
      {tabs.map(({ id, onSelect }) => (
        <SecondaryTab
          className={cx(classes.tab, tabClassName)}
          disabled={disabled}
          isLast
          isSelected={id === timeframe}
          key={id}
          label={getLabelByTimeframe(id)}
          onClick={onSelect}
          size={size}
        />
      ))}
    </div>
  );
};

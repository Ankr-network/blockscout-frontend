import { Box } from '@mui/material';
import { Timeframe } from '@ankr.com/chains-list';

import { Tab } from 'modules/common/hooks/useTabs';
import { TimeframeTabs } from 'domains/chains/screens/ChainPage/components/TimeframeTabs';
import { TabSize } from 'modules/common/components/SecondaryTab';

import { useTimeframeSectionStyles } from './useTimeframeSectionStyles';

interface TimeframeSectionProps {
  tabs: Tab<Timeframe>[];
  timeframe: Timeframe;
  size?: TabSize;
  className?: string;
  isDisabled?: boolean;
}

export const TimeframeSection = ({
  className,
  isDisabled,
  size = TabSize.Medium,
  tabs,
  timeframe,
}: TimeframeSectionProps) => {
  const { classes, cx } = useTimeframeSectionStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <Box className={classes.left}>
        <TimeframeTabs
          className={classes.timeframe}
          tabClassName={classes.tab}
          tabs={tabs}
          timeframe={timeframe}
          size={size}
          disabled={isDisabled}
        />
      </Box>
    </Box>
  );
};

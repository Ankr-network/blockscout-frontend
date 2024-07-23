import { Box } from '@mui/material';

import { Timeframe } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { TabSize } from 'modules/common/components/SecondaryTab';

import { useTimeframeSectionStyles } from './useTimeframeSectionStyles';

interface TimeframeSectionProps {
  tabs: Tab<Timeframe>[];
  timeframe: Timeframe;
  size?: TabSize;
}

export const TimeframeSection = ({
  size = TabSize.Medium,
  tabs,
  timeframe,
}: TimeframeSectionProps) => {
  const { classes } = useTimeframeSectionStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <TimeframeTabs
          className={classes.timeframe}
          tabClassName={classes.tab}
          tabs={tabs}
          timeframe={timeframe}
          size={size}
        />
      </Box>
    </Box>
  );
};

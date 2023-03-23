import { Box } from '@mui/material';

import { Timeframe } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useTimeframeSectionStyles } from './useTimeframeSectionStyles';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { ProjectSelect } from '../ProjectSelect';
import { TabSize } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { CostButton } from '../PrivateUsageSummary/components/CostButton';

interface TimeframeSectionProps {
  tabs: Tab<Timeframe>[];
  timeframe: Timeframe;
}

export const TimeframeSection = ({
  tabs,
  timeframe,
}: TimeframeSectionProps) => {
  const { classes } = useTimeframeSectionStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <ProjectSelect />
        <TimeframeTabs
          className={classes.timeframe}
          tabs={tabs}
          timeframe={timeframe}
          size={TabSize.Medium}
        />
      </Box>
      <CostButton />
    </Box>
  );
};

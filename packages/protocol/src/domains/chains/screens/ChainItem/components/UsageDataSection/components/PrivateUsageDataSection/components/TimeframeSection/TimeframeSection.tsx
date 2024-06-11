import { Box } from '@mui/material';

import { Timeframe } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TimeframeTabs } from 'domains/chains/screens/ChainItem/components/TimeframeTabs';
import { ProjectSelect } from 'modules/common/components/ProjectSelect';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { CostButton } from '../PrivateUsageSummary/components/CostButton';
import { useTimeframeSectionStyles } from './useTimeframeSectionStyles';

interface TimeframeSectionProps {
  tabs: Tab<Timeframe>[];
  timeframe: Timeframe;
}

export const TimeframeSection = ({
  tabs,
  timeframe,
}: TimeframeSectionProps) => {
  const { classes } = useTimeframeSectionStyles();

  const { handleSetOption, options, selectedOption } = useProjectSelect();

  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <ProjectSelect
          options={options}
          handleSetOption={handleSetOption}
          selectedOption={selectedOption}
        />
        <TimeframeTabs
          className={classes.timeframe}
          tabClassName={classes.tab}
          tabs={tabs}
          timeframe={timeframe}
          size={TabSize.Medium}
        />
      </Box>
      <GuardUserGroup blockName={BlockWithPermission.Billing}>
        <CostButton />
      </GuardUserGroup>
    </Box>
  );
};

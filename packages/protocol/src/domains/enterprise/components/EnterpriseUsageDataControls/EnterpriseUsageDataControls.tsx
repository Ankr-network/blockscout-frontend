import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Timeframe } from '@ankr.com/chains-list';

import { Tab } from 'modules/common/hooks/useTabs';
import { TimeframeTabs } from 'domains/chains/screens/ChainPage/components/TimeframeTabs';
import { TabSize } from 'modules/common/components/SecondaryTab';
import { useTimeframeSectionStyles } from 'domains/chains/screens/ChainPage/components/UsageDataSection/components/TimeframeSection/useTimeframeSectionStyles';
import {
  ProjectSelect,
  SelectOption,
} from 'modules/common/components/ProjectSelect';
import {
  setSelectedProjectEndpointToken,
  setSelectedTokenIndex,
} from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useAppSelector } from 'store/useAppSelector';
import {
  EnterpriseClientJwtManagerItem,
  selectEnterpriseUserAddress,
} from 'domains/enterprise/store/selectors';

interface TimeframeSectionProps {
  tabs: Tab<Timeframe>[];
  timeframe: Timeframe;
  options: SelectOption[];
  handleSetOption: (value: string) => void;
  selectedOption: string;
  apiKeys: EnterpriseClientJwtManagerItem[];
}

export const EnterpriseUsageDataControls = ({
  apiKeys,
  handleSetOption,
  options,
  selectedOption,
  tabs,
  timeframe,
}: TimeframeSectionProps) => {
  const { classes } = useTimeframeSectionStyles();

  const dispatch = useDispatch();

  const address = useAppSelector(selectEnterpriseUserAddress);

  const handleSelectToken = (value: string) => {
    const currentApiKey = apiKeys.find(
      apiKey => apiKey.enterprise_api_key === value,
    );

    dispatch(
      setSelectedProjectEndpointToken({
        address,
        selectedProject: currentApiKey?.enterprise_api_key,
      }),
    );

    dispatch(
      setSelectedTokenIndex({
        address,
        tokenIndex: currentApiKey ? currentApiKey.index : -1,
      }),
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <ProjectSelect
          options={options}
          handleSetOption={handleSetOption}
          selectedOption={selectedOption}
          onSelectToken={handleSelectToken}
        />
        <TimeframeTabs
          className={classes.timeframe}
          tabClassName={classes.tab}
          tabs={tabs}
          timeframe={timeframe}
          size={TabSize.Medium}
        />
      </Box>
    </Box>
  );
};

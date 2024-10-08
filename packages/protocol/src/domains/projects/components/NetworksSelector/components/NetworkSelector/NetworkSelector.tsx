import { ArrowDown } from '@ankr.com/ui';
import { Accordion, AccordionSummary } from '@mui/material';

import { Checkbox } from 'modules/common/components/Checkbox';

import { GroupsSelector } from '../GroupsSelector';
import { NetworkName } from '../../types';
import {
  UseNetworkSelectorParams,
  useNetworkSelector,
} from './hooks/useNetworkSelector';
import { useNetworkSelectorStyles } from './useNetworkSelectorStyles';
import { networkLabelsMap } from './constants';

export interface NestedSelectorProps extends UseNetworkSelectorParams {
  networkName: NetworkName;
}

export const NetworkSelector = ({
  handleUpdateNetworksPaths,
  networkGroups,
  networkName,
  selectedSubchainPaths,
}: NestedSelectorProps) => {
  const { hasGroupsSelector, isIndeterminate, isNetworkSelected, onChange } =
    useNetworkSelector({
      handleUpdateNetworksPaths,
      networkGroups,
      selectedSubchainPaths,
    });

  // TODO: premium colors
  const getLabel = networkLabelsMap[networkName];

  const { classes } = useNetworkSelectorStyles();

  if (hasGroupsSelector) {
    return (
      <Accordion className={classes.root} classes={{ expanded: classes.root }}>
        <AccordionSummary
          className={classes.summaryRoot}
          classes={{
            content: classes.summaryContent,
            expanded: classes.summaryExpanded,
          }}
          expandIcon={<ArrowDown />}
        >
          <Checkbox
            hasPadding
            isChecked={isNetworkSelected}
            isIndeterminate={isIndeterminate}
            label={getLabel()} // TODO: premium colors
            onChange={onChange}
          />
        </AccordionSummary>
        <GroupsSelector
          groups={networkGroups}
          handleUpdateNetworksPaths={handleUpdateNetworksPaths}
          selectedSubchainPaths={selectedSubchainPaths}
        />
      </Accordion>
    );
  }

  return (
    <Checkbox
      hasBorderBottom
      hasPadding
      isChecked={isNetworkSelected}
      isIndeterminate={isIndeterminate}
      label={getLabel()}
      onChange={onChange}
    />
  );
};

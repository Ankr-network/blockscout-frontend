import { useCallback, useMemo } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FLARE_TESTNETS } from '@ankr.com/chains-list';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { getOptionsByTabs } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/GroupSelector/utils/getOptionsByTabs';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';

import { useGroupSelector } from './hooks/useGroupSelector';
import { useGroupSelectorStyles } from './useGroupSelectorStyles';
import { useSelectorVisibility } from '../ChainSelector/useSelectorVisibility';

interface IGroupSelectorProps extends SelectMenuProps {
  groupID: ChainGroupID;
  groups: EndpointGroup[];
  onGroupSelect: (id: ChainGroupID) => void;
}

export const GroupSelector = ({
  classNameMenuItem,
  groupID,
  groups,
  menuProps,
  onGroupSelect,
}: IGroupSelectorProps) => {
  const { classes, cx } = useGroupSelectorStyles();

  // it's shity hack because of unexpected flare testnets dependencies and grouping
  // @ts-ignore
  const isFlareTestnet = FLARE_TESTNETS.includes(groupID);

  const options = useMemo(
    () => getOptionsByTabs(groups, isFlareTestnet),
    [groups, isFlareTestnet],
  );

  const { renderValue } = useGroupSelector(options);

  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const chainGroup = event.target.value as ChainGroupID;

      onGroupSelect(chainGroup);
    },
    [onGroupSelect],
  );

  const selectProps = useSelectorVisibility();

  if (options?.length <= 1) {
    return null;
  }

  return (
    <FormControl className={classes.form}>
      <Select
        MenuProps={menuProps}
        inputProps={{ classes: classes.inputRoot }}
        value={groupID}
        onChange={onChange}
        renderValue={renderValue}
        classes={{ select: classes.select }}
        {...selectProps}
      >
        {options.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
            className={cx(classes.menuItem, classNameMenuItem)}
          >
            <Typography variant="body2" noWrap>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

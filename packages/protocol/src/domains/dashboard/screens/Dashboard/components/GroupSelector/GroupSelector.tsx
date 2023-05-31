import { useCallback, useMemo } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { useGroupSelector } from './hooks/useGroupSelector';
import { useGroupSelectorStyles } from './useGroupSelectorStyles';
import { getOptionsByTabs } from 'domains/chains/screens/ChainItem/components/ChainItemHeader/components/MobileGroupSelector/utils/getOptionsByTabs';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';

interface IGroupSelectorProps extends SelectMenuProps {
  groupID: ChainGroupID;
  groups: EndpointGroup[];
  onGroupSelect: (id: ChainGroupID) => void;
}

export const GroupSelector = ({
  groupID,
  groups,
  onGroupSelect,
  menuProps,
  classNameMenuItem,
}: IGroupSelectorProps) => {
  const { classes, cx } = useGroupSelectorStyles();

  const options = useMemo(() => getOptionsByTabs(groups), [groups]);

  const { renderValue } = useGroupSelector(options);

  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const chainGroup = event.target.value as ChainGroupID;

      onGroupSelect(chainGroup);
    },
    [onGroupSelect],
  );

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
        size="small"
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

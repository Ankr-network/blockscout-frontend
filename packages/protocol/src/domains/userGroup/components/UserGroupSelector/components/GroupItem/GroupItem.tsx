import { Button, MenuItem } from '@mui/material';
import { Check } from '@ankr.com/ui';

import { GroupItemProps } from './types';
import { useGroupItem } from './hooks/useGroupItem';
import { useGroupItemStyles } from './GroupItemStyles';

export const GroupItem = (props: GroupItemProps) => {
  const { isSelected, onClick } = useGroupItem(props);
  const {
    group: { groupName },
  } = props;

  const { classes } = useGroupItemStyles(isSelected);

  return (
    <MenuItem
      className={classes.menuItem}
      component={Button}
      onClick={onClick}
      selected={isSelected}
      startIcon={<Check className={classes.startIcon} />}
      variant="text"
    >
      {groupName}
    </MenuItem>
  );
};

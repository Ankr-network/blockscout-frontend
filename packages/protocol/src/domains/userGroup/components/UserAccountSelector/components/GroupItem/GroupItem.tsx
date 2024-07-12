import { Button, MenuItem, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { useCallback } from 'react';

import { getAvatarColor } from 'modules/groups/utils/getAvatarColor';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';
import { PERSONAL_GROUP_NAME } from 'domains/userGroup/constants/groups';

import { GroupItemProps } from './types';
import { useGroupItem } from './hooks/useGroupItem';
import { useGroupItemStyles } from './useGroupItemStyles';
import { Avatar } from '../../../Avatar';

export const GroupItem = (props: GroupItemProps) => {
  const { isSelected, onClick } = useGroupItem(props);
  const {
    group: { index, name, role },
  } = props;

  const { classes } = useGroupItemStyles();

  const isPersonal = name === PERSONAL_GROUP_NAME;

  const handleMenuClick = useCallback(() => {
    if (isSelected) {
      return () => {};
    }

    return onClick();
  }, [isSelected, onClick]);

  return (
    <MenuItem
      className={classes.menuItem}
      component={Button}
      onClick={handleMenuClick}
      variant="text"
    >
      <Avatar
        avatarColor={getAvatarColor(index)}
        className={classes.avatar}
        name={name}
      />
      <div className={classes.groupInfoWrapper}>
        <div className={classes.labelWrapper}>
          {!isPersonal && (
            <Typography variant="body4" color="textSecondary" fontWeight={500}>
              {getUserRoleName(role)}
            </Typography>
          )}
        </div>
        <Typography className={classes.userName} variant="body3">
          {name}
        </Typography>
      </div>
      {isSelected && <Check className={classes.check} />}
    </MenuItem>
  );
};

import { Button, MenuItem, Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import React, { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { getAvatarColor } from 'modules/groups/utils/getAvatarColor';
import { UserLabel } from 'uiKit/Breadcrumbs/components/UserLabel';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';
import { getPermissions } from 'modules/groups/utils/getPermissions';
import {
  BlockWithPermission,
  PERSONAL_GROUP_NAME,
} from 'domains/userGroup/constants/groups';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { GroupItemProps } from './types';
import { useGroupItem } from './hooks/useGroupItem';
import { useGroupItemStyles } from './GroupItemStyles';
import { Avatar } from '../../../Avatar';

export const GroupItem = (props: GroupItemProps) => {
  const { isSelected, onClick } = useGroupItem(props);
  const {
    group: { name, index, isFreemium, isEnterprise, role },
  } = props;

  const { classes } = useGroupItemStyles(isSelected);

  const isPersonal = name === PERSONAL_GROUP_NAME;

  const isStatusAvailable = useMemo(() => {
    if (isPersonal && !isSelected) {
      return false;
    }

    return getPermissions(role).includes(BlockWithPermission.AccountStatus);
  }, [isPersonal, isSelected, role]);

  const handleMenuClick = useCallback(() => {
    if (isSelected) {
      return () => {};
    }

    return onClick();
  }, [isSelected, onClick]);

  const { hasPremium, hasStatusTransition } = useAuth();

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
          {isStatusAvailable && (
            <UserLabel
              className={classes.label}
              hasPremium={isSelected ? hasPremium : !isFreemium}
              hasEnterpriseStatus={isEnterprise}
              hasStatusTransition={isSelected ? hasStatusTransition : false}
            />
          )}
          {isStatusAvailable && !isPersonal && (
            <Typography
              className={classes.divider}
              variant="body4"
              color="textSecondary"
            >
              {t('common.dot-divider')}
            </Typography>
          )}
          {!isPersonal && (
            <Typography variant="body4" color="textSecondary" fontWeight={500}>
              {getUserRoleName(role)}
            </Typography>
          )}
        </div>
        <Typography variant="body3">{name}</Typography>
      </div>
      {isSelected && <Check className={classes.check} />}
    </MenuItem>
  );
};

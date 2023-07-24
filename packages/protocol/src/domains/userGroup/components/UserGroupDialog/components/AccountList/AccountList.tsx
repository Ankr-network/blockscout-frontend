import { Box } from '@mui/material';
import { useCallback } from 'react';
import { UserGroup, GroupUserRole } from 'multirpc-sdk';

import { Avatar } from 'domains/userGroup/components/Avatar';
import { PersonalIcon } from 'domains/userGroup/components/PersonalIcon';
import { getAvatarColor } from 'domains/userGroup/utils/getAvatarColor';

import { AccountItem } from '../AccountItem';
import { useAccountsListStyles } from './useAccountListStyles';

interface AccountListProps {
  selectedGroupAddress?: string;
  onSelect: (selectedGroupAddress: string, userRole: GroupUserRole) => void;
  groups: UserGroup[];
}

export const AccountList = ({
  groups,
  onSelect,
  selectedGroupAddress,
}: AccountListProps) => {
  const { classes } = useAccountsListStyles();

  const handleClick = useCallback(
    (newGroupAddress: string, userRole: GroupUserRole) =>
      onSelect(newGroupAddress, userRole),
    [onSelect],
  );

  return (
    <Box className={classes.root}>
      {groups.map(({ groupAddress, groupName, userRole }, index) => (
        <AccountItem
          key={groupAddress}
          name={groupName}
          onClick={() => handleClick(groupAddress, userRole)}
          isSelected={selectedGroupAddress === groupAddress}
        >
          <Avatar
            className={classes.avatar}
            avatarColor={getAvatarColor(index)}
            icon={index === 0 ? <PersonalIcon /> : undefined}
            name={groupName}
          />
        </AccountItem>
      ))}
    </Box>
  );
};

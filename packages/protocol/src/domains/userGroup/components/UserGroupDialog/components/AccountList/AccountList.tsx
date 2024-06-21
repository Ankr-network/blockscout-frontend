import { Box } from '@mui/material';
import { useCallback } from 'react';
import { UserGroup, GroupUserRole } from 'multirpc-sdk';

import { Avatar } from 'domains/userGroup/components/Avatar';
import { PersonalIcon } from 'domains/userGroup/components/PersonalIcon';
import { getAvatarColor } from 'modules/groups/utils/getAvatarColor';

import { AccountItem } from '../AccountItem';
import { useAccountsListStyles } from './useAccountListStyles';

interface AccountListProps {
  selectedGroupAddress?: string;
  onSelect: (selectedGroupAddress: string, role: GroupUserRole) => void;
  groups: UserGroup[];
}

export const AccountList = ({
  groups,
  onSelect,
  selectedGroupAddress,
}: AccountListProps) => {
  const { classes } = useAccountsListStyles();

  const handleClick = useCallback(
    (newGroupAddress: string, role: GroupUserRole) =>
      onSelect(newGroupAddress, role),
    [onSelect],
  );

  return (
    <Box className={classes.root}>
      {groups.map(({ address, index, name, role }) => (
        <AccountItem
          key={address}
          name={name}
          onClick={() => handleClick(address, role)}
          isSelected={selectedGroupAddress === address}
        >
          <Avatar
            className={classes.avatar}
            avatarColor={getAvatarColor(index)}
            icon={index === 0 ? <PersonalIcon /> : undefined}
            name={name}
          />
        </AccountItem>
      ))}
    </Box>
  );
};

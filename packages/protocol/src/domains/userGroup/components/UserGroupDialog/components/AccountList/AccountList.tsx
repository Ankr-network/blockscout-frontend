import { Box } from '@mui/material';
import { useCallback } from 'react';
import { Avatar as PersonalIcon } from '@ankr.com/ui';
import { UserGroup } from 'multirpc-sdk';

import { AccountItem } from '../AccountItem';
import { useAccountsListStyles } from './useAccountListStyles';
import { AVATAR_COLORS } from './AccountListUtils';
import { Avatar } from '../Avatar';

interface AccountListProps {
  selectedGroupAddress?: string;
  onSelect: (selectedGroupAddress: string) => void;
  groups: UserGroup[];
}

export const AccountList = ({
  groups,
  onSelect,
  selectedGroupAddress,
}: AccountListProps) => {
  const { classes } = useAccountsListStyles();

  const handleClick = useCallback(
    (newGroupAddress: string) => onSelect(newGroupAddress),
    [onSelect],
  );

  return (
    <Box className={classes.root}>
      {groups.map(({ groupAddress, groupName }, index) => (
        <AccountItem
          key={groupAddress}
          name={groupName}
          onClick={() => handleClick(groupAddress)}
          isSelected={selectedGroupAddress === groupAddress}
        >
          <Avatar
            name={groupName}
            avatarColor={AVATAR_COLORS[index]}
            icon={
              index === 0 && <PersonalIcon className={classes.personalAvatar} />
            }
          />
        </AccountItem>
      ))}
    </Box>
  );
};

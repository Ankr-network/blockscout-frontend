import React from 'react';
import { Typography } from '@mui/material';

import { useNetworksBadgesStyles } from './useNetworksBadgesStyles';

interface NetworkBadgeItemProps {
  name: string;
  isSelected: boolean;
}

export const NetworkBadgeItem = ({
  isSelected,
  name,
}: NetworkBadgeItemProps) => {
  const { classes, cx } = useNetworksBadgesStyles();

  return (
    <div className={classes.badge} title={name}>
      <Typography
        variant="body2"
        className={cx(
          classes.badgeLabel,
          isSelected && classes.selectedBadgeLabel,
        )}
      >
        {name}
      </Typography>
    </div>
  );
};

import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { Close } from '@ankr.com/ui';

import { useNetworksBadgesStyles } from './useNetworksBadgesStyles';

interface NetworkBadgeItemProps {
  name: string;
  onRemove: () => void;
}

export const NetworkBadgeItem = ({ name, onRemove }: NetworkBadgeItemProps) => {
  const { classes } = useNetworksBadgesStyles();

  return (
    <div className={classes.badge} title={name}>
      <Typography variant="body2" className={classes.badgeLabel}>
        {name}
      </Typography>

      <IconButton onClick={onRemove} className={classes.closeButton}>
        <Close className={classes.closeIcon} />
      </IconButton>
    </div>
  );
};

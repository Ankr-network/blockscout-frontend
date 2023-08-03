import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@ankr.com/ui';

import { useNetworksBadgesStyles } from './useNetworksBadgesStyles';

interface NetworkBadgeItemProps {
  name: string;
  onRemove: () => void;
}

export const NetworkBadgeItem = ({ name, onRemove }: NetworkBadgeItemProps) => {
  const { classes } = useNetworksBadgesStyles();

  return (
    <div className={classes.badge}>
      {name}

      <IconButton onClick={onRemove} className={classes.closeButton}>
        <Close className={classes.closeIcon} />
      </IconButton>
    </div>
  );
};

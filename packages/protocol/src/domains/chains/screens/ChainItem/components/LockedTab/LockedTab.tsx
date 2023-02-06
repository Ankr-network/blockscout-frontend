import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { Lock } from '@ankr.com/ui';

import { useLockedTabStyles } from './useLockedTabStyles';

interface LockedTabProps {
  title?: ReactNode;
}

export const LockedTab = ({ title }: LockedTabProps) => {
  const { classes } = useLockedTabStyles();

  return (
    <div className={classes.root}>
      <Lock className={classes.icon} />
      <Typography className={classes.title}>{title}</Typography>
    </div>
  );
};

import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { useChainSelectorStyles } from './useChainSelectorStyles';

interface ISelectedContentProps {
  children: ReactNode;
}

export const SelectedContent = ({ children }: ISelectedContentProps) => {
  const { classes } = useChainSelectorStyles();

  return (
    <Typography
      variant="subtitle2"
      color="textSecondary"
      noWrap
      className={classes.value}
    >
      {children}
    </Typography>
  );
};

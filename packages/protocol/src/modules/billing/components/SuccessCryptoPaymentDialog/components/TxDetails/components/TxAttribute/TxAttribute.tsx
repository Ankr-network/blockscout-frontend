import { Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useTxAttributeStyles } from './useTxAttributeStyles';

export interface ITxAttributeProps {
  children: ReactNode;
  label: string;
}

export const TxAttribute = ({ children, label }: ITxAttributeProps) => {
  const { classes } = useTxAttributeStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="body2">
        {label}
      </Typography>
      {children}
    </div>
  );
};

import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { t } from '@ankr.com/common';

import { useButtonsStyles } from './ButtonsStyles';

export interface ButtonsProps {
  children: ReactNode;
}

export const Buttons = ({ children }: ButtonsProps) => {
  const { classes } = useButtonsStyles();

  return (
    <div className={classes.root}>
      {children}
      <Button variant="outlined" color="primary" className={classes.button}>
        {t('chains.more-details')}
      </Button>
    </div>
  );
};

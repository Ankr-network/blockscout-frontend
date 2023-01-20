import React from 'react';
import { Button } from '@mui/material';

import { useStyles } from './SwitcherStyles';

export interface SwitcherProps {
  className?: string;
  onClick?: () => void;
  value: string;
}

export const Switcher = ({ className, onClick, value }: SwitcherProps) => {
  const { classes, cx } = useStyles();

  return (
    <Button
      className={cx(className, classes.switcherRoot)}
      onClick={onClick}
      variant="outlined"
      disabled={!onClick}
    >
      {value}
    </Button>
  );
};

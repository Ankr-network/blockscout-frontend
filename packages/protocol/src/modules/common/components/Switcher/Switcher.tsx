import React from 'react';
import { Button } from '@material-ui/core';

import { useStyles } from './SwitcherStyles';

export interface SwitcherProps {
  onClick: () => void;
  value: string;
}

export const Switcher = ({ onClick, value }: SwitcherProps) => {
  const { switcherRoot } = useStyles();

  return (
    <Button className={switcherRoot} onClick={onClick} variant="outlined">
      {value}
    </Button>
  );
};

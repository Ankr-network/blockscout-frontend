import React from 'react';
import classNames from 'classnames';
import { Button } from '@material-ui/core';

import { useStyles } from './SwitcherStyles';

export interface SwitcherProps {
  className?: string;
  onClick?: () => void;
  value: string;
}

export const Switcher = ({ className, onClick, value }: SwitcherProps) => {
  const { switcherRoot } = useStyles();

  return (
    <Button
      className={classNames(className, switcherRoot)}
      onClick={onClick}
      variant="outlined"
      disabled={!onClick}
    >
      {value}
    </Button>
  );
};

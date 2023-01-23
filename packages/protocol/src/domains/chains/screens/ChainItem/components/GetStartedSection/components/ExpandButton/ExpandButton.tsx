import React from 'react';
import { Button } from '@mui/material';

import { label } from './const';
import { useStyles } from './ExpandButtonStyles';

export interface ExpandButtonProps {
  className?: string;
  isVisible?: boolean;
  onClick: () => void;
}

export const ExpandButton = ({
  className = '',
  isVisible = true,
  onClick,
}: ExpandButtonProps) => {
  const { classes, cx } = useStyles();

  return isVisible ? (
    <Button
      className={cx(className, classes.expandButton)}
      onClick={onClick}
      variant="outlined"
    >
      {label}
    </Button>
  ) : null;
};
